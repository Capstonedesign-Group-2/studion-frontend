import Album from "./album";
import RecodePlayer from "./recodePlayer";
import { useState } from "react";
import styles from "../../styles/soundCloud/soundCloud.module.scss"
const Player = ({audio, image}) => {
    const [toggle, setToggle] = useState(false)
    const onToggle = () => {
        setToggle(!toggle)
    }
    return (
        <div className="flex h-full items-center justify-center relative w-full">
            {
                (audio.length !== 0 && !toggle)
                &&
                <div className="h-full w-full">
                    <RecodePlayer audio={audio} />
                </div> 
            }
            {
                (image.length !== 0 && toggle) | (image.length !== 0 && !audio.length && !toggle)
                &&
                <div className="h-full">
                    <img src={image[0].link} alt="" className="h-full w-full object-contain" />
                </div>
            }
            {
                (image.length !== 0 && audio.length !== 0)
                && (
                <div className="bg-black absolute right-0 cursor-pointer" onClick={onToggle} >
                    <svg style = {{ width:'24px', height:'24px' }} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                    </svg>
                </div>
                )
            }
            {/* 토글박스 */}
            {/* <div className={styles.toggleBox}>
                <div className="text-xs text-white">
                    audio
                </div>
                <div onClick={onToggle} className={(toggle !== 0) ? styles.toggleBtnLeft : styles.toggleBtnRight}>

                </div>
                <div className="text-xs text-white absolute right-0">
                    image
                </div>
            </div> */}
        </div>
    )
}

export default Player;