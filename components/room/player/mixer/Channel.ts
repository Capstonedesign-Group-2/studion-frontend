export class Channel {
  socketId: string
  name: string
  stream: MediaStream
  gainNode: GainNode | null
  gain: number

  constructor(SocketId: string, name: string, stream: MediaStream) {
    this.socketId = SocketId
    this.name = name
    this.stream = stream
    this.gainNode = null
    this.gain = 1
  }

  setGainNode(gainNode: GainNode) {
    this.gainNode = gainNode
  }

  setGain(value: number) {
    this.gain = value
  }
}