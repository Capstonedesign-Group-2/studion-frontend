import ChatSection from "./ChatSection"
import KeyInstSection from "./KeyInstSeciton"
import MyInfoSection from "./MyInfoSection"
import PlayerSection from "./PlayerSection"


const RoomContainer = () => {
  return (
    <div className="mt-8 mx-auto max-w-screen-xl grid grid-rows-3 grid-cols-1 lg:grid-cols-4 gap-4 px-2 sm:px-6 lg:px-8">
      <div className="bg-studion-400 row-span-3">
        <MyInfoSection/>
      </div>
      <div>
        <KeyInstSection/>
      </div>
      <div className="bg-studion-200 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <PlayerSection/>
        </div>
        <div className="bg-studion-300 hidden md:block">
          <ChatSection/>
        </div>
      </div>
    </div>
  )
}

export default RoomContainer