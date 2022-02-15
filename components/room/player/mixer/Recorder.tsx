import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import Mixer from "./Mixer"
import { RootState } from "../../../../redux/slices"

const triangle = {
  width: '0px',
  height: '0px',
  borderLeft: '16px solid #4B5563',
  borderTop: '8px solid transparent',
  borderBottom: '8px solid transparent'
}

interface Props {
  mixerRef: React.MutableRefObject<Mixer | undefined>
}

const Recorder = ({ mixerRef }: Props) => {
  const recorderRef = useRef<MediaRecorder>()
  const audioChunksRef = useRef<Blob[]>([])

  const isLoading = useSelector<RootState, boolean>(state => state.room.isLoading)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isRecording, setIsRecording] = useState<boolean>(false)

  const [urls, setUrls] = useState<string[]>([])
  const [clock, setClock] = useState<number>(0)
  const clockRef = useRef<number>(0)
  const timerInterval = useRef<number>()

  const onPlay = () => {
    setIsPlaying(!isPlaying)
  }

  const onRecording = async () => {
    if (!recorderRef.current) return
    setIsPlaying(true)
    setIsRecording(true)
    startTimer()
    audioChunksRef.current = []
    recorderRef.current.start()
  }

  const onStop = () => {
    if (isRecording && recorderRef.current) {
      recorderRef.current.stop()
    }
    setIsPlaying(false)
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
    if (!isLoading && mixerRef.current) {
      recorderRef.current = new MediaRecorder(mixerRef.current?.recorderNode.stream as MediaStream)

      recorderRef.current.ondataavailable = function (evt) {
        audioChunksRef.current.push(evt.data)
      }

      recorderRef.current.onstop = function (evt) {
        let blob = new Blob(audioChunksRef.current, { 'type': 'audio/wave; codecs=opus' })
        setUrls((prev) => [...prev, URL.createObjectURL(blob)])
      }
    }
  }, [isLoading, mixerRef])

  useEffect(() => {
    return () => {
      if (timerInterval.current) clearInterval(timerInterval.current)
    }
  }, [])

  return (
    <div className="bg-gray-600 h-full flex flex-col overflow-hidden gap-4 py-12 px-8">
      <h3 className="text-gray-300 font-bold text-xl">
        🎙 Studion Recorder
      </h3>
      <div className=" font-mono text-3xl bg-gray-900 text-studion-100 rounded-lg py-4 px-3">
        {(clock / 1000).toFixed(1)}s
      </div>
      <div className="w-full grid grid-cols-3 gap-2">

        {/* 중지 버튼 */}
        <button
          onClick={onStop}
        >
          <div className="flex justify-center items-center bg-gray-400 border-b-4 border-gray-500 rounded-sm h-11">
            <div className='bg-gray-600 w-4 h-4 rounded-sm'></div>
          </div>
        </button>

        {/* 재생, 정지 버튼 */}
        <button
          onClick={onPlay}
        >
          <div className="flex justify-center items-center bg-gray-400 border-b-4 border-gray-500 rounded-sm h-11">
            {isPlaying
              ? (
                <div className="flex gap-1">
                  {[1, 2].map(v => <div key={v} className="h-4 w-[6px] bg-gray-600"></div>)}
                </div>
              )
              : <div className="" style={triangle}></div>}
          </div>
        </button>

        {/* 녹음 버튼 */}
        <button
          onClick={onRecording}
        >
          <div className="flex justify-center items-center bg-gray-400 border-b-4 border-gray-500 rounded-sm h-11">
            <div className='bg-red-700 h-4 w-4 rounded-full'></div>
          </div>
        </button>
      </div>
      <div className="flex-1 mt-4 flex flex-col gap-2 bg-gray-200 overflow-y-scroll">
        {urls && urls.map((url) => (
          <div className="inline" key={url}>
            <AudioPlayer
              className="rounded-md"
              src={url}
              showJumpControls={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recorder