import Mixer from "../mixer/Mixer";
import Tuna from "tunajs";

export default class Vocal {
  gainNode: GainNode;
  muteNode: GainNode;
  pannerNode: StereoPannerNode;
  delayNode: any;

  constructor(public mixer: Mixer) {
    let tuna = new Tuna(this.mixer.audioContext);

    this.gainNode = this.mixer.audioContext.createGain();
    this.muteNode = this.mixer.audioContext.createGain();
    this.pannerNode = new StereoPannerNode(this.mixer.audioContext, { pan: 0 });
    this.delayNode = new tuna.Delay({
      delayTime: 100,
      wetLevel: 0.5,
    });
    this.setConnection();
  }

  setConnection() {
    // 오디오 소스 생성
    let source = this.mixer.audioContext.createMediaStreamSource(
      this.mixer.stream
    );

    // 소스 연결
    source.connect(this.delayNode);
    this.delayNode.connect(this.gainNode);
    this.gainNode.connect(this.muteNode);
    this.muteNode.connect(this.pannerNode);
    this.pannerNode.connect(this.mixer.masterGainNode);
  }

  setGain(value: number) {
    if (!this.gainNode) return;
    this.gainNode.gain.value = value;
  }

  setMute(mute: boolean) {
    // default false
    if (!this.muteNode) return;
    if (!mute) {
      this.muteNode.gain.value = 0;
    } else {
      this.muteNode.gain.value = 1;
    }
  }

  setPan(value: number) {
    // -1 ~ 1
    if (!this.pannerNode) return;
    this.pannerNode.pan.value = value;
  }

  setDelay(value: number) {
    // 0 ~ 1
    if (!this.delayNode) return;
    this.delayNode.wetLevel = value;
  }
}
