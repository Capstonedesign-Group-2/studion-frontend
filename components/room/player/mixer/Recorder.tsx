import { useCallback, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useRouter } from 'next/router'

import Mixer from "./Mixer"
import { RootState } from "../../../../redux/slices"
import { Modal } from "../../../common/modals"
import AudioEditor from "../../editor/AudioEditor"
import Socket from "../../../../socket"
import { IUser } from "../../../../types"

export type AudioFile = {
  label: string,
  url: string,
  blob: Blob,
  users?: IUser[]
} | undefined

interface Props {
  mixerRef: React.MutableRefObject<Mixer | undefined>
}

const Recorder = ({ mixerRef }: Props) => {
  const router = useRouter()
  const recorderRef = useRef<MediaRecorder>()
  const audioChunksRef = useRef<Blob[]>([])

  const isLoading = useSelector<RootState, boolean>(state => state.room.isLoading)
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const usersRef = useRef<IUser[]>([])

  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([])
  const [clock, setClock] = useState<number>(0)
  const clockRef = useRef<number>(0)
  const timerInterval = useRef<number>()
  const fileNumber = useRef<number>(0)

  const onRecording = async () => {
    if (!recorderRef.current || isRecording) return
    setIsRecording(true)
    startTimer()
    audioChunksRef.current = []
    recorderRef.current.start()
  }

  const onStop = () => {
    Socket.socket.emit('people_recording', router.query.id)
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

  const onEditAudio = (audioFile: AudioFile) => {
    Modal.fire({
      title: 'オーディオ編集',
      showConfirmButton: false,
      html: <AudioEditor audioFile={audioFile} setAudioFiles={setAudioFiles}></AudioEditor>
    })
  }

  const handlePeopleRecording = useCallback((data: Array<any>) => {
    if (isRecording && recorderRef.current) {
      if (data.length !== 0) {
        usersRef.current = []
        data.forEach((v) => {
          usersRef.current.push(v.user as IUser)
        })
        
      }
      recorderRef.current.stop()
    }
    setIsRecording(false)
    clearInterval(timerInterval.current)
  }, [isRecording])

  useEffect(() => {
    Socket.socket.on('people_recording_on', handlePeopleRecording)
    return () => {
      Socket.socket.off('people_recording_on', handlePeopleRecording)
    }
  }, [handlePeopleRecording])

  useEffect(() => {
    if (!isLoading && mixerRef.current) {
      recorderRef.current = new MediaRecorder(mixerRef.current?.recorderNode.stream as MediaStream)

      recorderRef.current.ondataavailable = (evt) => {
        audioChunksRef.current.push(evt.data)
      }

      recorderRef.current.onstop = async (dd) => {
        let blob = new Blob(audioChunksRef.current, { 'type': 'audio/mp3; codecs=opus' })
        try {
          const audioFile = {
            label: 'Track_' + fileNumber.current,
            url: URL.createObjectURL(blob),
            blob,
            users: usersRef.current
          }
          setAudioFiles((prev) => [...prev, audioFile])
          fileNumber.current += 1
        } catch (err) {
          console.error('Array buffer error', err)
        }
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
        🎙️ Recorder
      </h3>
      <div className=" font-mono text-3xl bg-gray-900 text-studion-100 rounded-lg py-4 px-3">
        {(clock / 1000).toFixed(1)}s
      </div>
      <div className="w-full grid grid-cols-2 gap-2">

        {/* 중지 버튼 */}
        <button
          onClick={onStop}
        >
          <div className="flex justify-center items-center bg-gray-400 border-b-4 border-gray-500 rounded-sm h-11 active:border-studion-100 duration-75">
            <div className='bg-gray-600 w-4 h-4 rounded-sm'></div>
          </div>
        </button>

        {/* 녹음 버튼 */}
        <button
          onClick={onRecording}
        >
          <div className="flex justify-center items-center bg-gray-400 border-b-4 border-studion-100 rounded-sm h-11"
            style={isRecording ? {} : { borderColor: 'rgb(107 114 128)' }}
          >
            <div className='bg-red-700 h-4 w-4 rounded-full'
              style={isRecording ? { backgroundColor: 'rgb(239 68 68)' } : {}}
            ></div>
          </div>
        </button>
      </div>

      <h3 className="text-gray-300 font-bold mt-4 text-xl">
        🎧 Sound List
      </h3>
      <div className="flex flex-col gap-2 overflow-y-auto max-h-96">
        {audioFiles.length !== 0
          ? audioFiles.map((audioFile) => (
            <div key={audioFile?.label}>
              <div className="flex justify-between text-gray-300">
                <label className="text-lg"># {audioFile?.label}</label>
                <button onClick={() => onEditAudio(audioFile)}>edit 🛠</button>
              </div>
              <audio src={audioFile?.url} controls className="w-full mt-1 rounded" />
            </div>
          ))
          : <div className="text-gray-300 text-center">録音してください！</div>}
      </div>
    </div>
  )
}

export default Recorder