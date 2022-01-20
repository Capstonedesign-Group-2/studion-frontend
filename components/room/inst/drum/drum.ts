export const loadBuffer = (url: string, ctx: AudioContext, fn: any) => {
  let request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.responseType = 'arraybuffer'
  request.onload = () => {
    ctx.decodeAudioData(request.response, (buff) => {
      let buffer = buff
      fn(buffer)
    }, (error) => {
      console.error(error)
    })
  }
  request.send()
}

export const playingStyle = {
  backgroundColor: '',
  borderBottom: '6px solid #34D399',
  transform: 'scale(0.95)'
}

export const DATA = [
  {
    letter: 'Q',
    keycode: 81,
    id: 'Open-HH',
    url: '/sounds/drum/cr.wav'
  },
  {
    letter: 'W',
    keycode: 87,
    id: 'Closed-HH',
    url: '/sounds/drum/hi.wav'
  },
  {
    letter: 'E',
    keycode: 69,
    id: 'Kick-and-Hat',
    url: '/sounds/drum/snoff.wav'
  },
  {
    letter: 'A',
    keycode: 65,
    id: 'Punchy-Kick',
    url: '/sounds/drum/tom3.wav'
  },
  {
    letter: 'S',
    keycode: 83,
    id: 'Kick',
    url: '/sounds/drum/tom2.wav'
  },
  {
    letter: 'D',
    keycode: 68,
    id: 'Snare',
    url: '/sounds/drum/tom1.wav'
  },
  {
    letter: 'Z',
    keycode: 90,
    id: 'Side-Stick',
    url: '/sounds/drum/snst.wav'
  },
  {
    letter: 'X',
    keycode: 88,
    id: 'Clap',
    url: '/sounds/drum/ki.wav'
  },
  {
    letter: 'C',
    keycode: 67,
    id: 'Shaker',
    url: '/sounds/drum/sn.wav'
  },
]