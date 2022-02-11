import { useSelector } from "react-redux"

import { RootState } from "../../../../redux/slices"
import MasterTrack from "./MasterTrack"
import Mixer from "./Mixer"
import Recorder from "./Recorder"
import Track from "./Track"

interface Props {
  mixerRef: React.MutableRefObject<Mixer | undefined>
}

const MixerContainer = ({ mixerRef }: Props) => {
  const users = useSelector<RootState, { id: string, name: string }[]>(state => state.room.users)

  return (
    <div className="grid grid-cols-9 gap-1 2xl:grid-cols-12">
      {users.map(user => (
        <Track key={`${user.name}_${user.id}`} user={user} mixerRef={mixerRef} />
      ))}
      <div className="col-start-6 2xl:col-start-9">
        <MasterTrack mixerRef={mixerRef} />
      </div>
      <div className="col-span-3 col-start-7 2xl:col-start-10">
        <Recorder />
      </div>
    </div>
  )
}

export default MixerContainer