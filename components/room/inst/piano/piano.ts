import { Channel } from "../../player/mixer/Mixer"

class Piano {
  ctx: AudioContext
  channel: Channel
  gainNode: GainNode
  tracks: {
    keycord: string
    buffer: AudioBuffer
  }[]

  constructor(ctx: AudioContext, channel: Channel) {
    let self = this

    this.tracks = []
    this.ctx = ctx
    this.channel = channel

    for (let i = 0; i < 18; i++) {
      // loadBuffer(`/sounds/piano/piano-ff-0${i + 40}.wav`, ctx as AudioContext, function (buffer: AudioBuffer) {
      loadBuffer(`/sounds/piano/piano-ff-040.wav`, ctx as AudioContext, function (buffer: AudioBuffer) {
        self.tracks.push({
          'keycord': (i + 40 + 8).toString(),
          'buffer': buffer
        })
      })
    }

    this.gainNode = ctx.createGain()
    this.gainNode.gain.value = 100 / 120
  }

  onKey(midiNumber: string) {
    if (this.ctx && this.gainNode && this.channel) {
      const audioBufferSourceNode = this.ctx.createBufferSource()
      audioBufferSourceNode.buffer = this.tracks.find(track => track.keycord === midiNumber.toString())?.buffer as AudioBuffer
      audioBufferSourceNode
        .connect(this.gainNode)
        .connect(this.channel.gainNode as GainNode)
      audioBufferSourceNode.start()
    }
  }

  offKey(key: string) {

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