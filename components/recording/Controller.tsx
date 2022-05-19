import React, { Dispatch, MutableRefObject, SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import audioMaker from 'audiomaker'
import { AudioFile } from "../room/player/mixer/Recorder"
import { BsFillVolumeUpFill, BsFillRecordFill, BsFillVolumeMuteFill } from 'react-icons/bs'
import { FaStop, FaPlay, FaPause } from 'react-icons/fa'
import { VolumeSlider } from "../room/player/mixer/VolumeSlider"
import Loader from "../common/Loader"
import Mixer from './inst/mixer/Mixer'
import { Wave } from "./Wave"
import DragDrop from "./DragDrop"


type Props = {
  audioFile: AudioFile
  setAudioFile: Dispatch<SetStateAction<AudioFile>>
  // setAudioFiles: Dispatch<SetStateAction<AudioFile[]>>
  isLoading: boolean
  mixerRef: MutableRefObject<Mixer | undefined>
}
type GetTime = {
  (ref: any, now: number) : any,
  (ref: any, now: number, end: number) : any,
}
const Controller: React.FC<Props> = ({ audioFile, isLoading, mixerRef, setAudioFile }) => {
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

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    if(typeof newValue === 'number') {
      mixerRef.current?.setMasterGain(newValue / 120)
      waveRef.current?.setGain(newValue / 120)
      wavesurferRef.current.setVolume(newValue / 120)
    }
  }
  const handleKeyDown = (event: KeyboardEvent) => {
    if(event.key === " ") {
      onClickPlay()
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
    if(!isPlaying && audioFile) {
      wavesurferRef.current.play()
      waveRef.current?.onPlay(wavesurferRef.current.getCurrentTime())
    } else {
      wavesurferRef.current?.pause()
      waveRef.current?.onStop(wavesurferRef.current?.getCurrentTime())

    }
  }
  const onClickStop = () => {
    if(isPlaying) setIsPlaying((prev) => !prev)
    wavesurferRef.current?.stop()
    waveRef.current?.onStop(wavesurferRef.current?.getCurrentTime())
  }
  const onClickMute = () => {
    // false -> mute / true -> on
    setMute((prev) => !prev)
    mixerRef.current?.setMasterMute(!isMute);
    wavesurferRef.current.setVolume(!isMute)
    waveRef.current?.setGain(!isMute)
  }

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
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isPlaying])
  return (
    <div className="col-span-4 flex flex-col justify-center">
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
      <div className="flex justify-around items-center mt-6">
        <div className="flex justify-between items-center">
          <div className="w-8 h-8 flex justify-center items-center mr-4 hover:cursor-pointer" onClick={() => onClickPlay()}>
            {
              isPlaying && audioFile
                ? <FaPause className="text-2xl text-studion-100" />
                : <FaPlay className="text-xl text-studion-100" />
            }
          </div>
          <div onClick={() => onClickStop()}>
              <FaStop className="text-2xl text-studion-100 hover:cursor-pointer" />
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