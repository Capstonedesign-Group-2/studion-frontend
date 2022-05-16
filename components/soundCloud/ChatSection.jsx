import { useSelector } from "react-redux";
import ChatListItem from "./ChatListItem"
import styles from "../../styles/soundCloud/soundCloud.module.scss"
import { Modal } from "../common/modals";
import Follow from "./Follow";
import Socket from "../../socket";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import Image from "next/image";

const ChatSection = () => {
    const userData = useSelector(state => state.user.data)
    const [userList, setUserList] = useState(null)
    useEffect(() => {
        Socket.socket.on("get_chats_on", res => {
            setUserList(res.data)
        })
        Socket.socket.emit("get_chats", userData.id)
    }, [])
    return (
        <div className="sticky ml-4 top-16 bg-white shadow-md rounded-md flex-1 flex flex-col mb-4" style={{ height:'700px' }}>
            <Profile userData={userData}/>
            <hr />
            <h1 className="text-xl p-2">トーク</h1>
            <div className="px-2 py-1 overflow-y-auto flex-1">
                {
                    userList !== null
                    ? userList.map((user) => <ChatListItem key={user.id} chatRoom={user} />)
                    : 
                    <div className="w-full h-full flex justify-center items-center">
                        <Loader />
                    </div>
                }
            </div>
        </div>        
    )
}

export default ChatSection;

const Profile = ({userData}) => {
    const onClickFollowUser = (kind) => {
        Modal.fire({
            html: <Follow userId={userData.id} kind={kind} />,
            showConfirmButton: false,
            customClass: styles.followList,
        })
    }
    return (
        <div className="p-5 flex flex-col items-center md:items-start md:flex-row relative">
            <div className="w-40 relative">
                {userData?.image
                    ? <Image className="w-full rounded-full" src='/' layout="fill" alt="profile image" />
                    : <div className='flex w-full aspect-square rounded-full bg-studion-400 justify-center items-center text-white text-7xl md:text-4xl xl:text-5xl'>
                        <p>{userData?.name.slice(0, 2).toUpperCase()}</p>
                    </div>
                }
            </div>
            <div className="md:ml-10 w-full">
                <div className="mb-2 md:mb-4">
                    <span className="text-xs text-gray-500 -mb-1 block">
                        Name
                    </span>
                    <h3 className="font-medium text-3xl leading-8">
                        {userData?.name}
                    </h3>
                </div>
                <div className="items-center grid grid-cols-2 mt-1">
                    <div className="hover:cursor-pointer" onClick={() => onClickFollowUser('following')}>
                        <span className="text-xs text-gray-500 block">
                            フォロー
                        </span>
                        <h4>{userData?.followings}</h4>
                    </div>

                    <div className="relative ml-8">
                        <div className="hover:cursor-pointer" onClick={() => onClickFollowUser('follower')}>
                            <span className="text-xs text-gray-500 block ">
                                フォロワー
                            </span>
                            <h4>{userData?.followers}</h4>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
