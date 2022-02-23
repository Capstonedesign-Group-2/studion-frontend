const Comment = ({comment}) => {
    return (
        <div>
            <div className="mt-2 font-semibolds">
                {/* 사진 / 아이디*/}
                <div className="flex items-center">
                    {
                        !comment.user.image
                        ? 
                            <div className='border-2 border-black rounded-full flex items-center justify-center text-sm w-10 h-10 mr-2'>
                                {comment.user.name.slice(0, 2).toUpperCase()}
                            </div>
                        : 
                            <div className='border-2 border-black rounded-full w-10 h-10 mr-2'>
                                <img src={comment.user.image} alt="" />
                            </div>
                    }
                    <div className="text-lg font-semibold">{comment.user.name}</div>
                </div>
                {/* 코맨트 */}
                <div className="mt-1 text-base flex ml-12">
                    {comment.content}
                </div>
            </div>
        </div>
    )
}

export default Comment;