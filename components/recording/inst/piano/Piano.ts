import Mixer from "../mixer/Mixer"

class Piano {
  gainNode: GainNode
  tracks: {
    keycord: string
    buffer: AudioBuffer
  }[]

  constructor(
    public mixer: Mixer
  ) {
    let self = this

    this.tracks = []

    for (let i = 0; i < 18; i++) {
      const keycord = i + 40 + 8
      loadBuffer(`/sounds/piano/piano-ff-0${i + 40}.wav`, this.mixer.audioContext, (buffer: AudioBuffer) => {
        self.tracks.push({
          'keycord': keycord.toString(),
          'buffer': buffer
        })
      })
    }

    this.gainNode = this.mixer.audioContext.createGain()
    this.gainNode.gain.value = 100 / 120
  }

  onKey(midiNumber: string) {
    if (this.mixer.audioContext && this.gainNode && this.mixer) {
      const audioBufferSourceNode = this.mixer.audioContext.createBufferSource()
      audioBufferSourceNode.buffer = this.tracks.find(track => track.keycord === midiNumber.toString())?.buffer as AudioBuffer
      audioBufferSourceNode
        .connect(this.gainNode)
        .connect(this.mixer.masterGainNode as GainNode)
      audioBufferSourceNode.start()
    }
  }

  setGain(value: number) {
    this.gainNode.gain.value = value
  }
}

const loadBuffer = (url: string, ctx: AudioContext, fn: any) => {
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

export default Piano