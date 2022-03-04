// import 
const ChatList = ({userData}) => {
    return (
        <div className="flex flex-col h-full absolute right-0 max-w-xs w-full border-2 bg-white">
            {/* <div className="h-full relative"> */}
            {/* 아이디 */}
                <div className="absolute relative h-14 border-2 flex text-xl font-semibold justify-center items-center">
                    {userData.name}
                </div>
                {/* 닉네임 / 채팅내용 */}
                <div className="overflow-y-scroll flex-1 max-h-fit">
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                </div>
            {/* </div> */}
        </div>
    )
}
const User = () => {
    return (
        <div className="flex p-2 items-center">
            {/* 사진 */}
            <div className="w-14 h-14 rounded-full bg-studion-300"></div>
            {/* 아이디 / 내용*/}
            <div className="ml-3 font-lite text-lg leading-5">
                <div>
                    user_id
                </div>
                <div className="text-gray-400">
                    message
                </div>
            </div>
        </div>
    )
}

export default ChatList