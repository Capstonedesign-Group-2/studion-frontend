import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "../../../styles/soundCloud/soundCloud.module.scss"
import Socket from "../../../socket/index"
import Loader from "../../common/Loader"
import Router from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { getAnotherUserInfo } from "../../../redux/actions/another"
import Image from "next/image"

const ChatList = () => {
    const userData = useSelector(state => state.user.data)
    const [userList, setUserList] = useState([])
    const [isLoading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true)
        Socket.socket.on("get_chats_on", res => {
            console.log('res', res)
            setUserList(res.data)
            setLoading(false)
        })
        Socket.socket.emit("get_chats", userData.id)
    }, [])
    return (
        <div className="relative flex flex-col h-full right-0 max-w-xs w-full border-l-2 bg-white">
            {/* <div className="h-full relative"> */}
            {/* 아이디 */}
                <div className="relative h-14 border-b-2 flex text-xl font-semibold justify-center items-center">
                    {userData.name}
                </div>
                {/* 닉네임 / 채팅내용 */}
                {
                    isLoading && 
                    <div className="flex h-full justify-center items-center">
                        <Loader />
                    </div>
                }
                <div className={styles.chatListMenu}>
                    {/* {/* {console.log('userList : ')} */}
                    {
                        userList.length !== 0 && 
                        userList.map((listInfo, index) => <User listInfo={listInfo} key={index} />)
                    }

                </div>
            {/* </div> */}
        </div>
    )
}
const User = ({listInfo}) => {
    const dispatch = useDispatch();
    const onClick = () => {
        if(Router.query.id === listInfo.id) return
        dispatch(getAnotherUserInfo({id: listInfo.to.user_id}))
        Router.push(`/chat/${listInfo.id}`)
        // console.log(listInfo)
        Socket.socket.emit("get_messages", {
            room_id: listInfo.id,
            user_id: listInfo.to.user_id
          })
    }
    return (
        <div onClick={onClick} className="flex p-2 items-center hover:bg-gray-200 cursor-pointer">
            {/* 사진 */}
            <div className="w-14 h-14 rounded-full bg-studion-300 flex justify-center items-center text-2xl text-white font-normal">
                {listInfo.to.image 
                    ? <div className="w-full h-full relative overflow-hidden rounded-full">
                        <Image src={listInfo.to.image} layout='fill' alt="user profile"/>
                    </div>
                    : listInfo.to.name.slice(0, 2).toUpperCase()
                }
            </div>
            {/* 아이디 / 내용*/}
            <div className="ml-3 font-lite text-lg leading-5">
                <div>
                    {listInfo.to.name}
                </div>
                <div className="flex-1 text-gray-400 truncate w-50">
                    {listInfo.lastMsg}
                </div>
            </div>
        </div>
    )
}

export default ChatList