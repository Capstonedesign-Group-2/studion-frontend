import { forwardRef, MutableRefObject, useCallback, useState } from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano'
import "react-piano/dist/styles.css"
import Box from '@mui/material/Box'

import { VolumeSlider } from '../../player/mixer/VolumeSlider'
import { DcData } from '../../../../types'
import Mixer from '../../player/mixer/Mixer'
import Socket from '../../../../socket'

interface PlayingNote {
  midiNumber: string
}

interface Props {
  selectedInst: string
  sendDataToAllUsers: (data: DcData) => void
  mixerRef: MutableRefObject<Mixer | undefined>
}

const PianoComponent = ({ selectedInst, sendDataToAllUsers, mixerRef }: Props) => {
  const firstNote = MidiNumbers.fromNote('c3')
  const lastNote = MidiNumbers.fromNote('f4')
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });
  const [playingNotes, setPlayingNotes] = useState<PlayingNote[]>([])
  const [volume, setVolume] = useState<number>(100)

  const handleVolumeChange = useCallback((event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setVolume(newValue);
    }
  }, [])

  const onPlayNote = useCallback((midiNumber: string) => {
    // const playingNote = pianoRef.current?.start(midiNumber, 0, { gain: volume / 120, release: 1 })
    // setPlayingNotes(prev => prev?.concat({ midiNumber, playingNote }))
    // sendDataToAllUsers(dcData)
    mixerRef.current?.channels[Socket.socket.id]?.piano?.onKey(midiNumber)
    console.log(midiNumber)
  }, [volume])

  const onStopNote = useCallback((midiNumber: string) => {
    // setPlayingNotes(prev => prev?.filter(v => v.midiNumber !== midiNumber))
  }, [playingNotes])

  return (
    <div className='flex justify-center mt-12 mb-24'>
      <div className="flex gap-4 bg-studion-600 py-4 px-6 rounded-md">
        <Piano
          noteRange={{ first: firstNote, last: lastNote }}
          playNote={(midiNumber: string) => {
            if (selectedInst === 'piano') {
              onPlayNote(midiNumber)
              const dcData = {
                type: 'onPiano',
                key: midiNumber
              } as DcData
              sendDataToAllUsers(dcData)
            }
          }}
          stopNote={(midiNumber: string) => {
            if (selectedInst === 'piano') {
              onStopNote(midiNumber)
              const dcData = {
                type: 'offPiano',
                key: midiNumber
              } as DcData
              sendDataToAllUsers(dcData)
            }
          }}
          width={1000}
          keyboardShortcuts={keyboardShortcuts}
        />
        <div className="flex flex-col pt-4 justify-between items-center">
          <Box className="h-56">
            <VolumeSlider
              valueLabelDisplay="auto"
              aria-label="volume slider"
              value={volume}
              max={120}
              orientation="vertical"
              onChange={handleVolumeChange}
            />
          </Box>
          <div className="px-3 text-sm rounded bg-gray-200">
            piano
          </div>
        </div>
      </div>
    </div>
  )
}

export default forwardRef(PianoComponent)