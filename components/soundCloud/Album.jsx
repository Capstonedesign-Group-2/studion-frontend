import styles from "../../styles/soundCloud/soundCloud.module.scss"
import Link from "next/link"
import { Modal } from "../common/modals";
import PostContainer from "./PostContainer"
import postSlice from "../../redux/slices/post";
import { useDispatch } from "react-redux";
const Album = ({ post, userId }) => {
    const dispatch = useDispatch()
    const openModal = () => {
        dispatch(postSlice.actions.deleteNextUrl())
        Modal.fire({
            html: <PostContainer post={post} userId={userId} />,
            showConfirmButton: false,
            scrollbarPadding: false,
            customClass: styles.post,
        })
    }
    return (
        <div className="w-full aspect-[5/4] cursor-pointer" onClick={openModal}>
            <div className={styles.album}>
                <div className={styles.disk}>
                    <div className={styles.disk_inner}></div>
                </div>
                <div className="relative bg-studion-600 z-10 h-full aspect-square ">
                    {
                        post.images?.length
                            ?
                            <img className="object-contain h-full w-full" src={post.images[0].link} alt="" />
                            :
                            <div className="h-full w-full flex items-center pl-2 text-white text-2xl truncate whitespace-pre-line break-all">
                                {post.content}
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Album;