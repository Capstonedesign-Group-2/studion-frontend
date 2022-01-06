import React from "react"

const ChatForm = () => {

  const onSendChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <form className="relative bg-white"
      onSubmit={onSendChat}
    >
      <input className="pl-4 pr-16 py-2 focus:outline-none w-full"
        type="text"
        name="message"
        placeholder="enter message"
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