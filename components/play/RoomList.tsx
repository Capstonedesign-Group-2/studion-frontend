import { memo } from "react"
import { useSelector } from "react-redux"

import { RootState } from "../../redux/slices"
import { IRoom } from "../../types"
import RoomBox from "./RoomBox"

const RoomList = () => {
  const roomList = useSelector<RootState, IRoom[]>((state) => state.room.roomList)

  return (
    <div className="mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-5 gap-x-10 pb-10">
        {roomList?.length !== 0
          ? roomList?.map((room: IRoom) => <RoomBox room={room} key={room.id} />)
          : <p>ルーム情報がありません。</p>
        }
      </div>
    </div>
  )
}

export default memo(RoomList)
