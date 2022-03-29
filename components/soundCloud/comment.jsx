const Comment = ({comment}) => {
    return (
        <div>
            <div className="mt-2 font-semibolds">
                {/* 사진 / 아이디*/}
                <div className="flex ">
                    <div className='bg-studion-400 text-white text-lg rounded-full flex items-center justify-center text-sm w-10 h-10 mr-2 cursor-pointer'>
                        {
                            !comment.user.image
                            ? 
                                // <div className='bg-studion-400 text-white text-lg rounded-full flex items-center justify-center text-sm w-10 h-10 mr-2'>
                                    comment.user.name.slice(0, 2).toUpperCase()
                                // </div>
                            : 
                                // <div className=''>
                                    <img src={comment.user.image} alt="" />
                                // </div>
                        }
                    </div>
                    <div className="flex flex-col">
                        <div className="text-lg font-semibold text-left">
                            {comment.user.name}
                        </div>
                        <div className="text-base text-left w-full max-w-md">
                            {comment.content}
                        </div>
                    </div>
                </div>
                {/* 코맨트 */}
                {/* <div className="mt-1 text-base flex ml-12">
                    {comment.content}
                </div> */}
            </div>
        </div>
    )
}

export default Comment;