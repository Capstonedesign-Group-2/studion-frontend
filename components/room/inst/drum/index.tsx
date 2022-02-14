import { useCallback, useEffect, useState } from "react"
import Box from '@mui/material/Box'

import { VolumeSlider } from '../../player/mixer/VolumeSlider'
import { DATA, playingStyle } from './drum'
import { DcData } from "../../../../types"
import Mixer from "../../player/mixer/Mixer"
import socket from "../../../../socket"

interface Props {
  selectedInst: string
  sendDataToAllUsers: (data: DcData) => void
  mixerRef: React.MutableRefObject<Mixer | undefined>
}

const DrumComponent = ({ selectedInst, sendDataToAllUsers, mixerRef }: Props) => {
  const [playing, setPlaying] = useState<string[]>([])

  const handleVolumeChange = useCallback((event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      mixerRef.current?.channels[socket.socket.id]?.drum?.setGain(newValue / 120)
    }
  }, [mixerRef])

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const key = e.key.toUpperCase()
    const dcData = {
      type: 'drum',
      key,
      socketId: socket.socket.id
    }
    sendDataToAllUsers(dcData)
    mixerRef.current?.channels[socket.socket.id]?.drum?.onPlay(key)
    setPlaying((prev) => [...prev, key])
    setTimeout(() => {
      setPlaying((prev) => prev.filter(v => v !== key))
    }, 100)
  }, [sendDataToAllUsers, mixerRef])

  useEffect(() => {
    // 사용자가 드럼을 선택했을때만 키 입력 리슨
    if (selectedInst === 'drum') {
      document.addEventListener('keydown', handleKeyPress)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [selectedInst, handleKeyPress])

  return (
    <div className="flex justify-center mt-12 mb-24">
      <div className="flex items-center gap-4 p-4 bg-studion-600 rounded-md">
        <div className="grid grid-cols-3 gap-2 rounded-l-md">
          {DATA && DATA.map((pad) => (
            <div className="flex justify-center items-center text-white bg-studion-300 w-24 h-24 rounded-md duration-75"
              style={playing.find(v => v === pad.letter) ? playingStyle : {}}
              key={pad.id}
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
DrumComponent.displayName = "DrumComponent";

export default DrumComponent
