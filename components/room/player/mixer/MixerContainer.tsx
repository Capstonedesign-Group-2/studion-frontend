import { useSelector } from "react-redux"

import { RootState } from "../../../../redux/slices"
import MasterTrack from "./MasterTrack"
import Track from "./Track"

const MixerContainer = () => {
  const users = useSelector<RootState, { id: string, name: string }[]>(state => state.room.users)

  return (
    <div className="grid grid-cols-9 gap-1 2xl:grid-cols-12">
      {users.map(user => (
        <Track key={user.id} user={user} />
      ))}
      <div className="col-start-9 2xl:col-start-12">
        <MasterTrack />
      </div>
    </div>
  )
}

export default MixerContainer