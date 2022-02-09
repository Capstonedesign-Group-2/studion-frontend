import { useSelector } from "react-redux"
import { RootState } from "../../redux/slices"
import { Room } from "../../types"
import RoomBox from "./RoomBox"

const RoomList = () => {
  const roomList = useSelector<RootState, Room[]>((state) => state.room.roomList)

  return (
    <div className="mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-5 gap-x-10 pb-10">
        {roomList
          ? roomList?.map((room: Room) => <RoomBox room={room} key={room.id} />)
          : <p>룸 정보가 없습니다</p>
        }
      </div>
    </div>
  )
}

export default RoomList
