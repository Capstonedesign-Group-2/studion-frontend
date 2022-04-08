import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/soundCloud/soundCloud.module.scss'
import http from '../../http/index';
import { useSelector } from 'react-redux';
import wrapper from '../../redux/store';
import Comment from './Comment';
import Dropdown from './DropDown';
import Loader from '../common/Loader';

const Article = ({ post, userId, onClickProfile }) => {
    const [comment, setComment] = useState('');
    const userData = useSelector(state => state.user.data);
    const [comments, setComments] = useState([])
    const [dropDown, setDropDown] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const commentRef = useRef();
    const ref = useRef();
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
                console.log('comments : ', res);
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
        http.get(`/comments/${post.id}`)
            .then(res => {
                setComments(res.data.comments);
                setLoading(false)
            }).catch(err => {
                setLoading(false)
                console.error(err);
            })
    }
    // const userClick = () => {
    //     http.get(`/posts/show/${}`)
    // }
    useEffect(() => {
        setLoading(true)
        callComments();
        console.log('render')
    }, []);

    // 바깥 클릭 시 드롭다운 사라짐
    useEffect(() => {
        window.addEventListener("click", checkIfClickedOutside)

        return () => {
            window.removeEventListener("click", checkIfClickedOutside)
        }
    }, [dropDown])
    useEffect(() => {
        commentRef.current.scrollTop = commentRef.current.scrollHeight
    }, [comments])
    const checkIfClickedOutside = ({ target }) => {
        if (dropDown && ref.current && !ref.current.contains(target)) {
            setDropDown(false);
        }
    }
    return (
        <div className="flex flex-col h-full relative">
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
            <div className={styles.articleContainer} ref={commentRef}>
                {/* 게시글 내용 */}
                <div className='mt-2 px-3 border-b-2 pb-4'>
                    <div className='flex truncate whitespace-pre-line h-fit break-all text-left'>
                        {post.content}
                    </div>

                </div>
                {/* 댓글 */}
                <div className="mt-2 flex-1">
                    {
                        isLoading ?

                            <div className='flex h-full justify-center items-center'>
                                <Loader />
                            </div> :

                            comments?.map(comment => (
                                <Comment comment={comment} key={comment.id} onClickProfile={onClickProfile}/>
                            ))
                    }
                    {/* {comments&&
                            comments.map(comment => (
                                <Comment comment={comment} key={comment.id}/>
                            ))
                        } */}

                </div>
            </div>
            <div className='flex w-full h-10'>
                <input onKeyPress={onKeyPress} type="text" onChange={onCommentChange} value={comment} placeholder='コメント...' className='pl-2 w-11/12 h-full grow-1 outline-studion-400	caret-studion-400' />
                <div onClick={onClickSubmit} className='ml-2 cursor-pointer w-2/12 h-full items-center flex justify-center text-white rounded-xl bg-studion-400 hover:bg-studion-500 duration-150'>
                    게시
                </div>
            </div>
        </div>
    )
}

export default wrapper.withRedux(Article)