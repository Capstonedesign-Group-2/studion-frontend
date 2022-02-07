import { DcData } from "../../types"
import KeyInstSection from "./inst/KeyInstSeciton"
import PlayerSection from "./player/PlayerSection"

interface Props {
  sendDataToAllUsers: (data: DcData) => void
}

const RoomContainer = ({ sendDataToAllUsers }: Props) => {
  return (
    <div className="pb-20 relative pt-10 px-5 xl:px-16">
      <KeyInstSection />
      <PlayerSection />
    </div>
  )
}

export default RoomContainer
