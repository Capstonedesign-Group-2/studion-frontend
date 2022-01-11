import Box from '@mui/material/Box'
import { useState } from 'react'

import { VolumeSlider } from './VolumeSlider'

const Track = () => {
  const [valume, setValume] = useState<number>(100)

  const handleValumeChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setValume(newValue);
    }
  };

  return (
    <div className="bg-gray-600 flex flex-col gap-4 py-4 px-2 items-center">
      {/* 플레이어 프로필 */}
      <div>
        <div className="flex w-10 h-10 justify-center items-center rounded-full bg-white border-2 border-studion-100">
          US
        </div>
        <p className="text-white">
          name
        </p>
      </div>

      {/* Solo 버튼 */}
      <div>
        <p className="text-white text-sm text-center">
          SOLO
        </p>
        <button
        >
          <div className="bg-gray-300 h-5 w-12 border-b-4 border-studion-100 shadow"></div>
        </button>
      </div>

      {/* Mute 버튼 */}
      <button>
        <div className="text-sm mt-2 px-4 py-2 border-2 border-studion-100 text-studion-100 shadow">
          ON
        </div>
      </button>

      {/* 악기 포지션 */}
      <div className="px-3 mt-4 text-sm rounded bg-gray-200">
        guitar
      </div>

      <div className="text-gray-100">
        1
      </div>

      <Box className='h-72'>
        <VolumeSlider
          valueLabelDisplay="auto"
          aria-label="valume slider"
          value={valume}
          max={120}
          orientation="vertical"
          onChange={handleValumeChange}
        />
      </Box>
    </div>
  )
}

export default Track
