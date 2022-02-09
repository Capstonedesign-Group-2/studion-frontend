import styles from "../../styles/community/community.module.scss"
import Comment from "./Comment"
const CommentModal = (props) => {
    const { id, user_id, content, flag, image, user, comments } = props.post;
    // const [comment, setComment] = useState('');
    // const onChange = (e) => {
    //     setComment()
    // }
    return (
        <div className={styles.cardModal}>
            <div className={styles.contentContainer}>
                {/* 이미지 */}
                <div className={styles.imgSection}>
                    <img className="" src={image} alt="" />
                </div>
                <div className={styles.commentSection}>
                    {/* 유저정보 */}
                    <div className={styles.userInfo}>
                        <img src={user.image} alt="" />
                        <div className={styles.id}>{user.name}</div>

                    </div>
                    <hr />
                    {/* 댓글 */}
                    <div className={styles.userComment}>
                        <div className={styles.commentScroll}>
                            <div className="flex items-center">
                                <img className="w-9 h-9 m-3 rounded-full" src={user.image} alt="" />
                                <span className="mr-2 font-semibold text-sm">{user.name}</span>
                                <p className="text-xs">{content}</p>
                            </div>
                            {
                                comments.map((comment, i) => (
                                    <Comment key={i} comment={comment} />
                                ))
                            }
                        </div>
                    </div>
                    {/* 댓글 달 공간 */}
                    <form className={styles.createComment}>
                        <div>
                            <input placeholder="댓글 달기..." />
                            <button>게시</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CommentModal;