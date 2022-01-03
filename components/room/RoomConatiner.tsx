import ChatSection from "./ChatSection"
import KeyInstSection from "./KeyInstSeciton"
import MyInfoSection from "./MyInfoSection"
import PlayerSection from "./PlayerSection"


const RoomContainer = () => {
  return (
    <div className="mt-24 mx-auto max-w-screen-xl grid grid-cols-4 gap-4">
      <div>
        <MyInfoSection/>
      </div>
      <div className="col-span-3">
        <KeyInstSection/>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <ChatSection/>
          </div>
          <div className="col-span-2">
            <PlayerSection/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomContainer