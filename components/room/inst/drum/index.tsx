import Pad from "./Pad"

const Drum = () => {
  return (
    <div>
      <div>
        {DATA && DATA.map(pad => (
          <Pad key={pad.id} pad={pad} volume={80}/>  
        ))}
      </div>
    </div>
  )
}

export default Drum

const DATA = [
  { letter: 'Q',
    keycode: 81,
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  { letter: 'W',
    keycode: 87,
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
  { letter: 'E',
    keycode: 69,
    id: 'Kick-and-Hat',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  { letter: 'A',
    keycode: 65,
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  { letter: 'S',
    keycode: 83,
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  { letter: 'D',
    keycode: 68,
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  },
  { letter: 'Z',
    keycode: 90,
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  { letter: 'X',
    keycode: 88,
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  { letter: 'C',
    keycode: 67,
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
];
