const ChatContainer = () => {
    return (
        <div className="max-w-2xl lg:max-w-screen-lg xl:max-w-screen-2xl max-h-screen h-full w-full">
            <div className="h-full w-full flex flex-col">
                {/* 채팅방 */}
                <div className="flex items-center w-full h-16 border-b-2">
                    {/* 사진 */}
                    <div className="bg-studion-300 w-8 h-8 rounded-full mx-4"></div>
                    {/* 아이디 */}
                    <div className="text-base font-semibold">user_id</div>
                </div>
                <div className="bg-gray-300 w-full h-full">
                    <ReceivedMessage />
                    <SendMessage />
                </div>
            </div>
        </div>
    )
}
const ReceivedMessage = () => {
    return (
        <div className="w-fit px-4 max-w-xs break-all rounded-2xl bg-studion-100">
            {/* {text} */}
            hellosadasdsadsaasdasdasdasdsadsdasdsaasdsadasdasdasdsasdasdasdasdsadsasdsda
            asdfasdfasdfadsfa <br/>
            asdasdasdasdasdasdsad
        </div>
    )
}
const SendMessage = () => {
    return (
        <div className="w-fit px-4 max-w-xs break-all rounded-2xl bg-studion-300 flex justify-right">
            {/* {text} */}
            hellosadasdsadsaasdasdasdasdsadsdasdsaasdsadasdasdasdsasdasdasdasdsadsasdsda
            asdfasdfasdfadsfa <br/>
            asdasdasdasdasdasdsad
        </div>
    )
}
export default ChatContainer;