import RoomContainer from "../../components/room/RoomConatiner"
import RoomHeader from "../../components/room/RoomHeader"

const Room = () => {
  return (
    <div className="min-w-screen min-h-screen bg-gray-50">
      <RoomHeader/>
      <RoomContainer/>
    </div>
  )
}

export default Room
