import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/soundCloud/soundCloud.module.scss'
import http from '../../http/index';
import { useSelector } from 'react-redux';
import wrapper from '../../redux/store';
import Comment from './Comment';
import Dropdown from './DropDown';

const Article = ({post}) => {
    const [comment, setComment] = useState('');
    const userData = useSelector(state => state.user.data);
    const [comments, setComments] = useState([])
    const [dropDown, setDropDown] = useState(false);
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
        console.log(commentData);
        http.post('/comments/create', commentData)
        .then(res => {
            console.log(res);
            setComment('');
            // setComments([...comments, commentData])
            callComments();
        }).catch(err => {
            console.log(err);
        })
    }
    const callComments = () => {
        http.get(`/comments/show/${post.id}`)
        .then(res => {
            setComments(res.data.comments);    
        }).catch(err => {
            console.log(err);
        })
    }
    // const userClick = () => {
    //     http.get(`/posts/show/${}`)
    // }
    useEffect(() => {
        callComments();
        console.log('render')
    },[]);

    // 바깥 클릭 시 드롭다운 사라짐
    useEffect(() => {
        window.addEventListener("click", checkIfClickedOutside)

        return () => {
            window.removeEventListener("click", checkIfClickedOutside)
        }
    }, [dropDown])
    const checkIfClickedOutside = ({ target }) => {
        if(dropDown && ref.current && !ref.current.contains(target)) {
            setDropDown(false);
        }
    }
    return (
        <div>
            <div className="h-auto mt-4 w-full">
                <div className=''>
                    {/* 글쓴이 정보 */}
                    <div className='relative flex items-center text-lg font-semibold'>
                        {/* 사진 */}
                        {
                            !post.user.image
                            ? 
                                <div className='border-2 border-black rounded-full flex items-center justify-center text-sm w-10 h-10 mr-2'>
                                    {post.user.name.slice(0, 2).toUpperCase()}
                                </div>
                            : 
                                <div className='border-2 border-black rounded-full w-10 h-10 mr-2'>
                                    <img src={post.user.image} alt="" />
                                </div>
                        }
                        {post.user.name}
                        <div  onClick={() => setDropDown(!dropDown)} className='absolute right-3 hover:scale-125 transition-all'>
                            <svg aria-label="옵션 더 보기"  color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <circle cx="12" cy="12" r="1.5"></circle>
                                <circle cx="6" cy="12" r="1.5"></circle>
                                <circle cx="18" cy="12" r="1.5"></circle>
                            </svg>
                        </div>
                        {
                            dropDown &&
                            (
                                <div ref={ref} className={styles.dropDown}>
                                    <Dropdown post={post}/>
                                </div>
                            )
                        }
                    </div>
                    {/* 게시글 내용 */}
                    <div className='mt-2'>
                        <div className={styles.postContent}>
                            {post.content}
                        </div>
                        {/* 참가한 사람 */}
                        <div className='mt-2 text-left'>
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
                <div className={styles.commentContainer}>
                    {comments&&
                        comments.map(comment => (
                            <Comment comment={comment} key={comment.id}/>
                        ))
                    }
                    
                </div>
                <div className=' flex mt-6 h-10'>
                    <input type="text" onChange={onCommentChange} value={comment} placeholder='댓글 달기...'  className='w-11/12 h-full grow-1'/>
                    <div onClick={onClickSubmit} className='cursor-pointer w-2/12 h-full items-center flex justify-center text-white rounded-xl bg-studion-300 hover:bg-studion-400'>
                        <div>
                            게시
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const BandMember = () => {
    return (
        <div>
            <div className='rounded-full w-9 h-9 border-black border-2 mr-1'>
            </div>
        </div>
    )
}
export default wrapper.withRedux(Article)