import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { RootState } from "../../../redux/slices"
import { IMessage } from "../../../types"
import Socket from '../../../socket'
import roomSlice from "../../../redux/slices/room"

const ChatForm = () => {
  const dispatch = useDispatch()
  const userData = useSelector((state: RootState) => state.user.data)
  const [newChat, setNewChat] = useState<string>('')

  const onChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChat(e.target.value)
  }, [])

  const onSendChat = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newChat.trim()) return

    const data = {
      user: userData,
      msg: newChat
    } as IMessage

    dispatch(roomSlice.actions.addNewMessage(data))
    Socket.emitNewMessage(data)
    setNewChat('')
  }, [newChat, userData])

  return (
    <form className="flex bg-white justify-between items-center py-2 gap-2 px-4"
      onSubmit={onSendChat}
    >
      <input className="focus:outline-none w-full"
        type="text"
        name="message"
        placeholder="enter message"
        value={newChat}
        onChange={onChangeInput}
      />
      <button className="text-xl outline-none"
        type="submit"
      >
        📨
      </button>
    </form>
  )
}

export default ChatForm