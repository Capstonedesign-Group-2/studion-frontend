import styles from "../../styles/soundCloud/soundCloud.module.scss"
import tonearm from "../../public/images/tonearm.svg"
import Image from "next/image"
import Loader from '../common/Loader'
import { useState, useRef, useCallback } from "react"
import { useEffect } from "react"
import { URL } from "url"

const RecodePlayer = ({audio}) => {
    const [click, setClick] = useState(false);
    const wavesurferRef = useRef()
    const waveformRef = useRef()
    const timeRef = useRef()
    const allTimeRef = useRef()
    // const [isLoaded, setLoaded] = useState(false)
    
    const onPlay = () => {
        setClick(!click);
        {
            !click
            ?
                wavesurferRef.current.play()
            :
                wavesurferRef.current.pause()
        }
    }
    const initWaveSurfer = async () => {
        const WaveSurfer = await require('wavesurfer.js')
        wavesurferRef.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: '#007E8E',
            progressColor: '#34D399',
            cursorColor: '#34D399',
            // fillParent: true,
        })
        
        if(audio.link) {
            wavesurferRef.current.load(audio.link);
        }
        else if(audio.type) {
            wavesurferRef.current.load(window.URL.createObjectURL(audio));
        }

        wavesurferRef.current.on('ready', () => {
            var allTime = wavesurferRef.current.getDuration()
            time(allTimeRef, allTime)
        })
        wavesurferRef.current.on('play', () => {

            }
        )
        wavesurferRef.current.on('pause', () => {

        })
        wavesurferRef.current.on('finish', () => {
            setClick(false)
        })
        wavesurferRef.current.on('audioprocess', function () {
            // document.querySelector(".msg").innerText = 'Audio Process ' + ;
            var now = wavesurferRef.current.getCurrentTime()
            // 0:00 / 0:00
            time(timeRef, now);
        });
        
    }
    const time = (ref, time) => {
        let total = Math.floor(time);
        let second = String(total).padStart(2,0)
        let minute = String(Math.floor(total / 60)).padStart(2, 0);
        if (total !== 0 && total % 60 >= 0) {
            second = String(total - (minute * 60)).padStart(2, 0)
        }
        return ref.current.innerText = `${minute} : ${second}`
    }
    useEffect(() => {
        initWaveSurfer()

        return () => {
            if (!wavesurferRef.current) return
            wavesurferRef.current.destroy()
        }
    }, [audio])

    return (
        <div className="relative w-full">
            <div className="w-full aspect-[5/4] lg:aspect-[4/3] p-2 z-10 cursor-pointer" onClick={onPlay} >
                <audio id="audio" src={audio?.link} style={{ display:'none' }}></audio>
                {/* 디스크 */}
                <div className="flex h-full w-full relative">
                    <div className="relative ml-4 " >
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
                    {/* <svg className={styles.leftSvgButton} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M8,8L13,12L8,16M14,8H16V16H14" />
                    </svg> */}
                    {/* {click 
                        ?
                        // stop
                        <svg viewBox="0 0 24 24" onClick={onPlay}>
                            <path fill="currentColor" d="M15,16H13V8H15M11,16H9V8H11M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                        </svg>
                        :
                        // play
                        <svg viewBox="0 0 24 24" onClick={onPlay}>
                            <path fill="currentColor" d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                        </svg>
                    }  */}
                    {/* <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M8,8L13,12L8,16M14,8H16V16H14" />
                    </svg> */}
                </div>
            </div> 
            <div className="relative w-full">
                <div ref={waveformRef} className="w-full cursor-pointer"></div>
                <div className="relative w-full h-8 flex justify-between px-3">
                    <div ref={timeRef} className="">
                        00 : 00
                    </div>
                    <div ref={allTimeRef} className="">
                        00 : 00
                    </div>
                </div>
            </div>
        </div>
    )
}

// const Tonearm = {
//     transform: rotate("-30deg"),
//     transformOrigin: "74% 31.8%",
//   }

export default RecodePlayer