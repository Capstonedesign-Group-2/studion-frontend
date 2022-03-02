import Image from "next/image"
import { useCallback, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/slices"
import { IRoom } from "../../../types"

import { Modal } from "../../common/modals"
import RoomEditForm from "./RoomEditFrom"

const RoomInfoSection = () => {
  const roomData = useSelector<RootState, IRoom>(state => state.room.roomData)
  const [showInfo, setShowInfo] = useState<boolean>(false)

  const onEditBtn = useCallback(() => {
    Modal.fire({
      html: <RoomEditForm />,
      showConfirmButton: false
    })
  }, [])

  return (
    <div className="overflow-hidden bg-white shadow-md rounded-md sm:rounded-lg border-b border-gray-200">
      {/* 방 제목 */}
      <div className="flex justify-between px-6 py-4 text-xl font-medium text-gray-900">
        <div>
          <button className="mr-4 duration-150 text-studion-500"
            style={{ transform: showInfo ? '' : 'rotate(-90deg)' }}
            onClick={() => setShowInfo(!showInfo)}
          >
            ▽
          </button>
          {roomData && roomData.title}
        </div>
        {true && ( // 방장만 정보 바꾸기
          <button className="text-xl"
            onClick={onEditBtn}
          >
            ⚙️
          </button>
        )}
      </div>

      {showInfo && (
        <div className="flex flex-col gap-4 py-4 bg-gray-100">
          {/* 인원 리스트 */}
          <div className="flex gap-4 justify-center">
            {roomData?.users.length !== 0 && roomData.users.map(user => (
              user.image
                ? <Image className='w-8 h-8 rounded-full' src={user.image} alt="profile image" />
                : (
                  <div className='flex items-center justify-center rounded-full text-white text-sm bg-studion-400 w-8 h-8'>
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                )
            ))}
          </div>

          {/* 방 설명 */}
          <span className="px-6 text-md font-medium text-gray-900">
            {roomData && roomData.content}
          </span>
        </div>
      )}
    </div>
  )
}

export default RoomInfoSection