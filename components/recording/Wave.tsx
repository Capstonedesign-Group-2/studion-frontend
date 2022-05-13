import Mixer from "./inst/mixer/Mixer"

export class Wave {
    gainNode: GainNode
    mediaElementSource: MediaElementAudioSourceNode
    constructor(
        public mixer: Mixer,
        public audio: HTMLAudioElement
    ) {
        this.gainNode = this.mixer.audioContext.createGain()
        this.mediaElementSource = this.mixer.audioContext.createMediaElementSource(audio)
        this.mediaElementSource.connect(this.gainNode)
        this.gainNode.connect(this.mixer.recorderNode)
        this.gainNode.gain.value = 100 / 120
    }

    setGain(value: number | boolean) {
        if(typeof(value) === 'number')
            this.gainNode.gain.value = value
        else {
            if(value) {
                this.gainNode.gain.value = 1
            } else {
                this.gainNode.gain.value = 0
            }
        }
    }
    onPlay () {
        this.audio.play()
    }
    onStop() {
        this.audio.pause()
        this.audio.currentTime = 0
    }
    setMute(value: boolean) {
        this.gainNode.gain.value = 0
    }
    
}
