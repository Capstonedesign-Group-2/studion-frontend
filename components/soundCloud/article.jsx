import Comment from './comment'
const Article = () => {
    return (
        <div>
            <div className="h-auto mt-4 w-full">
                <div className=''>
                    {/* 글쓴이 정보 */}
                    <div className='flex items-center text-lg font-semibold'>
                        {/* 사진 */}
                        <div className='border-2 border-black rounded-full w-10 h-10 mr-2'>

                        </div>
                        user_id
                    </div>
                    {/* 게시글 내용 */}
                    <div className='mt-2'>
                        <div className='border-2 border-black break-words overflow-auto'>
                            <div>hello</div>
                        </div>
                        {/* 참가한 사람 */}
                        <div className='mt-2'>
                            <div>with</div>
                            <div className='flex'>
                                <BandMember />
                                <BandMember />
                                <BandMember />
                                <BandMember />
                            </div>
                        </div>
                    </div>
                </div>
                {/* 댓글 */}
                <div className='overflow-auto mt-4 max-h-96'>
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    
                </div>
            </div>
        </div>
    )
}
const BandMember = () => {
    return (
        <div>
            <div className='rounded-full w-8 h-8 bg-black relative'>
            </div>
        </div>
    )
}
export default Article