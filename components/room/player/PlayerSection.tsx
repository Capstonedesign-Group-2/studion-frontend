import MixerContainer from "./mixer/MixerContainer"

const PlayerSection = () => {
  return (
    <div>
      <h3 className="text-xl font-medium mb-5">
        # Player List
      </h3>
      <div className="bg-gray-300 drop-shadow-2xl">
        <MixerContainer/>
      </div>
    </div>
  )
}

export default PlayerSection