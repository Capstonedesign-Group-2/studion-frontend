import Router from "next/router"
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai"
import { Dispatch, SetStateAction } from "react"

type Props = {
  isNav: boolean
  setNav: Dispatch<SetStateAction<boolean>>
}

const RecordingHeader: React.FC<Props> = ({ setNav, isNav }) => {
  // const roomData = useSelector<RootState, IRoom>(state => state.room.roomData)

  return (
    <header className="bg-studion-600 z-20 fixed w-full h-14 py-2 shadow-md px-4 xl:pl-16 flex justify-between items-center">
      <div onClick={() => Router.back()}>
        <svg viewBox="0 0 20 20" className="w-8 h-8 cursor-pointer fill-gray-100">
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule='evenodd' fillRule="evenodd"></path>
        </svg>
      </div>
      <div className="text-gray-100 text-2xl">
        {/* {roomData && roomData.title} */}
      </div>
      <div className="cursor-pointer absolute right-5" onClick={() => setNav((prev) => !prev)}>
        {
          isNav
            ? <AiOutlineMenuUnfold className="w-8 h-8 fill-gray-100" />
            : <AiOutlineMenuFold className="w-8 h-8 fill-gray-100" />
        }


      </div>
    </header>
  )
}

export default RecordingHeader
