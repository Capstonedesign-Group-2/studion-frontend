import { stayLoggedIn } from '../../http/stay'
import ChatContainer from "../../components/soundCloud/chat/ChatContainer"
import Header from "../../components/soundCloud/chat/Header"
import wrapper from '../../redux/store'
import { useState, useEffect, useRef } from "react"
import ChatList from "../../components/soundCloud/chat/ChatList"
import { useDispatch, useSelector } from 'react-redux'
import styles from "../../styles/soundCloud/soundCloud.module.scss"
import Router from 'next/router'
import Socket from '../../socket'
import { getAnotherUserInfo } from '../../redux/actions/another'

const Chat = () => {
  const [list, setList] = useState(false);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const chatRef = useRef(null);
  const userData = useSelector(state => state.user.data);
  const otherUser = useSelector(state => state.another.userInfo)
  const dispatch = useDispatch()
  // 클릭 이벤트
  const onClickSend = () => {
    if (message.trim() === '') return;
    Socket.emitSendNewMessage({
      id: otherUser.id, // 상대 user_id
      room_id: Router.query.id, // 내 방 고유번호
      msg: {  // 나의 정보
        user_id: userData.id,
        content: message,
        image: userData.image,
        name: userData.name
      }
    })
    setMessages((prev) => [
      ...prev,
      {
        user_id: userData.id,
        content: message,
        image: userData.image,
        name: userData.name
      }
    ])
    console.log('click')
    setMessage('')
  }
  const onKeyPress = (e) => {
    if (e.key == 'Enter') {
      onClickSend()
    }
  }
  // 하단 고정
  useEffect(() => {
    if (!chatRef.current) return
    chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages])

  // 소켓
  // useEffect(() => {
  //   if (cookie.load('accessToken') && userData) {
  //     Socket.socket.on('user_register_on', (data:any) => {})
  //     Socket.socket.emit('user_register', { id: userData.id })
  //   }
  //   else {
  //     Socket.removeAllListeners();
  //   }
  // }, [cookie.load('accessToken')])
  useEffect(() => {
    // Socket.socket.on('exit_on', res => {
    //   console.log(res)
    //   Router.push(`/chat`)
    // })
    Socket.socket.on('send_chat_msg_on', res => {
      console.log('send_chat_msg_on', res)
      setMessages((prev) => [
        ...prev,
        res
      ])
    })
    Socket.socket.on("get_chat_data_on", async (res) => {
      await dispatch(getAnotherUserInfo({ id: res }))
      Socket.socket.emit("get_messages", {
        room_id: Router.query.id,
        user_id: res
      })
    })
    Socket.socket.on("get_messages_on", (messages) => {
      setMessages(messages)
    })
    Socket.socket.on('user_register_on', (data) => {
      console.log(data)
    })

    Socket.socket.emit("get_chat_data", {
      room_id: Router.query.id,
      user_id: userData.id
    })
    Socket.socket.emit('user_register', { id: userData.id })

    return () => {
      Socket.removeAllListeners()
    }
  }, [])

  return (
    <div>
      <Header setList={setList} list={list} />
      <div className='pt-14 h-screen max-h-screen w-full border-2'>
        <div className='flex h-full w-full relative'>
          <div className="w-full flex justify-center">
            <ChatContainer message={message} messages={messages} setMessage={setMessage} chatRef={chatRef} onKeyPress={onKeyPress} onClickSend={onClickSend} />
          </div>

          {list &&
            <div className={styles.listShow}>
              <ChatList />
            </div>
          }
        </div>
      </div>
    </div>
  )
}


export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await stayLoggedIn(context, store);
  if (!store.getState().user.data) { // 유저 데이터가 없으면 '/login'로 리다이렉트
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return { props: {} }
})

export default Chat;
