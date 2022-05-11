import Mixer from "./inst/mixer/Mixer"

export class Wave {
    gainNode: GainNode

    constructor(
        public mixer: Mixer
    ) {
        this.gainNode = this.mixer.masterGainNode

    }
}