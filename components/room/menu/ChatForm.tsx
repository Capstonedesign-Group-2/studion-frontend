import React, { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/slices"

import { ChatItem } from "./ChatSection"

interface Props {
  setChatList: React.Dispatch<React.SetStateAction<ChatItem[]>>
}

const ChatForm = ({ setChatList }: Props) => {
  const userData = useSelector((state: RootState) => state.user.data)
  const [newChat, setNewChat] = useState<string>('')

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChat(e.target.value)
  }

  const onSendChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newChat.trim()) return

    const newChatItem = {
      id: new Date().getTime(),
      content: newChat,
      user: userData
    } as ChatItem
    setChatList((prev) => [...prev, newChatItem])

    setNewChat('')
  }

  return (
    <form className="relative bg-white"
      onSubmit={onSendChat}
    >
      <input className="pl-4 pr-16 py-2 focus:outline-none w-full"
        type="text"
        name="message"
        placeholder="enter message"
        value={newChat}
        onChange={onChangeInput}
      />
      <button className="absolute right-0 bottom-0 text-gray-700 hover:text-studion-500 m-1 px-3 py-1 duration-150 outline-none"
        type="submit"
      >
        Send
      </button>
    </form>
  )
}

export default ChatForm