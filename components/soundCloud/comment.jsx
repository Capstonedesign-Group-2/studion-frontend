const Comment = () => {
    return (
        <div>
            <div className="border-2 border-black mt-2 font-semibolds">
                {/* 사진 / 아이디*/}
                <div className="flex items-center">
                    <div className="rounded-full mr-2 w-10 h-10 bg-black"></div>
                    <div className="text-lg font-semibold">user_id_2</div>
                </div>
                {/* 코맨트 */}
                <div className="ml-12 mt-1 text-lg">
                    hello
                </div>
            </div>
        </div>
    )
}

export default Comment;