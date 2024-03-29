import RecodePlayer from "./RecodePlayer";
import { useRouter } from "next/router"
import { useState, useRef, useEffect } from "react";
import styles from "../../styles/soundCloud/soundCloud.module.scss"
import wrapper from "../../redux/store";
import { IUser } from "../../types";
import { Modal } from "../common/modals";
import Image from "next/image";


type Composer = {
    id: number,
    user_id: number,
    audio_id: number,
    user: IUser,
}
type Audio = {
    id: number,
    user_id: number,
    post_id: number,
    link: string,
    composers: Composer[]
}
type Langs = {
    detail_post_recode_btn: string
}
type Props = {
    langs: Langs,
    audio?: Audio,
    image?: {
        link: string
    },
    pushRecording: (audio: Audio) => void
    onClickUser: (id: number) => void
}

const Player: React.FC<Props> = ({ langs, audio, image, pushRecording, onClickUser }) => {
    const [toggle, setToggle] = useState(false)
    const toggleRef = useRef<any>();

    const onToggle = () => {
        setToggle(!toggle)
    }
    return (
        <div className="max-w-xl w-full h-full flex flex-col">
            <div className="flex flex-col h-full justify-center items-center relative w-full">
                {
                    (audio && !toggle)
                    &&
                    <div className="w-full h-full relative flex items-center">
                        <div className="w-full">
                            <RecodePlayer audio={audio} />

                        </div>
                        <div className='mt-2 absolute bottom-0 text-left left-0'>
                            <div>with</div>
                            <div className='flex'>
                                {
                                    audio?.composers &&
                                    audio.composers.map((composer) => <BandMember key={composer.id} composerData={composer.user} onClickUser={onClickUser} />)
                                }
                            </div>
                        </div>
                    </div>
                }
                {
                    (audio)
                    &&
                    <div onClick={() => pushRecording(audio)}>
                        <a className="bg-studion-400 absolute left-0 top-3 cursor-pointer rounded-lg text-white hover:bg-studion-300 text-base w-24">
                            {langs.detail_post_recode_btn}
                        </a>
                    </div>
                }
                {
                    ((image && toggle) || (image && !audio && !toggle))
                    &&
                    <div className="shrink" style={{ height: "680px" }}>
                        <img src={image.link} alt="" className="h-full w-full object-contain" />
                    </div>
                }

                {/* 버튼 */}
                {/* {
                    (image.length !== 0 && audio.length !== 0)
                    && (
                    <div className="bg-black absolute right-0 cursor-pointer" onClick={onToggle} >
                        <svg style = {{ width:'24px', height:'24px' }} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                        </svg>
                    </div>
                    )
                } */}
                {/* 토글박스 */}
                {
                    (image && audio)
                    && (
                        <div className={styles.toggleBox} onClick={onToggle}>
                            <div className="text-xs text-white">
                                <svg style={{ width: "24px", height: "24px", marginLeft: "7px" }} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12Z" />
                                </svg>
                            </div>
                            <div ref={toggleRef} className={styles.toggleBtn}
                                style={toggle ? { transform: 'translateX(44px)' } : {}}
                            >

                            </div>
                            <div className="text-xs text-white absolute right-0">
                                <svg style={{ width: "24px", height: "24px", marginRight: "8px" }} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
                                </svg>
                            </div>
                        </div>
                    )
                }
            </div>
            {/* 참가한 사람 */}

        </div>
    )
}

type MemberProps = {
    composerData: IUser
    onClickUser: (id: number) => void
}

const BandMember = ({ composerData, onClickUser }: MemberProps) => {
    return (
        <div>
            <div className="rounded-full bg-studion-400 mr-1 w-9 h-9 cursor-pointer flex justify-center items-center" onClick={() => onClickUser(composerData.id)}>
                {
                    composerData.image
                        ? <div className="relative w-full aspect-square rounded-full overflow-hidden"><Image alt="user profile" src={composerData.image} layout="fill" /></div>
                        : <div className='text-white' >
                            {composerData.name.slice(0, 2).toUpperCase()}
                        </div>
                }
            </div>
        </div>
    )
}
export default wrapper.withRedux(Player);