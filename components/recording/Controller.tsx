import React, { Dispatch, MutableRefObject, SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import audioMaker from 'audiomaker'
import { AudioFile } from "../room/player/mixer/Recorder"
import { BsFillVolumeUpFill, BsFillRecordFill, BsFillVolumeMuteFill } from 'react-icons/bs'
import { FaStop, FaPlay } from 'react-icons/fa'
import { VolumeSlider } from "../room/player/mixer/VolumeSlider"
import Loader from "../common/Loader"
import Mixer from './inst/mixer/Mixer'
import { Wave } from "./Wave"
import DragDrop from "./DragDrop"
import { Router } from "next/router"


type Props = {
  audioFile: AudioFile
  setAudioFile: Dispatch<SetStateAction<AudioFile>>
  audioFiles: AudioFile[]
  setAudioFiles: Dispatch<SetStateAction<AudioFile[]>>
  isLoading: boolean
  mixerRef: MutableRefObject<Mixer | undefined>
  setIsPlaying: React.Dispatch<SetStateAction<boolean>>
}
type GetTime = {
  (ref: any, now: number) : any,
  (ref: any, now: number, end: number) : any,
}
const Controller: React.FC<Props> = ({ audioFile, isLoading, mixerRef, setAudioFile, audioFiles, setAudioFiles }) => {
  // make wavesurfer 
  const wavesurferRef = useRef<any>()
  const waveformRef = useRef<HTMLDivElement>(null)
  const audioMakerRef = useRef<any>()

  // Time  
  const startRef = useRef<any>()
  const endRef = useRef<any>()

  // wavesurfer volume control
  const waveRef = useRef<Wave>()

  // // file drag & drop
  // const dragDrop = useRef<HTMLDivElement | null>(null)
  // button
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isMute, setMute] = useState<boolean>(true)

  // recording
  const recorderRef = useRef<MediaRecorder>()
  const recorderBtnRef = useRef<any>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const fileNumber = useRef<number>(0)
  // const isLoading = useSelector<RootState, boolean>(state => state.room.isLoading)
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const timerInterval = useRef<number>()
  
  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    if(typeof newValue === 'number') {
      mixerRef.current?.setMasterGain(newValue / 120)
      waveRef.current?.setGain(newValue / 120)
      wavesurferRef.current.setVolume(newValue / 120)
    }
  }

  const getTime: GetTime = (ref, now, end?:number) => {
    let total = 0
    if(end) {
      total = Math.floor(end) - Math.floor(now)
    } else {
      total = Math.floor(now);
    }
    let second = String(total).padStart(2,'0')
    let minute = String(Math.floor(total / 60)).padStart(2, '0');
    if (total !== 0 && total % 60 >= 0) {
      second = String(total - (parseInt(minute) * 60)).padStart(2,'0')
    }
    return ref.current.innerText = `${minute} : ${second}`
  }
  const onClickPlay = () => {
    setIsPlaying((prev) => !prev)
    {
      !isPlaying
      ?
        wavesurferRef.current.play()
      :
        wavesurferRef.current.pause()
    }
  }
  const onClickMute = () => {
    // false -> mute / true -> on
    setMute((prev) => !prev)
    mixerRef.current?.setMasterMute(!isMute);
    wavesurferRef.current.setVolume(!isMute)
    waveRef.current?.setGain(!isMute)
  }

  const onRecording = async () => {
    if (!recorderRef.current) return
      if(!isRecording) {
        setIsRecording(true)
        // startTimer()
        audioChunksRef.current = []
        recorderRef.current.start()
        wavesurferRef.current.play(0)
        waveRef.current?.onPlay()
      } else {
        onStop()
        wavesurferRef.current.stop()
        waveRef.current?.onStop()
      }
    }

  const onStop = () => {
    if (isRecording && recorderRef.current) {
      recorderRef.current.stop()
    }
    setIsRecording(false)
    clearInterval(timerInterval.current)
  }
  useEffect(() => {
    if (!isLoading && mixerRef.current) {
      recorderRef.current = new MediaRecorder(mixerRef.current.recorderNode.stream as MediaStream)
      recorderRef.current.ondataavailable = (evt) => {
        audioChunksRef.current.push(evt.data)
      }

      recorderRef.current.onstop = async () => {
        let blob = new Blob(audioChunksRef.current, { 'type': 'audio/mp3; codecs=opus' })
        try {
          const audioFile = {
            label: 'Track_' + fileNumber.current,
            url: URL.createObjectURL(blob),
            blob
          }
          setAudioFiles((prev) => [...prev, audioFile])
          fileNumber.current += 1
        } catch (err) {
          console.error('Array buffer error', err)
        }
      }
    }
    console.log(recorderRef)
  }, [isLoading, mixerRef, audioFile])

  
  useEffect(() => {
    let blobUrl = ''
    if(mixerRef.current && audioFile) {
      blobUrl = window.URL.createObjectURL(audioFile.blob)
      const audio = new Audio(blobUrl)
      waveRef.current = new Wave(mixerRef.current, audio)
    }

    if(isLoading || !audioFile) return
    const initWaveSurfer = async () => {
      const WaveSurfer = await require('wavesurfer.js')

      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        height: 110,
        waveColor: '#007E8E',
        progressColor: '#34D399',
        cursorColor: '#34D399',
        // barHeight: 2,
      })

      wavesurferRef.current.on('ready', () => {
        var endTime = wavesurferRef.current.getDuration()
        getTime(endRef, endTime)
        // setTimeSet({
        //   start: 0,
        //   end: wavesurferRef.current.getDuration()
        // })

        wavesurferRef.current.on('play', () => {
          setIsPlaying(true)
        })

        wavesurferRef.current.on('pause', () => {
          setIsPlaying(false)
        })

        wavesurferRef.current.on('finish', () => {
          setIsPlaying(false)
        })
        wavesurferRef.current.on('audioprocess', function () {
          // document.querySelector(".msg").innerText = 'Audio Process ' + ;
          var now = wavesurferRef.current.getCurrentTime()
          // 0:00 / 0:00
          getTime(startRef, now);
          getTime(endRef, now, endTime);
        });
      })

      wavesurferRef.current.loadBlob(audioFile ? audioFile.blob : new Blob())
    }
    initWaveSurfer()
    audioMakerRef.current = new audioMaker()

    return () => {
      if (!wavesurferRef.current) return
      wavesurferRef.current.destroy()
    }
  }, [isLoading, audioFile])
  return (
    <div>
      {
        isLoading &&
        <div className="flex justify-center">
          <Loader />
        </div>
        }
        {
          audioFile
          ? <div className='shadow-lg border-[1px] border-gray-200 rounded-b'ref={waveformRef}></div>
          : <DragDrop setAudioFile={setAudioFile} />
          
        }
          {console.log('waveform',waveformRef)}
      <div className="flex justify-around items-center my-4">
        <div className="flex justify-between items-center">
          <div className="w-8 h-8 flex justify-center items-center mr-4 hover:cursor-pointer" onClick={() => onClickPlay()}>
            {
              isPlaying
                ? <FaStop className="text-2xl text-studion-100" />
                : <FaPlay className="text-xl text-studion-100" />
            }
          </div>
          <div>
              <BsFillRecordFill style={{ color: isRecording ? 'rgb(239 68 68)' : 'rgb(254 202 202)' }} className="text-3xl text-red-100 hover:cursor-pointer" onClick={onRecording}/>
          </div>
        </div>
        <div ref={startRef}>00 : 00</div>
        <div className="text-gray-400 text-xl">{audioFile?.label}</div>
        <div ref={endRef}>-00 : 00</div>
        <div className=" relative group hover:cursor-pointer">
          {
            isMute
              ? <BsFillVolumeUpFill className=" text-3xl group-hover:text-studion-100" onClick={onClickMute} />
              : <BsFillVolumeMuteFill className=" text-3xl group-hover:text-studion-100" onClick={onClickMute} />
          }
          <div className=" absolute bottom-8 hidden -translate-x-5 group-hover:flex h-48 w-16 bg-white rounded-md shadow-md p-4 justify-center border-[1px] border-gray-300 z-10">
            <VolumeSlider
              valueLabelDisplay="auto"
              aria-label="volume slider"
              defaultValue={100}
              max={120}
              orientation="vertical"
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Controller