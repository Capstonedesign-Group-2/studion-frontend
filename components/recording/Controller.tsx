import { useEffect, useRef, useState } from "react"
import audioMaker from 'audiomaker'
import { AudioFile } from "../room/player/mixer/Recorder"
import { BsFillVolumeUpFill, BsFillRecordFill } from 'react-icons/bs'
import { FaStop, FaPlay } from 'react-icons/fa'
import { VolumeSlider } from "../room/player/mixer/VolumeSlider"

interface Props {
  audioFile: AudioFile
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

const Controller: React.FC<Props> = ({ audioFile }) => {
  const wavesurferRef = useRef<any>()
  const waveformRef = useRef<HTMLDivElement>(null)
  const audioMakerRef = useRef<any>()
  const [timeSet, setTimeSet] = useState<{ start: number, end: number }>({ start: 0, end: 0 })
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  useEffect(() => {
    const initWaveSurfer = async () => {
      const WaveSurfer = await require('wavesurfer.js')

      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        height: 70,
        waveColor: '#007E8E',
        progressColor: '#34D399',
        cursorColor: '#34D399',
      })

      wavesurferRef.current.on('ready', () => {
        setTimeSet({
          start: 0,
          end: wavesurferRef.current.getDuration()
        })

        wavesurferRef.current.on('play', () => {
          setIsPlaying(true)
        })

        wavesurferRef.current.on('pause', () => {
          setIsPlaying(false)
        })

        wavesurferRef.current.on('finish', () => {
          setIsPlaying(false)
        })
      })

      wavesurferRef.current.loadBlob(audioFile ? audioFile.blob : new Blob())
    }
    initWaveSurfer()
    audioMakerRef.current = new audioMaker()

    return () => {
      if (!wavesurferRef.current) return
      wavesurferRef.current.destroy()
    }
  }, [])

  return (
    <div>
      <div className='shadow-lg border-[1px] border-gray-200 rounded-b'
        ref={waveformRef}
      ></div>
      <div className="flex justify-around items-center my-4">
        <div className="flex justify-between items-center">
          <div className="w-8 h-8 flex justify-center items-center mr-4 hover:cursor-pointer" onClick={() => setIsPlaying((prev) => !prev)}>
            {
              isPlaying
                ? <FaStop className="text-2xl text-studion-100" />
                : <FaPlay className="text-xl text-studion-100" />
            }
          </div>
          <div>
            <BsFillRecordFill className="text-3xl text-red-500 hover:cursor-pointer" />
          </div>
        </div>
        <div>{timeSet.start}</div>
        <div className="text-gray-400 text-xl">Music - title</div>
        <div>-{timeSet.end}</div>
        <div className=" relative group hover:cursor-pointer">
          <BsFillVolumeUpFill className=" text-3xl group-hover:text-studion-100" />
          <div className=" absolute bottom-8 -translate-x-5 hidden group-hover:flex h-48 w-16 bg-white rounded-md shadow-md p-4 justify-center border-[1px] border-gray-300 z-10">
            <VolumeSlider
              valueLabelDisplay="auto"
              aria-label="valume slider"
              value={100}
              max={120}
              orientation="vertical"
            // onChange={handleValumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Controller