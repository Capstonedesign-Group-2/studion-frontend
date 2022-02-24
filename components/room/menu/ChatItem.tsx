import Image from "next/image"
import { useSelector } from "react-redux"

import { RootState } from "../../../redux/slices"
import { IMessage } from "../../../types"

const ChatItem = ({ message }: { message: IMessage }) => {
  const userData = useSelector((state: RootState) => state.user.data)

  // 내가 보냈을 때
  if (message.user.id === userData?.id) {
    return (
      <div className="bg-studion-500 ml-8 text-white p-2 px-3 break-all self-end rounded-t-md rounded-bl-md shadow">
        {message.msg}
      </div>
    )
  }

  // 남이 보냈을 때
  return (
    <div className="w-full flex gap-2">
      <div>
        {message.user.image
          ? <Image className="w-full rounded-full" src='/' layout="fill" alt="profile image" />
          : <div className='flex-initial flex w-8 aspect-square rounded-full bg-studion-400 justify-center items-center text-white text-sm'>
            <p>{message.user.name.slice(0, 2).toUpperCase()}</p>
          </div>
        }
      </div>
      <div className="w-full flex flex-col">
        <span className="text-gray-700 text-sm">
          {message.user.name}
        </span>
        <div className="bg-white mr-8 text-gray-700 p-2 px-3 break-all self-start rounded-b-md rounded-tr-md shadow">
          {message.msg}
        </div>
      </div>
    </div>
  )
}

export default ChatItem