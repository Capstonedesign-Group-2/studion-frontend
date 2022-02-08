import Image from "next/image"
import { useSelector } from "react-redux"

import { RootState } from "../../../redux/slices"
import { IChatItem } from "../../../types"

const ChatItem = ({ chatItem }: { chatItem: IChatItem }) => {
  const userData = useSelector((state: RootState) => state.user.data)

  // 내가 보냈을 때
  if (chatItem.user.id === userData?.id) {
    return (
      <div className="bg-studion-500 ml-8 text-white p-2 break-all self-end rounded-t-md rounded-bl-md shadow">
        {chatItem.content}
      </div>
    )
  }

  // 남이 보냈을 때
  return (
    <div className="w-full flex gap-2">
      <div>
        {chatItem.user.image
          ? <Image className="w-full rounded-full" src='/' layout="fill" alt="profile image" />
          : <div className='flex-initial flex w-8 aspect-square rounded-full bg-studion-400 justify-center items-center text-white text-sm'>
            <p>{chatItem.user.name.slice(0, 2).toUpperCase()}</p>
          </div>
        }
      </div>
      <div className="w-full flex flex-col">
        <span className="text-gray-700 text-sm">
          {chatItem.user.name}
        </span>
        <div className="bg-white mr-8 text-gray-700 p-2 break-all self-start rounded-b-md rounded-tr-md shadow">
          {chatItem.content}
        </div>
      </div>
    </div>
  )
}

export default ChatItem