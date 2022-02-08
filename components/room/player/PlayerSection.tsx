import Mixer from "./mixer/Mixer"
import MixerContainer from "./mixer/MixerContainer"

interface Props {
  mixerRef: React.MutableRefObject<Mixer | undefined>
}

const PlayerSection = ({ mixerRef }: Props) => {
  return (
    <div>
      <h3 className="text-xl font-medium mb-5">
        # Player List
      </h3>
      <div className="bg-gray-300 drop-shadow-2xl">
        <MixerContainer mixerRef={mixerRef} />
      </div>
    </div>
  )
}

export default PlayerSection