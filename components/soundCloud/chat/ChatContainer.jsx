import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import styles from "../../../styles/soundCloud/soundCloud.module.scss"

const ChatContainer = ({ setMessage, message, selectUser, messages, chatRef, onClickSend, onKeyPress}) => {
    const userData = useSelector(state => state.user.data);
    // const onClickSend = () => {
        // socket.current.emit('send_msg', {
        //     id: // 상대 user_id
        //     room_id: // 방 고유번호
        //     msg: { // 나의 정보
        //         user_id: 1,
        //         name: '',
        //         image: '',
        //         content: '',
        //     }
        // })
    // }
    const onChangeMessage = (e) => {
        const {value} = e.target;
        setMessage(value);
    }
    return (
        <div className="max-w-2xl md:maw-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl max-h-screen h-full w-full">
            <div className="h-full w-full flex flex-col">
                {/* 채팅방 */}
                <div className="mt-2 flex items-center w-full h-16 pb-2">
                    {/* 사진 */}
                    <div className="flex cursor-pointer">
                    {
                        selectUser && 
                        (<div className="bg-studion-400 w-14 h-14 rounded-full mr-2 flex justify-center items-center text-white text-2xl font-normal">
                            {selectUser.to.image
                            ? <img src={ selectUser.to.image }/>
                            : selectUser.to.name.slice(0, 2).toUpperCase()}
                        </div>)
                    }
                    {/* 상대방 아이디 */}
                        <div className="text-2xl font-semibold">
                            { 
                                selectUser && 
                                selectUser.to.name 
                            }
                        </div>
                    </div>
                </div>
                <div ref={chatRef} className={styles.chatSection}>
                    { messages &&
                        messages.map((messageInfo, index) => ( messageInfo.user_id !== userData.id ? <ReceivedMessage messageInfo={messageInfo} key={index} />: <SendMessage messageInfo={messageInfo} key={index} />))
                        }
                </div>
                <div className="flex w-full mt-2 pb-4">
                    <input type="text" onKeyPress={onKeyPress} onChange={onChangeMessage} className="flex-1 text-sm bg-gray-100 outline-none px-4 shadow rounded-md" value={message} placeholder="메세지 작성.."/>
                    {/* 보내기 버튼 */}
                    <div onClick={onClickSend} className="w-20 h-10 ml-2 flex items-center justify-center bg-studion-300 rounded-xl hover:bg-studion-400 shadow-xl ">전송</div>
                </div>
            </div>
        </div>
    )
}
const ReceivedMessage = ({messageInfo}) => {
    // const userData = useSelector(state => state.user.data);
    return (
        <div className="flex mt-2 ml-4 items-start">
            {/* {console.log('message', messageInfo)} */}
            <div className="w-fit h-full">
                <div className="w-10 flex items-center justify-center text-white text-sm h-10 mr-2 rounded-full bg-studion-400 self-end flex justify-center cursor-pointer">
                    {
                        messageInfo.image 
                        ? <img src={`${messageInfo.image}`} />
                        : messageInfo.name.slice(0, 2).toUpperCase()
                    }
                    
                </div>
            </div>
            <div className="flex flex-col text-lg">
                { messageInfo.name }
                <div className="w-fit px-4 py-2 max-w-xs lg:max-w-xl text-base break-all rounded-md rounded-tl-none shadow bg-white">
                    {/* {text} */}
                    
                    { messageInfo.content }
                </div>
            </div>
        </div>
    )
}
const SendMessage = ({ messageInfo }) => {
    return (
        <div className="flex justify-end mt-2 mr-4">
            <div className="w-fit text-white text-base px-4 py-2 rounded-md rounded-br-none max-w-xs md:max-w-sm lg:max-w-xl break-all bg-studion-500">
                {/* {text} */}
                { messageInfo.content }
            </div>
        </div>
    )
}
export default ChatContainer;