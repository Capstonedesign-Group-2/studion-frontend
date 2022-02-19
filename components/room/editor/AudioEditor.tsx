import { AudioFile } from "../player/mixer/Recorder"
import { useEffect, useRef, useState } from "react"
import Loader from "../../common/Loader"

interface Props {
  audioFile: AudioFile
}

const AudioEditor = ({ audioFile }: Props) => {
  const waveformRef = useRef<HTMLDivElement>(null)
  const wavesurferRef = useRef<any>()
  const regionRef = useRef<any>()
  const [timeSet, setTimeSet] = useState<{ start: number, end: number }>({ start: 0, end: 0 })

  const onSpace = () => {
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

  const onKeyPress = (e: KeyboardEvent) => {
    if (!wavesurferRef.current) return
    switch (e.code) {
      case 'Space': // 재생 or 정지
        onSpace()
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
      })

      wavesurferRef.current.loadBlob(audioFile.blob)
    }
    initWaveSurfer()

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
          <div className='flex items-center justify-center border-[1px] border-gray-200 w-8 h-8 shadow-md rounded'>
            ▶️
          </div>
          <div className='flex items-center justify-center border-[1px] border-gray-200 w-8 h-8 shadow-md rounded'>
            🔁
          </div>
          <div className='flex items-center justify-center border-[1px] border-gray-200 w-8 h-8 shadow-md rounded'>
            <a href="">⏏️</a>
          </div>
          <div className='flex items-center justify-center border-[1px] border-gray-200 w-8 h-8 shadow-md rounded'>
            🗑️
          </div>
        </div>
        <p className="text-gray-400">
          {(regionRef.current?.end - regionRef.current?.start).toFixed(1)}s / {wavesurferRef.current?.getDuration().toFixed(1)}s
        </p>
      </div>
    </div>
  )
}

export default AudioEditor