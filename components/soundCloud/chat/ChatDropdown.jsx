import Router from "next/router"
import Socket from "../../../socket/index"
const ChatDropdown = ({userData, otherUser}) => {    
    
    const onClickExit = () => {
        Socket.socket.emit('chat_exit', {
            room_id: Router.query.id,
            user_id: userData.id,
            name: userData.name,
            to: otherUser.id
        })
        Router.push(`/soundcloud`)
    }
    return(
        <div>
            <div className="cursor-pointer" onClick={onClickExit}>
                나가기
            </div>

        </div>
    )
}

export default ChatDropdown;