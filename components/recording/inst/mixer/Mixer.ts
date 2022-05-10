import Drum from "../drum/drum"
import Piano from "../piano/Piano"
import Vocal from "../vocal/Vocal"

export default class Mixer {
  audioContext: AudioContext
  masterGainNode: GainNode
  masterMuteNode: GainNode
  masterAnalyser: AnalyserNode
  recorderNode: MediaStreamAudioDestinationNode
  vocal: Vocal
  piano: Piano
  drum: Drum

  constructor(
    public stream: MediaStream,
  ) {
    this.audioContext = new AudioContext
    this.masterGainNode = this.audioContext.createGain()
    this.masterMuteNode = this.audioContext.createGain()
    this.masterAnalyser = this.audioContext.createAnalyser()
    this.recorderNode = this.audioContext.createMediaStreamDestination()

    // 노드 연결
    this.masterGainNode.connect(this.masterMuteNode)
    this.masterMuteNode.connect(this.masterAnalyser)
    this.masterAnalyser.connect(this.recorderNode) // 마지막 노드에 recorderNode 연결
    this.masterAnalyser.connect(this.audioContext.destination)

    // 악기 인스턴스 생성
    this.vocal = new Vocal(this)
    this.piano = new Piano(this)
    this.drum  = new Drum(this)
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