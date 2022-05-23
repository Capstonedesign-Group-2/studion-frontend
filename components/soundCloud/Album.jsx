import { useDispatch } from "react-redux";
import Router from "next/router";

import styles from "../../styles/soundCloud/soundCloud.module.scss"
import { Modal } from "../common/modals";
import PostContainer from "./PostContainer"
import postSlice from "../../redux/slices/post";
import { useEffect, useState } from "react";

const Album = ({ post, userId }) => {
    const [isLike, setIsLike] = useState(false)
    const [likes, setLikes] = useState(post.likes)
    const dispatch = useDispatch()
    const pushRecording = (audio) => {
        Modal.close()
        Router.push({
            pathname: `/recording`,
            query: audio
        })
    }
    const openModal = () => {
        if (!userId) {
            Modal.fire({
                icon: 'error',
                title: 'ログインしてください！',
                text: 'ログインが必要なサービスです。',
                footer: <p onClick={() => Router.push('login')} className="text-studion-400 hover:cursor-pointer">ログイン →</p>,
                showConfirmButton: false,
            })
            return
        }
        dispatch(postSlice.actions.deleteNextUrl())
        Modal.fire({
            html: <PostContainer isLike={isLike} likes={likes} onClickUser={onClickUser} pushRecording={pushRecording} post={post} userId={userId} />,
            showConfirmButton: false,
            scrollbarPadding: false,
            customClass: styles.post,
        })
    }
    const onClickUser = (id) => {
        Modal.close()
        Router.push(`/soundcloud/${id}`)
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