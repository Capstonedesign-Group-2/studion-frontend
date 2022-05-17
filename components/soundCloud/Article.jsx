import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/soundCloud/soundCloud.module.scss'
import http from '../../http/index';
import { useDispatch, useSelector } from 'react-redux';
import wrapper from '../../redux/store';
import Comment from './Comment';
import Dropdown from './DropDown';
import Loader from '../common/Loader';
import { getCommentList, getNextCommentList } from '../../redux/actions/post';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

const Article = ({ post, userId, onClickProfile, isLike, setLikes, likes, setIsLike }) => {
    const [comment, setComment] = useState('');
    const userData = useSelector(state => state.user.data);
    const comments = useSelector(state => state.post.commentList);
    const nextUrl = useSelector(state => state.post.commentNextUrl);
    
    const [like, setLike] = useState(isLike)
    const [likeCount, setLikeCount] = useState(likes)
    const [likeLoading, setLikeLoading] = useState(false)
    const isLoading = useSelector(state => state.post.getCommentListLoading)
    const getNextCommentListLoading = useSelector(state => state.post.getNextCommentListLoading)
    const dispatch = useDispatch();
    const [dropDown, setDropDown] = useState(false);
    const observerRef = useRef();
    const ref = useRef();

    const onCommentChange = (e) => {
        setComment(e.target.value)
    }
    const onClickLike = () => {
        if(likeLoading) return
        if(!like) {
            http.post(`/likes/${post.id}`, { user_id : userData.id })
            .then(res => {
                setLikes((prev) => prev + 1)
                setLikeCount((prev) => prev + 1)
                setLike(true)
                setIsLike(true)
                setLikeLoading(false)
            })
            .catch(err => {
                console.error(err)
            })
        } else {
            http.delete(`/likes/${post.id}`, { data: {user_id : userData.id} })
            .then(res => {
                setLikes((prev) => prev - 1)
                setLikeCount((prev) => prev - 1)
                setLike(false)
                setIsLike(false)
                setLikeLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
        }
        // onClickLikeButton()
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
    const callComments = () => {
        dispatch(getCommentList({id: post.id}))
    }
    useEffect(() => {
        http.post(`likes/exist/${post.id}`, {user_id: userData.id})
        .then(res => {
            setLike(res.data.status)
        })
        .catch(err => {
            console.error(err)
        })
    }, [like])
    // useEffect(() => {
    //     commentRef.current.scrollTop = commentRef.current.scrollHeight
    // }, [comments])
    const observer = (node) => {
        if (getNextCommentListLoading) return;
        if (observerRef.current) observerRef.current.disconnect();
    
        observerRef.current = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting && nextUrl !== null) {
            dispatch(getNextCommentList({next_page_url : nextUrl}))
          }
        });
    
        node && observerRef.current.observe(node);
      };
    const checkIfClickedOutside = ({ target }) => {
        if (dropDown && ref.current && !ref.current.contains(target)) {
            setDropDown(false);
        }
    }
    // 바깥 클릭 시 드롭다운 사라짐
    useEffect(() => {
        window.addEventListener("click", checkIfClickedOutside)
        return () => {
            window.removeEventListener("click", checkIfClickedOutside)
        }
    }, [dropDown])
    useEffect(() => {
        
    }, [])
    return (
        <div className="flex flex-col h-full relative overflow-hidden">
            {/* 글쓴이 정보 */}
            <div className='relative flex items-center border-b-2 pb-2'>
                {/* 사진 */}
                <div className='cursor-pointer bg-studion-400 text-white rounded-full flex items-center justify-center text-lg font-lite w-10 h-10 mr-2'>
                    <div onClick={() => onClickProfile(post.user.id)}>
                        {
                            !post.user.image
                                ?
                                post.user.name.slice(0, 2).toUpperCase()
                                :
                                <img src={post.user.image} alt="" />
                        }
                    </div>
                </div>
                <div className='font-semibold'>
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
                            <Dropdown userId={userId} post={post} />
                        </div>
                    )
                }

            </div>
            <div className='mt-2 px-3 border-b-2 pb-4'>
                <div className='flex truncate whitespace-pre-line h-fit break-all text-left'>
                    {post.content}
                </div>
            </div>
            <div className={styles.articleContainer} >
                {/* 게시글 내용 */}
                {/* 댓글 */}
                <div className="mt-2 flex-1" >
                    {
                        isLoading ?

                            <div className='flex h-full justify-center items-center'>
                                <Loader />
                            </div> :

                            comments?.map(comment => (
                                <Comment comment={comment} userData={userData} key={comment.id} onClickProfile={onClickProfile}/>
                            ))
                    }
                    {
                        getNextCommentListLoading && 
                        <div className="w-full h-max flex justify-center mt-1">
                            <Loader />
                        </div>
                    }
                    <div ref={observer} className="border-white h-2"/>
                </div>
            </div>
            <div className='w-full'>
                <div className='flex'>
                    <span onClick={onClickLike} className="cursor-pointer">
                        {
                            like ?
                            <AiFillHeart className='text-red-500 text-2xl'/> :
                            <AiOutlineHeart className='text-2xl inline'/> 
                        }
                    </span>
                </div>
                <span className="font-semibold flex cursor-pointer">
                    {`LIKE ${likeCount}`}
                </span>
                <div className='flex w-full'>
                    <input onKeyPress={onKeyPress} type="text" onChange={onCommentChange} value={comment} placeholder='コメント...' className='border-studion-400 border-2 rounded-md flex-1 h-full outline-none caret-studion-400 py-2' />
                    <div onClick={onClickSubmit} className='ml-2 cursor-pointer w-20 items-center flex justify-center text-white rounded-xl bg-studion-400 hover:bg-studion-500 duration-150 py-2'>
                        게시
                    </div>
                </div>
            </div>
        </div>
    )
}

export default wrapper.withRedux(Article)