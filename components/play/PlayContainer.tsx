import UserProfileBox from "./UserProfileBox"
import RoomContainer from './RoomContainer'

const PlayContainer = () => {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="pt-36 pb-56">
            <h2 className="text-2xl font-medium mb-8">
              ルームリスト
            </h2>
            <UserProfileBox/>
            <RoomContainer/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayContainer
