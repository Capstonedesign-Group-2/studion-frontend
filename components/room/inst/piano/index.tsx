import { MutableRefObject, useCallback } from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano'
import "react-piano/dist/styles.css"
import Box from '@mui/material/Box'

import { VolumeSlider } from '../../player/mixer/VolumeSlider'
import { DcData } from '../../../../types'
import Mixer from '../../player/mixer/Mixer'
import Socket from '../../../../socket'

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

  const handleVolumeChange = useCallback((event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      mixerRef.current?.channels[Socket.socket.id]?.piano?.setGain(newValue / 120)
    }
  }, [mixerRef])

  const onPlayNote = useCallback((midiNumber: string) => {
    const dcData = {
      type: 'onPiano',
      key: `p_${midiNumber}`, // swift에서 string으로 보내도 숫자만 보내면 number로 처리 됨
      socketId: Socket.socket.id
    } as DcData
    sendDataToAllUsers(dcData)
    mixerRef.current?.channels[Socket.socket.id]?.piano?.onKey(midiNumber)
  }, [mixerRef, sendDataToAllUsers])

  return (
    <div className='flex justify-center mt-12 mb-24'>
      <div className="flex gap-4 bg-studion-600 py-4 px-6 rounded-md">
        <Piano
          noteRange={{ first: firstNote, last: lastNote }}
          playNote={(midiNumber: string) => {
            if (selectedInst === 'piano') {
              onPlayNote(midiNumber)
            }
          }}
          stopNote={(midiNumber: string) => { }}
          width={1000}
          keyboardShortcuts={keyboardShortcuts}
        />
        <div className="flex flex-col pt-4 justify-between items-center">
          <Box className="h-56">
            <VolumeSlider
              valueLabelDisplay="auto"
              aria-label="volume slider"
              defaultValue={100}
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

export default PianoComponent