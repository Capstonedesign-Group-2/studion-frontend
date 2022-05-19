import { useEffect, useRef, useState } from "react"
import audioMaker from 'audiomaker'
import { MdReplay, MdOutlinePlayCircleFilled, MdOutlinePauseCircleFilled, MdOutlineFileDownload } from 'react-icons/md';
import { FaTrash, FaShareSquare } from 'react-icons/fa';
import styled from "../../../styles/soundCloud/soundCloud.module.scss"
import { AudioFile } from "../player/mixer/Recorder"
import { Modal } from "../../common/modals"
import CreatePost from "../../soundCloud/CreatePost";

interface Props {
  audioFile: AudioFile
  setAudioFiles: React.Dispatch<React.SetStateAction<AudioFile[]>>
}

const AudioEditor = ({ audioFile, setAudioFiles }: Props) => {
  const waveformRef = useRef<HTMLDivElement>(null)
  const wavesurferRef = useRef<any>()
  const regionRef = useRef<any>()
  const audioMakerRef = useRef<any>()
  const [timeSet, setTimeSet] = useState<{ start: number, end: number }>({ start: 0, end: 0 })
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const onPlay = () => {
    if (wavesurferRef.current.isPlaying()) {
      wavesurferRef.current.pause()
      setTimeSet((prev) => ({
        start: wavesurferRef.current.getCurrentTime(),
        end: prev.end
      }))
    } else {
      wavesurferRef.current.play(timeSet.start, timeSet.end)
    }
  }

  const onReplay = () => {
    wavesurferRef.current.play(regionRef.current.start, regionRef.current.end)
  }

  const onDownload = () => {
    if (!audioMakerRef.current || !audioFile) return
    audioMakerRef.current.trim(audioFile.blob, regionRef.current.start, regionRef.current.end).then((blob: Blob) => {
      const path = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = path
      link.download = audioFile.label
      link.click()
      link.remove() // IE 미지원
    });
  }

  const onPublish = () => {
    if (!audioMakerRef.current || !audioFile) return
    audioMakerRef.current.trim(audioFile.blob, regionRef.current.start, regionRef.current.end).then((blob: Blob) => {
      const path = window.URL.createObjectURL(blob)
      let trimedAudioFile: AudioFile = {
        ...audioFile,
        url: path,
        blob
      }
      console.log(blob, audioFile.blob, trimedAudioFile)
      Modal.close()
      Modal.fire({
        html: <CreatePost audioFile={trimedAudioFile} />,
        showConfirmButton: false,
        customClass: { popup: styled.post },
      })
    });
  }

  const onDelete = () => {
    let con = confirm('音源を削除しますか。')
    if (!con) return
    setAudioFiles((prev) => prev.filter(v => v !== audioFile))
    Modal.close()
  }

  const onKeyPress = (e: KeyboardEvent) => {
    if (!wavesurferRef.current) return
    switch (e.code) {
      case 'Space': // 재생 or 정지
        onPlay()
        break
    }
  }

  useEffect(() => {
    const initWaveSurfer = async () => {
      const WaveSurfer = await require('wavesurfer.js')
      const Region = await require('wavesurfer.js/dist/plugin/wavesurfer.regions.min.js')

      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#007E8E',
        progressColor: '#34D399',
        cursorColor: '#34D399',
        plugins: [
          Region.create({
            regions: [
              {
                id: "region",
                color: 'rgba(0, 184, 160, 0.1)'
              }
            ]
          })
        ]
      })

      wavesurferRef.current.on('ready', () => {
        regionRef.current = wavesurferRef.current.regions.list['region']
        regionRef.current.onResize(wavesurferRef.current.getDuration(), 'start')
        setTimeSet({
          start: 0,
          end: wavesurferRef.current.getDuration()
        })

        wavesurferRef.current.on('seek', () => {
          if (wavesurferRef.current.getCurrentTime() > regionRef.current.end) {
            setTimeSet({
              start: wavesurferRef.current.getCurrentTime(),
              end: wavesurferRef.current.end
            })
          } else {
            setTimeSet({
              start: wavesurferRef.current.getCurrentTime(),
              end: regionRef.current.end
            })
          }
        })

        wavesurferRef.current.on('region-updated', () => {
          setTimeSet({
            start: regionRef.current.start,
            end: regionRef.current.end
          })
        })

        // 재생영역을 벗어났을 때
        wavesurferRef.current.on('region-out', () => {
          setTimeSet({
            start: regionRef.current.start,
            end: regionRef.current.end
          })
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

      if (!audioFile) return
      wavesurferRef.current.loadBlob(audioFile.blob)
    }
    initWaveSurfer()
    audioMakerRef.current = new audioMaker()

    return () => {
      if (!wavesurferRef.current) return
      wavesurferRef.current.destroy()
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keypress', onKeyPress)
    return () => {
      document.removeEventListener('keypress', onKeyPress)
    }
  }, [timeSet])

  return (
    <div>
      <div className='shadow-lg border-[1px] border-gray-200 rounded'
        ref={waveformRef}
      ></div>
      <div className='flex gap-4 items-center mt-4'>
        <div className="flex gap-2">
          <div className='flex items-center justify-center border-[1px] border-gray-200 w-8 h-8 shadow-md rounded hover:cursor-pointer'
            onClick={onPlay}
          >
            {isPlaying ? <MdOutlinePauseCircleFilled /> : <MdOutlinePlayCircleFilled />}
          </div>
          <div className='flex items-center justify-center border-[1px] border-gray-200 w-8 h-8 shadow-md rounded hover:cursor-pointer'
            onClick={onReplay}
          >
            <MdReplay />
          </div>
          <div className='flex items-center justify-center border-[1px] border-gray-200 w-8 h-8 shadow-md rounded hover:cursor-pointer'
            onClick={onDownload}
          >
            <MdOutlineFileDownload className="text-xl" />
          </div>
          <div className='flex items-center justify-center border-[1px] border-gray-200 w-8 h-8 shadow-md rounded hover:cursor-pointer'
            onClick={onPublish}
          >
            <FaShareSquare />
          </div>
        </div>
        <p className="text-gray-400">
          {(regionRef.current?.end - regionRef.current?.start).toFixed(1)}s / {wavesurferRef.current?.getDuration().toFixed(1)}s
        </p>
        <div className="flex-1 flex flex-row-reverse">
          <div className='flex items-center justify-center border-[1px] border-gray-200 w-8 h-8 shadow-md rounded hover:cursor-pointer'
            onClick={onDelete}
          >
            <FaTrash className="text-red-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioEditor