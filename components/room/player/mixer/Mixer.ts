import { Drum } from "../../inst/drum/drum"

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

  getAudioContext() {
    return this.audioContext
  }

  addNewChannel(newChannel: Channel) {
    // 노드 생성
    // const gainNode = this.audioContext.createGain()
    // const muteNode = this.audioContext.createGain()
    // const pannerNode = new StereoPannerNode(this.audioContext, { pan: 0 })
    // newChannel.setNodes(gainNode, muteNode, pannerNode)

    // 오디오 소스 생성
    // let source = this.audioContext.createMediaStreamSource(newChannel.stream)

    // 소스 연결
    // if (this.masterGainNode && newChannel.gainNode && newChannel.muteNode && newChannel.pannerNode) {
    //   source.connect(newChannel.gainNode)
    //   newChannel.gainNode.connect(newChannel.muteNode)
    //   newChannel.muteNode.connect(newChannel.pannerNode)
    //   newChannel.pannerNode.connect(this.masterGainNode)

    //   this.channels[newChannel.socketId] = newChannel
    // } else {
    //   console.error('not Nodes or masterGainNode')
    // }

    this.channels[newChannel.socketId] = newChannel
  }

  deleteChannel(dataId: string) { // data.id === Socket id
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

export class Channel extends Mixer {
  name: string
  socketId: string
  stream: MediaStream
  gainNode: GainNode
  muteNode: GainNode
  pannerNode: StereoPannerNode
  drum: Drum

  constructor(name: string, SocketId: string, stream: MediaStream) {
    super()
    this.name = name
    this.socketId = SocketId
    this.stream = stream

    this.gainNode = super.getAudioContext().createGain()
    this.muteNode = super.getAudioContext().createGain()
    this.pannerNode = new StereoPannerNode(super.getAudioContext(), { pan: 0 })
    this.drum = new Drum(this.audioContext, this)
    this.setConnection()
    super.addNewChannel(this)
  }

  // setNodes(gainNode: GainNode, muteNode: GainNode, pannerNode: StereoPannerNode) {
  //   this.gainNode = gainNode
  //   this.muteNode = muteNode
  //   this.pannerNode = pannerNode
  // }

  setConnection() {
    // 오디오 소스 생성
    let source = this.audioContext.createMediaStreamSource(this.stream)

    // 소스 연결
    // if (this.masterGainNode && newChannel.gainNode && newChannel.muteNode && newChannel.pannerNode) {
    source.connect(this.gainNode)
    this.gainNode.connect(this.muteNode)
    this.muteNode.connect(this.pannerNode)
    this.pannerNode.connect(this.masterGainNode)

    // } else {
    //   console.error('not Nodes or masterGainNode')
    // }
  }

  setGain(value: number) {
    if (!this.gainNode) return
    this.gainNode.gain.value = value
  }

  setMute(mute: boolean) { // default false
    if (!this.muteNode) return
    if (!mute) {
      this.muteNode.gain.value = 0
    } else {
      this.muteNode.gain.value = 1
    }
  }

  setPan(value: number) { // -1 ~ 1
    if (!this.pannerNode) return
    this.pannerNode.pan.value = value
  }
}
