import Link from "next/link"
import { useSelector } from "react-redux"

import { RootState } from "../../redux/slices"
import { IRoom } from "../../types"

const RecordingHeader = () => {
  const roomData = useSelector<RootState, IRoom>(state => state.room.roomData)

  return (
    <header className="bg-studion-600 z-20 fixed w-full h-14 py-2 shadow-md px-4 xl:pl-16 flex justify-between items-center">
      <Link href="/">
        <a>
          <svg viewBox="0 0 20 20" className="w-8 h-8 cursor-pointer fill-gray-100">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule='evenodd' fillRule="evenodd"></path>
          </svg>
        </a>
      </Link>
      <div className="text-gray-100 text-2xl">
        {roomData && roomData.title}
      </div>
    </header>
  )
}

export default RecordingHeader
