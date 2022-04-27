import { useEffect } from "react";
import http from "../../http";
import { Modal } from "../common/modals";
const LikeModal = ({postId}) => {
    useEffect(() => {
        http.get(`/likes/${postId}`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.error(err)
        })
    }, [])
    return (
        <div className="w-full flex flex-col h-full">
            <header className="w-full">
                <p className="font-bold border-b">좋아요</p>
                <div className="absolute cursor-pointer top-2 right-2" onClick={() => {Modal.close()}}>
                <svg className="w-7 h-7" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            </div>               
            </header>
            {/* 좋아요 유저 목록 */}
            <div className="mt-1 w-full overflow-y-auto">
                <div className="w-full">
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                </div>
            </div>
        </div>
    )
}
const User = ({user}) => {
    return (
        <div className="flex items-center py-2 pl-2 hover:bg-gray-100 cursor-pointer">
            {/* 사진 */}
            {
                user?.image
                ?
                <div className=""></div>
                :
                <div className="w-12 h-12 bg-studion-400 rounded-full text-white flex items-center justify-center font-base text-xl">
                    <div>
                        PP
                    </div>
                </div>
            }
            <div className="ml-2 text-left text-base flex flex-col align-top">
            {/* 이름 */}
                <div className="h-5 font-semibold">ppang</div>
            {/* 이메일 */}
                <div className="text-gray-400">ppang@gmail.com</div>
            </div>
        </div>
    )
}

export default LikeModal;