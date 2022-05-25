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
        console.log('chat_exit')
        Router.push(`/soundcloud`)
    }
    return(
        <div className="">
            <p className="cursor-pointer font-semibold  text-red-700 hover:text-red-500 text-center" onClick={onClickExit}>
                出る
            </p>
        </div>
    )
}

export default ChatDropdown;