import Box from '@mui/material/Box'
import { useCallback, useState } from "react"
import Mixer from './Mixer'

import { VolumeSlider } from "./VolumeSlider"

interface Props {
  mixerRef: React.MutableRefObject<Mixer | undefined>
}

const MasterTrack = ({ mixerRef }: Props) => {
  const [volume, setVolume] = useState<number>(100)
  const [mute, setMute] = useState<boolean>(false)

  const onMute = useCallback(() => {
    if (!mixerRef.current) return
    mixerRef.current.setMasterMute(mute)
    setMute(!mute)
  }, [mute, mixerRef])

  const setMuteStyle = useCallback(() => {
    let setColor = '#f87171'

    if (mute) {
      setColor = '#a1a1aa'
    }

    return {
      color: setColor,
      textShadow: mute ? '' : `${setColor} 1px 0 8px`,
      borderColor: setColor
    }
  }, [mute])

  const handleVolumeChange = useCallback((event: Event, newVolume: number | number[]) => {
    if (typeof newVolume === 'number') {
      if (!mixerRef.current) return
      mixerRef.current.setMasterGain(newVolume / 120)
      setVolume(newVolume);
    }
  }, [mixerRef])

  return (
    <div className="bg-gray-600 h-full flex flex-col-reverse items-center gap-4 py-4 px-2">
      <Box className='h-72'>
        <VolumeSlider
          valueLabelDisplay="auto"
          aria-label="valume slider"
          value={volume}
          orientation="vertical"
          max={120}
          onChange={handleVolumeChange}
          sx={{
            color: '#f87171',
            '& .MuiSlider-valueLabel': {
              backgroundColor: '#f87171',
            },
            '& .MuiSlider-thumb': {
              backgroundColor: '#fff',
            },
          }}
        />
      </Box>

      <div className="text-gray-100">
        0
      </div>

      <div className="px-3 mt-4 text-sm rounded bg-gray-200">
        Master
      </div>

      {/* Mute 버튼 */}
      <button onClick={onMute}>
        <div className="text-sm mt-2 px-4 py-2 border-2 border-red-400 text-red-400 shadow"
          style={setMuteStyle()}
        >
          On
        </div>
      </button>
    </div>
  )
}

export default MasterTrack