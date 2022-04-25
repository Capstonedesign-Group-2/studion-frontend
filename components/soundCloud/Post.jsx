import { useRef, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Dropdown from "./DropDown"
import styles from '../../styles/soundCloud/soundCloud.module.scss'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import http from "../../http"


const Post = ({ post }) => {
    const userData = useSelector(state => state.user.data)
    const [dropDown, setDropDown] = useState(false)
    const ref = useRef()
    const [isLike, setLike] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState()
    const onCommentChange = (e) => {
        setComment(e.target.value)
    }
    const onClickSubmit = () => {
        let commentData = {
            user_id: userData.id,
            post_id: post.id,
            content: comment
        }
        http.post('/comments', commentData)
            .then(res => {
                setComment('')
                callComments();
            }).catch(err => {
                console.log(err);
            })
    }
    const onKeyPress = (e) => {
        if (e.key == 'Enter') {
            onClickSubmit()
        }
    }
    const onClickLikeButton = () => {
        // 좋아요 하는 것
        if(isLike !== true) {
            post.likes = post.likes + 1
            http.post(`/likes/${post.id}`, { user_id : userData.id })
            .then(res => {
                setLike(true)
            })
            .catch(err => {
                console.error(err)
            })
        }
        // 좋아요 취소
        else {
            post.likes = post.likes - 1
            http.delete(`/likes/${post.id}`, { data: {user_id : userData.id} })
            .then(res => {
                setLike(false)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
    useEffect(() => {
        http.post(`likes/exist/${post.id}`, {user_id: userData.id})
        .then(res => {
            setLike(res.data.status)
        })
        .catch(err => {
            console.error(err)
        })
    },[])
    useEffect(() => {
        window.addEventListener("click", checkIfClickedOutside)
        return () => {
            window.removeEventListener("click", checkIfClickedOutside)
        }
    }, [dropDown])
    const checkIfClickedOutside = ({ target }) => {
        if (dropDown && ref.current && !ref.current.contains(target)) {
            setDropDown(false);
        }
    }
    return (
        <div className="mx-auto border bg-white shadow-md rounded-md h-full w-full max-w-3xl mt-4">
            {/* 프로필 */}
            <div className="w-full w-full border-b flex items-center font-semibold text-lg p-4 relative">
                {/* 프로필 이미지 */}
                {
                    post.user.image
                    ?
                    <div className="w-10 h-10 rounded-full">
                        <img src={post.user.image} alt="" />
                    </div>
                    :
                    <div className="w-10 h-10 bg-studion-400 rounded-full flex text-white justify-center items-center">
                        { post.user.name.slice(0, 2).toUpperCase()}
                    </div>
                }   
                {/* 아이디 */}
                <div className="pl-2">
                    {post.user.name}
                </div>
                {
                    (userData.id === post.user.id) &&
                    (
                        <div onClick={() => setDropDown(!dropDown)} className='absolute right-3 hover:scale-125 transition-all cursor-pointer'>
                            <svg aria-label="옵션 더 보기" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <circle cx="12" cy="12" r="1.5"></circle>
                                <circle cx="6" cy="12" r="1.5"></circle>
                                <circle cx="18" cy="12" r="1.5"></circle>
                            </svg>
                        </div>
                    )
                }
                {
                    dropDown &&
                    (
                        <div ref={ref} className={styles.dropDown}>
                            <Dropdown userId={undefined} post={post} />
                        </div>
                    )
                }
            </div>
            {/* 이미지 */}
            {   post?.images[0] &&
                <div className="w-full flex justify-center items-center" style={{ height: '700px' }}>
                    
                    <img src={post.images[0].link} alt="" className="h-full"/>
                </div>
            }
            <div onClick={onClickLikeButton} className="py-2 px-3 inline-block">
                {
                    isLike ?
                    <AiFillHeart className='text-red-500 text-2xl'/> :
                    <AiOutlineHeart className='text-2xl'/> 
                }
            </div>
            <div className="px-3 text-sm">
                {/* 좋아요 수 */}
                <div>
                    {`LIKE ${post.likes}`}
                </div>
                {/* 글 */}
                <div className="mt-2">
                    {post.content}
                </div>
            </div>
            {/* 댓글작성 */}
            <div className="px-3 py-2 flex">
                <input onKeyPress={onKeyPress} onChange={onCommentChange} type="text" className="flex-1 pl-1 outline-studion-400 caret-studion-400" placeholder="コメント..."/>
                <button onClick={onClickSubmit} className="bg-studion-400 hover:bg-studion-500 rounded-lg ml-2 py-1 px-2 text-white">보내기</button>
            </div>
        </div>
    )
}

export default Post