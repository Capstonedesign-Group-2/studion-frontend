import ChatSection from "./menu/ChatSection"
import KeyInstSection from "./inst/KeyInstSeciton"
import MyInfoSection from "./menu/MyInfoSection"
import PlayerSection from "./player/PlayerSection"

const RoomContainer = () => {
  return (
    <div className="pb-20 relative pt-10 px-5 xl:px-16">
      <KeyInstSection/>
      <PlayerSection/>
    </div>
  )
}

export default RoomContainer
