import { useCallback, useEffect, useRef, useState } from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano'
import Soundfont from 'soundfont-player'
import "react-piano/dist/styles.css"
import Box from '@mui/material/Box'

import { VolumeSlider } from '../../player/mixer/VolumeSlider'

interface PlayingNote {
  midiNumber: string
  playingNote: Soundfont.Player | undefined
}

const PianoComponent = () => {
  const firstNote = MidiNumbers.fromNote('c3')
  const lastNote = MidiNumbers.fromNote('f4')
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });
  const audioCtxRef = useRef<AudioContext>()
  const pianoRef = useRef<Soundfont.Player>()
  const [playingNotes, setPlayingNotes] = useState<PlayingNote[]>([])
  const [volume, setVolume] = useState<number>(100)

  const handleVolumeChange = useCallback((event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setVolume(newValue);
    }
  }, [])

  const onPlayNote = useCallback((midiNumber: string) => {
    const playingNote = pianoRef.current?.start(midiNumber, 0, { gain: volume / 120, release: 1 })
    setPlayingNotes(prev => prev?.concat({ midiNumber, playingNote }))
  }, [volume])

  const onStopNote = useCallback((midiNumber: string) => {
    playingNotes?.find(v => v.midiNumber === midiNumber)?.playingNote?.stop()
    setPlayingNotes(prev => prev?.filter(v => v.midiNumber !== midiNumber))
  }, [playingNotes])

  useEffect(() => {
    audioCtxRef.current = new AudioContext()
    Soundfont.instrument(audioCtxRef.current, 'acoustic_grand_piano')
      .then((grandPiano) => {
        pianoRef.current = grandPiano
      })
  }, [])

  return (
    <div className='flex justify-center mt-12 mb-24'>
      <div className="flex gap-4 bg-studion-600 py-4 px-6 rounded-md">
        <Piano
          noteRange={{ first: firstNote, last: lastNote }}
          playNote={(midiNumber: string) => {
            onPlayNote(midiNumber)
          }}
          stopNote={(midiNumber: string) => {
            onStopNote(midiNumber)
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

export default PianoComponent