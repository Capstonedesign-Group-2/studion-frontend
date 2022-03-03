import Article from "./Article"
import Player from "./Player";
import { Modal } from "../common/modals";

const PostContainer = ({post}) => {
    const closeModal = () => {
        Modal.close();
    }
    return (
        <div className="max-w-screen-xl h-full w-full mx-auto">
            {/* 나가기 버튼 */}
            <div className="absolute cursor-pointer top-2 right-2 hover:scale-125" onClick={closeModal}>
                <svg className="w-10 h-10" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            </div>
            <div className="mx-auto h-full lg:flex">
                {/* 뮤직플레이어/사진 */}
                <div className="flex items-center justify-center w-full max-screen-w-lg ">
                    <Player audio={post.audios} image={post.images} />
                </div>
                {/* 컨텐츠, 코멘트 */}
                <div className="max-w-lg mx-auto lg:max-w-md lg:pl-2 lg:mx-0 w-full">
                    <Article post={post}/>
                </div>
            </div>
        </div>
    )
}

export default PostContainer;