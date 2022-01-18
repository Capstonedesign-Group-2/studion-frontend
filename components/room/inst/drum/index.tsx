import { useCallback, useState } from "react"
import Box from '@mui/material/Box'

import { VolumeSlider } from '../../player/mixer/VolumeSlider'
import Pad from "./Pad"

const Drum = () => {
  const [valume, setValume] = useState<number>(30)

  const handleValumeChange = useCallback((event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      console.log(valume)
      setValume(newValue);
    }
  }, [valume])

  return (
    <div className="flex justify-center mt-12 mb-24">
      <div className="grid grid-cols-3 px-4 py-2 gap-2 bg-studion-300 rounded-l-md">
        {DATA && DATA.map(pad => (
          <Pad key={pad.id} pad={pad} volume={valume}/>  
        ))}
      </div>
      <div>
        <Box className='h-72'>
          <VolumeSlider
            valueLabelDisplay="auto"
            aria-label="valume slider"
            value={valume}
            max={100}
            orientation="vertical"
            onChange={handleValumeChange}
          />
        </Box>
      </div>
    </div>
  )
}

export default Drum

const DATA = [
  { letter: 'Q',
    keycode: 81,
    id: 'Open-HH',
    url: '/sounds/drum/cr.wav'
  },
  { letter: 'W',
    keycode: 87,
    id: 'Closed-HH',
    url: '/sounds/drum/hi.wav'
  },
  { letter: 'E',
    keycode: 69,
    id: 'Kick-and-Hat',
    url: '/sounds/drum/snoff.wav'
  },
  { letter: 'A',
    keycode: 65,
    id: 'Punchy-Kick',
    url: '/sounds/drum/tom3.wav'
  },
  { letter: 'S',
    keycode: 83,
    id: 'Kick',
    url: '/sounds/drum/tom2.wav'
  },
  { letter: 'D',
    keycode: 68,
    id: 'Snare',
    url: '/sounds/drum/tom1.wav'
  },
  { letter: 'Z',
    keycode: 90,
    id: 'Side-Stick',
    url: '/sounds/drum/snst.wav'
  },
  { letter: 'X',
    keycode: 88,
    id: 'Clap',
    url: '/sounds/drum/ki.wav'
  },
  { letter: 'C',
    keycode: 67,
    id: 'Shaker',
    // url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    url: '/sounds/drum/sn.wav'
  },
]
