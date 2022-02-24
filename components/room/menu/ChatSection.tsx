import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/slices"

import { IMessage } from "../../../types"
import ChatForm from "./ChatForm"
import ChatItem from "./ChatItem"

const ChatSection = () => {
  const messageList = useSelector<RootState, IMessage[]>(state => state.room.messageList)
  const chatListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTo({ top: chatListRef.current.scrollHeight })
    }
  }, [chatListRef.current?.scrollHeight])

  return (
    <div className="flex flex-col bg-gray-100 shadow-md align-middle rounded-md overflow-hidden sm:rounded-lg border-b border-gray-200 w-full">
      <div className="flex-1 flex flex-col p-2 overflow-y-scroll gap-2 py-6"
        ref={chatListRef}
      >
        {messageList.length !== 0
          ? messageList.map((message, index) => (
            <ChatItem key={index} message={message} />
          ))
          : (
            <p className="text-gray-400 text-center">メッセージを送ってみよう！</p>
          )
        }
      </div>
      <ChatForm />
    </div>
  )
}

export default ChatSection
