import { useEffect, useState } from "react";

const Comment = ({comment, onClickProfile, userData}) => {
    useEffect(() => {
        console.log(comment)
    }, [])
    const [dropDown, setDropDown] = useState(false)
    return (
        <div className="flex relative">
            <div className="mt-2 font-semibolds">
                {/* 사진 / 아이디*/}
                <div className="flex ">
                    <div onClick={() => onClickProfile(comment.user.id)} className='bg-studion-400 text-white text-lg rounded-full flex items-center justify-center text-sm w-10 h-10 mr-2 cursor-pointer' >                       
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
            </div>
            {   
                userData.id === comment.user.id &&
                <div onClick={() => setDropDown(!dropDown)} className='absolute right-3 top-4 hover:scale-125 transition-all cursor-pointer'>
                    <svg aria-label="옵션 더 보기" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                        <circle cx="12" cy="12" r="1.5"></circle>
                        <circle cx="6" cy="12" r="1.5"></circle>
                        <circle cx="18" cy="12" r="1.5"></circle>
                    </svg>
                </div>
            }
        </div>
    )
}

export default Comment;