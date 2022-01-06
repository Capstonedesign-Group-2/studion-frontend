import ChatForm from "./ChatForm"
import ChatItem from "./ChatItem"

const ChatSection = () => {
  return (
    <div className="flex flex-col align-middle shadow rounded-md overflow-hidden sm:rounded-lg border-b border-gray-200">
      <div className="flex-1 flex flex-col  p-2 overflow-y-scroll gap-2">
        {[1,2,3,4,5].map(v => (
          <ChatItem key={v}/>
        ))}
      </div>
      <ChatForm/>
    </div>
  )
}

export default ChatSection