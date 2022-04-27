const ChatListItem = () => {
    return(
        <div className="flex px-2 py-1 hover:bg-gray-100">
            {/* 프사 */}
            <div className="w-12 h-12 bg-studion-400 rounded-full text-white flex justify-center items-center text-xls">
                PP
            </div>
            <div className="flex flex-col ml-3">
                {/* 이름 */}
                <div className="text-lg h-6">
                    ppang
                </div>
                {/* 최근 보낸 메시지 */}
                <div className="text-gray-400">
                    hello
                </div>
            </div>

        </div>
    )
}

export default ChatListItem