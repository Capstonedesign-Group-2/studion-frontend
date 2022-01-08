import MasterTrack from "./MasterTrack"
import Track from "./Track"

const MixerContainer = () => {
  return (
    <div className="grid grid-cols-9 gap-1 2xl:grid-cols-12">
      {[1,2,3].map(v => (
        <Track key={v}/>
      ))}
      <div className="col-start-9 2xl:col-start-12">
        <MasterTrack/>
      </div>
    </div>
  )
}

export default MixerContainer