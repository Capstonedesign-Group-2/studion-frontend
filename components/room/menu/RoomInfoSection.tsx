import { useCallback, useState } from "react"

import { Modal } from "../../common/modals"
import RoomEditForm from "./RoomEditFrom"

const RoomInfoSection = () => {
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
          new Room
        </div>
        {true && ( // 방장만 정보 바꾸기
          <button className="text-sm text-studion-400"
            onClick={onEditBtn}
          >
            Edit
          </button>
        )}
      </div>

      {showInfo && (
        <div className="flex flex-col gap-4 py-4 bg-gray-100">
          {/* 인원 리스트 */}
          <span className="px-6 self-center text-md font-medium text-gray-900">
            dong / joon / ppang
          </span>

          {/* 방 설명 */}
          <span className="px-6 text-md font-medium text-gray-900">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis natus cum beatae porro facere nemo labore quis ea. Expedita eaque, pariatur explicabo quam harum ut tempore fugiat tenetur error soluta.
          </span>
        </div>
      )}
    </div>
  )
}

export default RoomInfoSection