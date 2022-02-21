import styles from "../../styles/soundCloud/soundCloud.module.scss"
import tonearm from "../../public/images/tonearm.svg"
import Image from "next/image"
import { useState } from "react"

const RecodePlayer = () => {
    const [click, setClick] = useState(false);
    const onPlay = () => {
        setClick(!click);
    }
    return (
        <div className="w-full aspect-[5/4] mt-4">            
            <div className="flex h-full">
                <div className="relative ml-4">
                    <div className={!click ? styles.playerDisk : styles.disk2}>
                        <div className={!click ? styles.playerDisk_inner : styles.disk_inner2}></div>
                    </div>
                </div>
                {/* <div className="relative bg-red-400 z-10 h-full aspect-square">
                    
                </div> */}
                <div className="absolute right-0">
                    <Image src={tonearm} className={!click ? styles.tonearm : styles.tonearm2} />
                </div>
            </div>
            <div className={styles.playerButton}>
                <svg className={styles.leftSvgButton} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M8,8L13,12L8,16M14,8H16V16H14" />
                </svg>
                {!click 
                    ?
                    <svg viewBox="0 0 24 24" onClick={onPlay}>
                        <path fill="currentColor" d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                    :
                    <svg viewBox="0 0 24 24" onClick={onPlay}>
                        <path fill="currentColor" d="M15,16H13V8H15M11,16H9V8H11M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                } 
                <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M8,8L13,12L8,16M14,8H16V16H14" />
                </svg>
            </div>
        </div>
    )
}

// const Tonearm = {
//     transform: rotate("-30deg"),
//     transformOrigin: "74% 31.8%",
//   }

export default RecodePlayer