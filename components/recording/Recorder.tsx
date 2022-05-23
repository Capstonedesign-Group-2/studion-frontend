import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/slices"
import { IUser } from "../../types"
import { AudioFile } from "../room/player/mixer/Recorder"
import Mixer from "./inst/mixer/Mixer"

interface Props {
    mixerRef: MutableRefObject<Mixer | undefined>    
    audioFile: AudioFile
    setAudioFiles: Dispatch<SetStateAction<AudioFile[]>>
    setNav: Dispatch<SetStateAction<boolean>>
    mixerLoading: boolean
    isLoading: boolean
}

const Recorder:React.FC<Props> = ({mixerRef, audioFile, setAudioFiles, setNav, isLoading, mixerLoading}) => {
    const userData = useSelector<RootState, IUser>(state => state.user.data)
    const recorderRef = useRef<MediaRecorder>()
    const audioChunksRef = useRef<Blob[]>([])
    const fileNumber = useRef<number>(0)
    const [isRecording, setIsRecording] = useState<boolean>(false)
    const [clock, setClock] = useState<number>(0)
    const clockRef = useRef<number>(0)
    const timerInterval = useRef<number>()

    const onRecording = async () => {
        // console.log('onClick')
        // console.log(recorderRef.current)
        // console.log(isRecording)
        if (!recorderRef.current || isRecording) return
        if(!isRecording) {
            setIsRecording(true)
            startTimer()
            audioChunksRef.current = []
            recorderRef.current.start()
        } else {
            onStop()
        }
    }

    const onStop = () => {
        if (isRecording && recorderRef.current) {
          recorderRef.current.stop()
        }
        setNav(true)
        setIsRecording(false)
        clearInterval(timerInterval.current)
    }
    const startTimer = () => {
        const now = Date.now()
        setClock(0)
        clockRef.current = 0
        timerInterval.current = window.setInterval(() => {
            clockRef.current = Date.now() - now
            setClock(clockRef.current)
        }, 50)
    }
    useEffect(() => {
        console.log('isLoading',isLoading)
        console.log('mixer', mixerRef)
        if(mixerLoading) return;
        if (!isLoading && mixerRef.current) {
          recorderRef.current = new MediaRecorder(mixerRef.current.recorderNode.stream as MediaStream)
          recorderRef.current.ondataavailable = (evt) => {
            audioChunksRef.current.push(evt.data)
          }
          console.log(recorderRef)
          recorderRef.current.onstop = async () => {
            let blob = new Blob(audioChunksRef.current, { 'type': 'audio/wav' })
            let check = false
            let composers = audioFile?.users
            try {
                if(audioFile?.users){
                    for(let i = 0; i < audioFile.users.length ; i ++) {
                        if(audioFile.users[i].id === userData.id)
                            check = true
                    }
                    if(!check)
                        composers?.push(userData)
                }                
              const audio = {
                label: 'Track_' + fileNumber.current,
                url: URL.createObjectURL(blob),
                blob,
                users: composers
              }
              setAudioFiles((prev) => [...prev, audio])
              fileNumber.current += 1
            } catch (err) {
              console.error('Array buffer error', err)
            }
          }
        }
      }, [isLoading, mixerRef, audioFile, mixerLoading])
    return (
        <div className="flex flex-col overflow-hidden gap-4">
            <h3 className="font-bold text-xl">
                🎙️ Recorder
            </h3>
            <div className=" font-mono text-3xl bg-gray-900 text-studion-100 rounded-lg py-4 px-3">
                {(clock / 1000).toFixed(1)}
            </div>
            <div className="w-full grid grid-cols-2 gap-2">

                {/* 중지 버튼 */}
                <button
                onClick={onStop}
                >
                <div className="flex justify-center items-center bg-gray-300 border-b-4 border-gray-400 rounded-sm h-11 active:border-studion-100 duration-75">
                    <div className='bg-gray-600 w-4 h-4 rounded-sm'></div>
                </div>
                </button>

                {/* 녹음 버튼 */}
                <button
                    onClick={onRecording}
                >
                <div className="flex justify-center items-center bg-gray-300 border-b-4 border-studion-100 rounded-sm h-11"
                    style={isRecording ? {} : { borderColor: 'rgb(156 163 175)' }}
                >
                    <div className='bg-red-700 h-4 w-4 rounded-full'
                    style={isRecording ? { backgroundColor: 'rgb(239 68 68)' } : {}}
                    ></div>
                </div>
                </button>
            </div>
        </div>
    )
}

export default Recorder