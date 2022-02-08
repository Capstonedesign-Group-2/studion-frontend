import { useEffect, useRef, useState } from "react"

import { IChatItem } from "../../../types"
import ChatForm from "./ChatForm"
import ChatItem from "./ChatItem"

const ChatSection = () => {
  const [chatList, setChatList] = useState<IChatItem[]>(DATA)
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
        {chatList.map(chatItem => (
          <ChatItem key={chatItem.id} chatItem={chatItem} />
        ))}
      </div>
      <ChatForm setChatList={setChatList} />
    </div>
  )
}

export default ChatSection

const DATA = [
  {
    id: 1,
    content: 'hi',
    user: {
      id: 5,
      name: 'joon',
      image: ''
    }
  },
  {
    id: 2,
    content: 'asdlkje lkcjv',
    user: {
      id: 1,
      name: 'dong',
      email: 'lizill@naver.com',
      image: '',
      created_at: 'asd',
      updated_at: 'asd'
    }
  },
  {
    id: 3,
    content: 'dlkje',
    user: {
      id: 5,
      name: 'joon',
      email: 'lizill@naver.com',
      image: '',
      created_at: 'asd',
      updated_at: 'asd'
    }
  },
  {
    id: 4,
    content: 'asdlkjacvoijasdf lkasjdfiejfl sdflijawe asldife sdlid asdf lijasdf laijwefasvlkjh sdfaab',
    user: {
      id: 3,
      name: 'ppang',
      email: 'lizill@naver.com',
      image: '',
      created_at: 'asd',
      updated_at: 'asd'
    }
  },
  {
    id: 5,
    content: 'hi lkasdjfiekf liasdfj elijsdlkf jlijasdf d',
    user: {
      id: 1,
      name: 'dong',
      email: 'lizill@naver.com',
      image: '',
      created_at: 'asd',
      updated_at: 'asd'
    }
  },
  {
    id: 6,
    content: 'sdlfkj laiejkv asdlfiwjelkajcv li;asdvjeojd asdf',
    user: {
      id: 5,
      name: 'joon',
      email: 'lizill@naver.com',
      image: '',
      created_at: 'asd',
      updated_at: 'asd'
    }
  },
  {
    id: 7,
    content: 'asdlkje liajsdf',
    user: {
      id: 1,
      name: 'dong',
      email: 'lizill@naver.com',
      image: '',
      created_at: 'asd',
      updated_at: 'asd'
    }
  },
] as IChatItem[]