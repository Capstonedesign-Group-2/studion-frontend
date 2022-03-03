import { DcData } from "../../types"
import KeyInstSection from "./inst/KeyInstSeciton"
import Mixer from "./player/mixer/Mixer"
import PlayerSection from "./player/PlayerSection"

interface Props {
  sendDataToAllUsers: (data: DcData) => void
  mixerRef: React.MutableRefObject<Mixer | undefined>
}

const RoomContainer = ({ sendDataToAllUsers, mixerRef }: Props) => {
  return (
    <div className="pb-20 relative pt-10 px-5 xl:px-16">
      <KeyInstSection
        sendDataToAllUsers={sendDataToAllUsers}
        mixerRef={mixerRef}
      />
      <PlayerSection
        mixerRef={mixerRef}
      />
    </div>
  )
}

export default RoomContainer
