import { useEffect } from "react"
import styles from "../../../styles/soundCloud/soundCloud.module.scss"

const ChatList = ({socket, userData, userList, setSelectUser, onClickUserList}) => {

    return (
        <div className="flex flex-col h-full absolute right-0 max-w-xs w-full border-2 bg-white">
            {/* <div className="h-full relative"> */}
            {/* 아이디 */}
                <div className="absolute relative h-14 border-b-2 flex text-xl font-semibold justify-center items-center">
                    {userData.name}
                </div>
                {/* 닉네임 / 채팅내용 */}
                <div className={styles.chatListMenu}>
                    {/* {/* {console.log('userList : ')} */}
                    {
                        userList.length !== 0 && 
                        userList.map((listInfo, index) => <User socket={socket} listInfo={listInfo} key={index} setSelectUser={setSelectUser} onClickUserList={onClickUserList} />)
                    }
                    {/* <User />
                    <User />
                    <User />
                    <User />
                    <User /> */}
                </div>
            {/* </div> */}
        </div>
    )
}
const User = ({listInfo, setSelectUser, onClickUserList}) => {
    const onClick = () => {
        setSelectUser(listInfo)  
    }
    return (
        <div onClick={() => onClick()} className="flex p-2 items-center hover:bg-gray-200 cursor-pointer">
            {/* 사진 */}
            <div className="w-14 h-14 rounded-full bg-studion-300 flex justify-center items-center text-2xl text-white font-normal">
                {listInfo.to.image 
                    ? <img src={listInfo.to.image} />
                    : listInfo.to.name.slice(0, 2).toUpperCase()
                }
            </div>
            {/* 아이디 / 내용*/}
            <div className="ml-3 font-lite text-lg leading-5">
                <div>
                    {listInfo.to.name}
                </div>
                <div className="flex-1 text-gray-400 truncate w-52">
                    {listInfo.lastMsg}
                </div>
            </div>
        </div>
    )
}

export default ChatList