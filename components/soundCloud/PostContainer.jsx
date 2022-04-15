import Article from "./Article"
import Player from "./Player";
import { Modal } from "../common/modals";
import styles from "../../styles/soundCloud/soundCloud.module.scss"
import Router from "next/router";

const PostContainer = ({ post, userId }) => {
    const closeModal = () => {
        Modal.close();
    }

    const onClickProfile = (userId) => {
        Modal.close()
        Router.push(`/soundcloud/${userId}`)
    }

    return (
        <div className={styles.postContainer}>
            {/* 나가기 버튼 */}
            <div className="absolute cursor-pointer top-2 right-2" onClick={closeModal}>
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            </div>
            <div className="mx-auto h-full lg:flex justify-center">
                {/* 뮤직플레이어/사진 */}
                <div className="flex h-full items-center justify-center w-full max-screen-w-lg" style={(post.audios.length || post.images.length) ? { display: "flex" } : { display: "none" }}>
                    <Player audio={post.audios} image={post.images} />
                </div>

                {/* 컨텐츠, 코멘트 */}
                <div className="max-w-xl mx-auto pl-2 md:pt-5 lg:max-w-lg lg:mx-0 w-full">
                    <Article userId={userId} post={post} onClickProfile={onClickProfile} />
                </div>
            </div>
        </div>
    )
}

export default PostContainer;