import { stayLoggedIn } from '../http/stay'
import ChatContainer from "../components/soundCloud/chat/ChatContainer"
import Header from "../components/soundCloud/chat/Header"
import wrapper from '../redux/store'
import { useState, useEffect, useRef } from "react"
import ChatList from "../components/soundCloud/chat/ChatList"
import { useSelector } from 'react-redux'
import styles from "../styles/soundCloud/soundCloud.module.scss"
import io from "socket.io-client"

const Chat = () => {
  const [list, setList] = useState(false);
  const [userList, setUserList] = useState([]);
  const [selectUser, setSelectUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = useRef();
  const chatRef = useRef();
  const userData = useSelector(state => state.user.data);
  const socket_url = "http://localhost:5000/chat";
  const register = () => {
    socket.current.emit('user_register', {
      id: userData.id
    })
    socket.current.emit("get_chats", userData.id)
  }
  // 클릭 이벤트
  const onClickSend = () => {
    if(message.trim() === '') return;
    
    socket.current.emit('send_msg', {
        id: selectUser.to.user_id, // 상대 user_id
        room_id: selectUser.id, // 내 방 고유번호
        msg: {  // 나의 정보
          user_id: userData.id,
          content: message,
          image: userData.image,
          name: userData.name
        }
    })
    setMessages([
        ...messages,
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
  const onClickUserList = () => {
    socket.current.emit('enter_room', {
      data: [
        {
          user_id: userData.id,
          name: userData.name,
          image: userData.image
        },
        {
          user_id: selectUser.to.user_id,
          name: selectUser.to.name,
          image: selectUser.to.image
        }
      ]
    })
    socket.current.emit('get_messages', {
      room_id: selectUser.id,
      user_id: selectUser.to.user_id
    })
  }
  const onKeyPress = (e) => {
    if(e.key == 'Enter') {
        onClickSend()
        console.log(messages)
      }
  }
  const handleOnMessage = (res) => {
    console.log('res', res)
    console.log('messages : ', messages);
    let newMessage = {
        flag: res.flag,
        image: res.image,
        name: res.name,
        timestamp: res.timestamp,
        user_id: res.user_id,
        content: res.content
    }
    setMessages((prev) => [...prev, newMessage])
    // console.log('messages : ' , messages)
  }
  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages])
  useEffect(() => {
    console.log('main : ', messages)
    socket.current = io(socket_url);
    register()
    console.log(socket.current)
    socket.current.on('user_register_on', res => {
      console.log(res)
    })
    // socket.current.on('send_msg_on', res => {
    //   console.log('send_msg_on', res)
    //   console.log('user_id : ' ,selectUser)
    //   setMessages([
    //       ...messages,
    //       {
    //           user_id: selectUser.to.user_id,
    //           content: res.msg
    //       }
    //   ])
    //   console.log(messages)
    // })
    socket.current.on("get_chats_on", res => {
      console.log('get_chats_on', typeof res.data)
      setUserList(res.data)
    })
    socket.current.on("get_messages_on", res => {
      setMessages(res);
    })
    socket.current.on('send_msg_on', res => handleOnMessage(res))
  }, [])
  useEffect(() => {
    console.log('selectUser', selectUser)
    if(selectUser) {
      onClickUserList()
    }
  }, [selectUser])

  return (
    <div>
      <Header setList={setList} list={list}/>
      <div className='pt-14 h-screen max-h-screen w-full border-2'>
        <div className='flex h-full w-full relative'>
          <div className="w-full flex justify-center">
            <ChatContainer socket={socket} message={message} selectUser={selectUser} messages={messages} setMessage={setMessage} chatRef={chatRef} onKeyPress={onKeyPress} onClickSend={onClickSend} />
          </div>
        
          {list &&
              <div className={ styles.listShow }>
                <ChatList socket={socket} userList={userList} userData={userData} setSelectUser={setSelectUser} onClickUserList={onClickUserList}/>
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
  // await store.dispatch(getPostList())
  return { props: {} }
})

export default Chat;
