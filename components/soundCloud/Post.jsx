import { useRef, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { BiCommentDetail } from "react-icons/bi"
import { Modal } from "../common/modals"
import http from "../../http"
import styles from '../../styles/soundCloud/soundCloud.module.scss'
import Link from "next/link"
import PostContainer from "./PostContainer"
import Dropdown from "./DropDown"
import LikeModal from "./LikeModal"
import Router from "next/router"
import RecodePlayer from "./RecodePlayer"
import { GrPrevious, GrNext } from "react-icons/gr"

const Post = ({ post }) => {
    const userData = useSelector(state => state.user.data)
    const [dropDown, setDropDown] = useState(false)
    const ref = useRef()
    const [isLike, setLike] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([])
    const [toggle, setToggle] = useState(false)
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
                setComments((prev) => [
                    ...prev,
                    {
                        ...commentData,
                        name: userData.name
                    }
                    
                ])
            }).catch(err => {
                console.log(err);
            })
    }
    const onKeyPress = (e) => {
        if (e.key == 'Enter') {
            if(comment !== '') onClickSubmit()
            else return;
        }
    }
    const onClickLikeButton = () => {
        // 좋아요 하는 것
        if(isLoading) return;
        setLoading(true);
        if(!isLike) {
            http.post(`/likes/${post.id}`, { user_id : userData.id })
            .then(res => {
                setLikes((prev) => prev + 1)
                setLike(true)
                setLoading(false)   
            })
            .catch(err => {
                console.error(err)
            })
        }
        // 좋아요 취소
        else {
            http.delete(`/likes/${post.id}`, { data: {user_id : userData.id} })
            .then(res => {
                setLikes((prev) => prev - 1)
                setLike(false)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
    const pushRecording = (post) => {
        Modal.close()
        
        Router.push({
            pathname: `/recording`,
            query: { post_id: post.post_id}
        })
    }
    const onClickUser = (id) => {
        Modal.close()
        Router.push(`/soundcloud/${id}`)
    }   
    const openModal = () => {
        // dispatch(postSlice.actions.deleteNextUrl())
        Modal.fire({
            html: <PostContainer setLikes={setLikes} onClickLikeButton={onClickLikeButton} likes={likes} setLike={setLike} isLike={isLike} pushRecording={pushRecording} onClickUser={onClickUser} post={post} userId={post.user.id} />,
            showConfirmButton: false,
            scrollbarPadding: false,
            customClass: styles.post,
        })
    }
    const likeModal = () => {
        Modal.fire({
            html: <LikeModal postId={post.id} />,
            showConfirmButton: false,
            scrollbarPadding: false,
            customClass: styles.followList,
        })
    }
    useEffect(() => {
        http.post(`likes/exist/${post.id}`, {user_id: userData.id})
        .then(res => {
            setLike(res.data.status)
        })
        .catch(err => {
            console.error(err)
        })
    }, [isLike])
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
        <div className="mx-auto border bg-white shadow-md rounded-md w-full max-w-3xl mb-4">
            {/* 프로필 */}
            <div className="w-full flex w-full border-b items-center font-semibold text-lg p-4 relative inline-block">
                {/* 프로필 이미지 */}
                <Link href={`/soundcloud/${post.user.id}`}>
                    {
                        post.user.image
                        ?
                        <a className="w-10 h-10 rounded-full inline-block">
                            <img src={post.user.image} alt="" />
                        </a>
                        :
                        <a className="w-10 h-10 bg-studion-400 flex items-center justify-center rounded-full text-white text-center">
                            { post.user.name.slice(0, 2).toUpperCase()}
                        </a>
                    }
                </Link>
                    
                {/* 아이디 */}
                <Link href={`/soundcloud/${post.user.id}`}>
                    <a className="flex items-center pl-2">
                        {post.user.name}
                    </a>
                </Link>
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
            {
                (post?.images[0] || post?.audios[0]) &&
                <div className="w-full flex justify-center items-center p-4 relative" style={{ height: '700px' }}>
                {/* 이미지 */}
                {   post?.images[0] && !toggle &&
                    <>
                        <img src={post.images[0].link} alt="" className="h-full"/>
                        {
                            (post.images[0] && post.audios[0]) &&
                            <div className="absolute top-50% right-0 cursor-pointer" onClick={() => setToggle((prev) => !prev)}>
                                <GrNext className="w-7 h-7"/>
                            </div>
                        }
                    </>
                }
                {/* 음악 */}
                {
                    ((post?.audios[0] && toggle) || (!post?.images[0] && post?.audios[0])) &&
                    <>
                        <RecodePlayer audio={post.audios[0]} />
                        {
                            (post.images[0] && post.audios[0]) &&
                            <div className="absolute top-50% left-0 cursor-pointer" onClick={() => setToggle((prev) => !prev)}>
                                <GrPrevious className="w-7 h-7"/>
                            </div>
                        }
                    </>
                }
                </div>
            }
            
            {/* 아이콘 */}
            <div className="py-2 px-1">
                <div onClick={() => onClickLikeButton()} className="mx-2 inline-block cursor-pointer">
                    {
                        isLike ?
                        <AiFillHeart className='text-red-500 text-2xl'/> :
                        <AiOutlineHeart className='text-2xl'/> 
                    }
                </div>
                <div onClick={openModal} className="inline-block cursor-pointer">
                    <BiCommentDetail className="text-2xl" />
                </div>
            </div>
            <div className="px-3 text-sm">
                {/* 좋아요 수 */}
                <div onClick={likeModal} className="font-semibold inline-block cursor-pointer">
                    {`LIKE ${likes}`}
                </div>
                {/* 글 */}
                <div className="mt-2 flex">
                    <div className="font-semibold mr-1">{`${post.user.name}`}</div>
                    <div className="font-base w-20 truncate">{`${post.content}`}</div>
                    <div className="text-gray-400 cursor-pointer" onClick={openModal}>더보기</div>
                </div>
            </div>
            {/* 추가된 댓글 */}
            <div className="py-2 px-3 text-sm">
                {
                    comments?.map((data, index) => 
                        <div className="mt-2 flex" key={index + data.post_id}>
                            <div className="font-semibold mr-1">{`${data.name}`}</div>
                            <div className="font-base">{`${data.content}`}</div>
                        </div>
                    )
                }
            </div>
            {/* 댓글작성 */}
            <div className="px-3 py-2 flex">
                <input onKeyPress={onKeyPress} value={comment} onChange={onCommentChange} type="text" className="flex-1 pl-1 outline-studion-400 caret-studion-400" placeholder="コメント..."/>
                <button onClick={onClickSubmit} className="bg-studion-400 hover:bg-studion-500 rounded-lg ml-2 py-1 px-2 text-white">보내기</button>
            </div>
        </div>
    )
}

export default Post