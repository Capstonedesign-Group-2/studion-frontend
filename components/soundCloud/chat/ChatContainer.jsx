import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import styles from "../../../styles/soundCloud/soundCloud.module.scss"
import { Modal } from "../../common/modals"
import CreateChat from "./CreateChat"
import ChatDropdown from "./ChatDropdown"
import Socket from "../../../socket/index"
import Loader from "../../common/Loader"
import Router from "next/router"
import { BiExit } from "react-icons/bi"
import Image from "next/image"
import useTranslation from "next-translate/useTranslation"
const ChatContainer = ({ setMessage, message, selectUser, messages, chatRef, onClickSend, onKeyPress }) => {
    const userData = useSelector(state => state.user.data);
    const router = useRouter()
    const otherUser = useSelector(state => state.another.userInfo)
    const [dropDown, setDropDown] = useState(false);
    const ref = useRef();
    const { t } = useTranslation("chat")
    const langs = {
      chat_modal_title: t("chat_modal_title")
    }
    const openModal = () => {
        Modal.fire({
            html: <CreateChat langs={langs} />,
            showConfirmButton: false,
            customClass: styles.followList,
        })
    }
    const onChangeMessage = (e) => {
        const { value } = e.target;
        setMessage(value);
    }

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

    if (router.query.id && !otherUser) return (
        <div className="w-full h-full flex justify-center items-center">
            <Loader />
        </div>
    )
    return (
        <div className="max-w-2xl md:maw-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl max-h-screen h-full w-full">
            <div className="h-full w-full flex flex-col">
                {/* 채팅방 */}
                <>
                    <div className="mt-2 relative flex items-center w-full h-16 pb-2" >
                        {/* 사진 */}
                        <div className="flex cursor-pointer" onClick={() => Router.push(`/soundcloud/${otherUser.id}`)}>
                            {
                                otherUser &&
                                (<div className="bg-studion-400 w-14 h-14 rounded-full mr-2 flex justify-center items-center text-white text-2xl font-normal">
                                    {otherUser.image
                                        ? <div className="relative bg-white w-14 aspect-square overflow-hidden rounded-full"><Image alt="user profile" layout="fill" src={otherUser.image} /></div>
                                        : otherUser.name.slice(0, 2).toUpperCase()}
                                </div>)
                            }
                            {/* 상대방 아이디 */}
                            <div className="text-2xl flex items-center font-semibold">
                                {otherUser?.name}
                            </div>
                        </div>
                        <div onClick={() => setDropDown(!dropDown)} className='absolute right-3 hover:scale-125 transition-all cursor-pointer'>
                            <svg aria-label="옵션 더 보기" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <circle cx="12" cy="12" r="1.5"></circle>
                                <circle cx="6" cy="12" r="1.5"></circle>
                                <circle cx="18" cy="12" r="1.5"></circle>
                            </svg>
                        </div>
                        {
                            dropDown &&
                            (
                                <div ref={ref} className={styles.dropDown}>
                                    <ChatDropdown userData={userData} otherUser={otherUser} />
                                </div>
                            )
                        }
                        {/* <div className="absolute flex items-center right-0 h-full" >
                                <BiExit className="w-8 h-fit cursor-pointer" onClick={() => onClickExit()} />
                            </div> */}
                    </div>
                    <div ref={chatRef} className={styles.chatSection}>
                        {
                            !(router.query.id) &&
                            <div className="w-full h-full flex flex-col justify-center items-center">
                                <div className="text-3xl font-semibold">{t("chatContainer_title")}</div>
                                <div className="mt-1 text-lg font-thin">{t("chatContainer_detail")}</div>
                                <div className="mt-2 px-4 cursor-pointer h-fit py-1 text-white flex justify-center items-center rounded-lg bg-studion-400 hover:bg-studion-500 duration-150" onClick={() => openModal()}>{t("chatContainer_btn")}</div>
                            </div>
                        }
                        {messages &&
                            messages.map((messageInfo, index) => (messageInfo.user_id !== userData.id ? <ReceivedMessage messageInfo={messageInfo} key={index} otherUser={otherUser} /> : <SendMessage messageInfo={messageInfo} key={index} />))
                        }
                    </div>
                </>

                <div className="flex w-full mt-2 pb-4">
                    <input type="text" onKeyPress={onKeyPress} onChange={onChangeMessage} className="flex-1 text-sm bg-gray-100 outline-none px-4 shadow rounded-md" value={message} placeholder={t("chat_input_msg")} />
                    {/* 보내기 버튼 */}
                    <div onClick={onClickSend} className="w-20 h-10 ml-2 flex cursor-pointer text-white items-center justify-center bg-studion-300 rounded-xl hover:bg-studion-400 shadow-xl duration-150">{t("chat_input_btn")}</div>
                </div>
            </div>
        </div>
    )
}
const ReceivedMessage = ({ messageInfo, otherUser }) => {
    // const userData = useSelector(state => state.user.data);
    return (
        <div className="w-full flex">
            <div className="flex mt-2 ml-4 items-start cursor-pointer">
                <div className="w-fit h-full">
                    <div className="w-10 items-center text-white text-sm h-10 mr-2 rounded-full bg-studion-400 self-end flex justify-center cursor-pointer">
                        {
                            otherUser.image
                                ? <div className="w-10 bg-white aspect-square overflow-hidden rounded-full relative"><Image src={otherUser.image} alt="user profile" layout="fill" /></div>
                                : otherUser.name.slice(0, 2).toUpperCase()
                        }
                    </div>
                </div>
                <div className="flex flex-col text-lg">
                    {messageInfo.name}
                    <div className="w-fit px-4 py-2 max-w-xs lg:max-w-xl text-base break-all rounded-md rounded-tl-none shadow bg-white">
                        {/* {text} */}

                        {messageInfo.content}
                    </div>
                </div>
            </div>
        </div>
    )
}
const SendMessage = ({ messageInfo }) => {
    return (
        <div className="flex justify-end mt-2 mr-4">
            <div className="w-fit text-white text-base px-4 py-2 rounded-md rounded-br-none max-w-xs md:max-w-sm lg:max-w-xl break-all bg-studion-500">
                {/* {text} */}
                {messageInfo.content}
            </div>
        </div>
    )
}
export default ChatContainer;