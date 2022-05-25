import Image from "next/image";
import Router from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnotherUserInfo } from "../../redux/actions/another";
import Socket from "../../socket/index";

const ChatListItem = ({ chatRoom }) => {
    const dispatch = useDispatch()
    
    const onClick = () => {
        console.log('chat', chatRoom)
        Router.push(`/chat/${chatRoom.id}`)
        dispatch(getAnotherUserInfo({ id: chatRoom.to.user_id }))
        Socket.socket.emit("get_messages", {
            room_id: chatRoom.id,
            user_id: chatRoom.to.user_id
        })
    }
    useEffect(() => {

    }, [])
    return (
        <div className="flex px-2 py-1 hover:bg-gray-100 cursor-pointer" onClick={() => onClick()}>
            {/* 프사 */}
            <div className="w-12 h-12 bg-studion-400 rounded-full text-white flex justify-center items-center text-xl uppercase">
                {console.log(chatRoom)}
                {
                    chatRoom?.to.image
                    ? <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image src={chatRoom.to.image} alt='user profile' layout="fill"/>
                    </div>
                    : <p>{chatRoom?.to.name.slice(0, 2).toUpperCase()}</p>
                }
                
            </div>
            <div className="flex flex-col ml-3">
                {/* 이름 */}
                <div className="text-lg h-6">
                    {chatRoom?.to.name}
                </div>
                {/* 최근 보낸 메시지 */}
                <div className="text-gray-400">
                    {chatRoom?.lastMsg}
                </div>
            </div>

        </div>
    )
}

export default ChatListItem