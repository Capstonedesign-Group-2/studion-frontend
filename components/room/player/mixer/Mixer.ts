export default class Mixer {
  channels: { [SocketId: string]: Channel }
  audioContext: AudioContext
  masterGainNode: GainNode
  masterMuteNode: GainNode
  masterAnalyser: AnalyserNode

  constructor() {
    this.channels = {}
    this.audioContext = new AudioContext
    this.masterGainNode = this.audioContext.createGain()
    this.masterMuteNode = this.audioContext.createGain()
    this.masterAnalyser = this.audioContext.createAnalyser()

    // 노드 연결
    this.masterGainNode.connect(this.masterMuteNode)
    this.masterMuteNode.connect(this.masterAnalyser)
    this.masterAnalyser.connect(this.audioContext.destination)
  }

  addNewChannel(newChannel: Channel) {
    // 게인 노드 생성
    const gainNode = this.audioContext.createGain()
    newChannel.setGainNode(gainNode)

    // 오디오 소스 생성
    let source = this.audioContext.createMediaStreamSource(newChannel.stream)

    // 소스 연결
    if (newChannel.gainNode && this.masterGainNode) {
      source.connect(newChannel.gainNode)
      newChannel.gainNode.connect(this.masterGainNode)
      this.channels[newChannel.socketId] = newChannel
    } else {
      console.error('not gainNode or masterGainNode')
    }
  }

  deleteChannel(dataId: string) { // data.id === Socket id
    // this.channels = this.channels.filter((channel) => channel.socketId !== dataId)
    delete this.channels[dataId]
  }

  setMasterGain(value: number) {
    if (!this.masterGainNode) return
    this.masterGainNode.gain.value = value
  }

  setMasterMute(mute: boolean) { // default false
    if (!this.masterMuteNode) return
    if (!mute) {
      this.masterMuteNode.gain.value = 0
    } else {
      this.masterMuteNode.gain.value = 1
    }
  }
}

export class Channel {
  name: string
  socketId: string
  stream: MediaStream
  gainNode: GainNode | null

  constructor(name: string, SocketId: string, stream: MediaStream) {
    this.name = name
    this.socketId = SocketId
    this.stream = stream
    this.gainNode = null
  }

  setGainNode(gainNode: GainNode) {
    this.gainNode = gainNode
  }

  setGain(value: number) {
    if (!this.gainNode) return
    this.gainNode.gain.value = value
  }
}