import { MutableRefObject, useCallback } from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano'
import "react-piano/dist/styles.css"
import Box from '@mui/material/Box'

import { VolumeSlider } from '../../../room/player/mixer/VolumeSlider'
import Mixer from '../mixer/Mixer'

interface Props {
  selectedInst: string
  mixerRef: MutableRefObject<Mixer | undefined>
}

const PianoComponent = ({ selectedInst, mixerRef }: Props) => {
  const firstNote = MidiNumbers.fromNote('c3')
  const lastNote = MidiNumbers.fromNote('f4')
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  const handleVolumeChange = useCallback((event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      if (!mixerRef.current) return
      mixerRef.current.piano.setGain(newValue / 120)
    }
  }, [mixerRef])

  const onPlayNote = useCallback((midiNumber: string) => {
    if (!mixerRef.current) return
    mixerRef.current.piano.onKey(midiNumber)
    console.log(mixerRef.current)
  }, [mixerRef])

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