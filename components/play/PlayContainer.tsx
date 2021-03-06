import UserProfileBox from "./UserProfileBox"
import RoomList from './RoomList'
import { memo } from "react"

const PlayContainer = () => {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="pt-36 pb-56">
            <h2 className="text-2xl font-medium mb-8">
              ルームリスト
            </h2>
            <UserProfileBox />
            <RoomList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(PlayContainer)
