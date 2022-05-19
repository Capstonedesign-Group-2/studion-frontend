import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import { DATA, playingStyle } from './drum'
import Box from '@mui/material/Box'

import { VolumeSlider } from '../../../room/player/mixer/VolumeSlider'
import Mixer from '../mixer/Mixer'
interface Props {
  selectedInst: string
  mixerRef: MutableRefObject<Mixer | undefined>
}
const DrumComponent = ({ selectedInst, mixerRef}: Props) => {
  const [playing, setPlaying] = useState<string[]>([])

  const handleVolumeChange = useCallback((event: Event, newValue: number | number[]) => {
    if(typeof newValue === 'number') {
      mixerRef.current?.drum?.setGain(newValue / 120)
    }
  }, [mixerRef])
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    playDrum(event.key)
  }, [mixerRef])

  const playDrum = (eventKey: string) => {
    const key = eventKey.toUpperCase()
    mixerRef.current?.drum.onPlay(key)
    setPlaying((prev) => [...prev, key])
    setTimeout(() => {
      setPlaying((prev) => prev.filter(v => v !== key))
    }, 100)
  }
  useEffect(() => {
    if(selectedInst === 'drum') {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedInst])

  return (
    <div className="flex justify-center mt-12 mb-24">
      <div className="flex items-center gap-4 p-4 bg-studion-600 rounded-md">
        <div className="grid grid-cols-3 gap-2 rounded-l-md">
          {DATA && DATA.map((pad) => (
            <div className="flex justify-center items-center text-white bg-studion-300 w-24 h-24 rounded-md duration-75 hover:cursor-pointer"
              style={playing.find(v => v === pad.letter) ? playingStyle : {}}
              key={pad.id}
              onClick={() => playDrum(pad.letter)}
            >
              <div id={pad.id}>
                <audio key={pad.id} id={pad.id} src={pad.url}></audio>
                {pad.letter}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col h-full pt-3 justify-between items-center">
          <Box className="h-64">
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
            drum
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrumComponent