import styles from "../../styles/soundCloud/soundCloud.module.scss"
import tonearm from "../../public/images/tonearm.svg"
import Image from "next/image"
import { useState } from "react"
import { useEffect } from "react"

const RecodePlayer = ({audio, image}) => {
    const [click, setClick] = useState(false);
    const [toggle, setToggle] = useState(false)
    const onPlay = () => {
        const audioEl = document.getElementById("audio")
        setClick(!click);
        console.log(audioEl);
        {
            !click
            ? audioEl.play()
            : audioEl.pause()
        }
    }

    const onToggle = () => {
        setToggle(!toggle)
    }

    return (
        <div className="relative flex items-center justify-center">
            {
                (audio.length !== 0 && !toggle)
                && (
                    <div className="w-full aspect-[5/4] mt-4 z-10">
                    {
                        audio.length
                        ? 
                            <audio id="audio" src={audio[0].link} style={{ display:'none' }}></audio>
                        :
                            null
                    }
                {/* 디스크 */}
                    
                    <div className="flex h-full">
                        <div className="relative ml-4">
                            <div className={click ? styles.playDisk : styles.stopDisk} >
                                <div className={click ? styles.playDisk_inner : styles.stopDisk_inner}></div>
                            </div>
                        </div>
                        {/* <div className="relative bg-red-400 z-10 h-full aspect-square">
                            
                        </div> */}
                        <div className="absolute right-0">
                            <Image src={tonearm} className={click ? styles.tonearm1 : styles.tonearm2} />
                        </div>
                    </div>
                    {/* 프로그레스 바 */}
                    {/* 버튼 */}
                    <div className={styles.playerButton}>
                        <svg className={styles.leftSvgButton} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M8,8L13,12L8,16M14,8H16V16H14" />
                        </svg>
                        {click 
                            ?
                            // play
                            <svg viewBox="0 0 24 24" onClick={onPlay}>
                                <path fill="currentColor" d="M15,16H13V8H15M11,16H9V8H11M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                            </svg>
                            :
                            // stop
                            <svg viewBox="0 0 24 24" onClick={onPlay}>
                                <path fill="currentColor" d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                            </svg>
                        } 
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M8,8L13,12L8,16M14,8H16V16H14" />
                        </svg>
                    </div>
                </div>
                )
            }
                
            {
                (image.length !== 0 && toggle)
                && (
                    <img src={image[0].link} alt="" className="absolute z-0"/>
                )
            }
            {
                (image.length !== 0 && audio.length !== 0)
                && (
                    <div className="absolute z-20">
                        <button onClick={onToggle}>
                            toggle
                        </button>
                    </div>
                )
            }
        </div>
    )
}

// const Tonearm = {
//     transform: rotate("-30deg"),
//     transformOrigin: "74% 31.8%",
//   }

export default RecodePlayer