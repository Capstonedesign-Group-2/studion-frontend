import { useSelector } from "react-redux"

import { RootState } from "../../../../redux/slices"
import MasterTrack from "./MasterTrack"
import Mixer from "./Mixer"
import Track from "./Track"

interface Props {
  mixerRef: React.MutableRefObject<Mixer | undefined>
}

const MixerContainer = ({ mixerRef }: Props) => {
  const users = useSelector<RootState, { id: string, name: string }[]>(state => state.room.users)

  return (
    <div className="grid grid-cols-9 gap-1 2xl:grid-cols-12">
      {users.map(user => (
        <Track key={user.id} user={user} />
      ))}
      <div className="col-start-9 2xl:col-start-12">
        <MasterTrack mixerRef={mixerRef} />
      </div>
    </div>
  )
}

export default MixerContainer