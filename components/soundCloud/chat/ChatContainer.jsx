import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import styles from "../../../styles/soundCloud/soundCloud.module.scss"
const ChatContainer = () => {
    const userData = useSelector(state => state.user.data);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            user_id : 2,
            text : 'hello'
        },
        {
            user_id : 1,
            text : 'hi'
        },
        {
            user_id : 2,
            text : 'yes'
        },
    ]);
    const ref = useRef();
    const onChangeMessage = (e) => {
        const {value} = e.target;
        setMessage(value);
    }
    const onClickSend = () => {
        setMessages({
            ...messages,
            text: message,
            user_id : userData.id
        })
        setMessage('')
    }
    const onKeyPress = (e) => {
        if(e.key == 'Enter') {
            onClickSend()
        }
    }
    useEffect(() => {
        
    },[messages])
    return (
        <div className="max-w-2xl md:maw-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl max-h-screen h-full w-full">
            <div className="h-full w-full flex flex-col">
                {/* 채팅방 */}
                <div className="mt-2 flex items-center w-full h-16 pb-2">
                    {/* 사진 */}
                    <div className="bg-studion-300 w-14 h-14 rounded-full mr-2"></div>
                    {/* 아이디 */}
                    <div className="text-2xl font-semibold">user_id</div>
                </div>
                <div className={styles.chatSection}>
                    { messages &&
                        messages.map((messageInfo, index) => ( messageInfo.user_id !== userData.id ? <ReceivedMessage message={messageInfo.text} key={index} />: <SendMessage message={messageInfo.text} key={index} />))
                        }
                </div>
                <div className="flex w-full mt-2 pb-4">
                    <input type="text" onKeyPress={onKeyPress} onChange={onChangeMessage} className="flex-1 text-sm bg-gray-100 outline-none px-2" value={message} placeholder="메세지 작성.."/>
                    {/* 보내기 버튼 */}
                    <div onClick={onClickSend} className="w-20 h-10 ml-2 flex items-center justify-center bg-studion-300 rounded-xl hover:bg-studion-400">전송</div>
                </div>
            </div>
        </div>
    )
}
const ReceivedMessage = ({message}) => {
    
    return (
        <div className="flex mt-2 ml-1">
            <div className="w-10 h-10 mr-2 rounded-full bg-studion-400 self-end flex justify-center">
                
            </div>
            <div className="w-fit px-4 py-1 max-w-xs lg:max-w-xl break-all rounded-2xl bg-studion-100">
                {/* {text} */}
                {message}
            </div>
        </div>
    )
}
const SendMessage = ({message}) => {
    const userData = useSelector(state => state.user.data)
    return (
        <div className="flex justify-end mt-2 mr-1">
            <div className="w-fit px-4 py-1 max-w-xs md:max-w-sm lg:max-w-xl break-all rounded-2xl bg-studion-300">
                {/* {text} */}
                {message}
            </div>
            <div className="flex justify-center items-center w-10 h-10 text-white text-base rounded-full ml-2 bg-studion-400 self-end">
                {userData.name.slice(0, 2).toUpperCase()}    
            </div>
        </div>
    )
}
export default ChatContainer;