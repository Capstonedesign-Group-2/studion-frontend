import Album from "./Album";
import RecodePlayer from "./RecodePlayer";
import { useState, useRef } from "react";
import styles from "../../styles/soundCloud/soundCloud.module.scss"
const Player = ({audio, image}) => {
    const [toggle, setToggle] = useState(false)
    const toggleRef = useRef();
    const onToggle = () => {
        setToggle(!toggle)
        // toggleRef.style.transform
    }
    return (
        <div className="flex h-full max-w-xl items-center justify-center relative w-full">
            {
                (audio.length !== 0 && !toggle)
                &&
                <div className="w-full">
                    <RecodePlayer audio={audio} />
                </div> 
            }
            {
                ((image.length !== 0 && toggle) || (image.length !== 0 && !audio.length && !toggle))
                &&
                <div className="h-full">
                    <img src={image[0].link} alt="" className="h-full w-full object-contain" />
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
                (image.length !== 0 && audio.length !== 0)
                && (
                    <div className={styles.toggleBox}>
                        <div className="text-xs text-white">
                            <svg style={{ width:"24px", height:"24px", marginLeft: "5px" }} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12Z" />
                            </svg>
                        </div>
                        <div ref={toggleRef} onClick={onToggle} className={styles.toggleBtn}
                            style={toggle ? { transform: 'translateX(44px)' } : { }}
                        >

                        </div>
                        <div className="text-xs text-white absolute right-0">
                            <svg style={{ width:"24px", height:"24px", marginRight: "5px"}} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
                            </svg>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Player;