import { useEffect, useRef, useState } from "react"

import { IChatItem } from "../../../types"
import ChatForm from "./ChatForm"
import ChatItem from "./ChatItem"

const ChatSection = () => {
  const [chatList, setChatList] = useState<IChatItem[]>([])
  const chatListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTo({ top: chatListRef.current.scrollHeight })
    }
  }, [chatListRef.current?.scrollHeight])

  return (
    <div className="flex flex-col bg-gray-100 shadow-md align-middle rounded-md overflow-hidden sm:rounded-lg md:mx-4 border-b border-gray-200">
      <div className="flex-1 flex flex-col p-2 overflow-y-scroll gap-2"
        ref={chatListRef}
      >
        {chatList.map((chatItem, index) => (
          <ChatItem key={index} chatItem={chatItem} />
        ))}
      </div>
      <ChatForm setChatList={setChatList} />
    </div>
  )
}

export default ChatSection
