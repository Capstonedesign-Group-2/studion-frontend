import { AudioFile } from "../player/mixer/Recorder"
import { useEffect, useRef } from "react"

interface Props {
  audioFile: AudioFile
}

const AudioEditor = ({ audioFile }: Props) => {
  const waveformRef = useRef<HTMLDivElement>(null)
  const wavesurferRef = useRef<any>()

  const onKeyPress = (e: KeyboardEvent) => {
    console.log(e.code)
    if (!wavesurferRef.current) return
    switch (e.code) {
      case 'Space': // 재생 or 정지
        wavesurferRef.current.playPause()
        break
    }
  }

  useEffect(() => {
    if (!waveformRef.current) return
    const initWaveSurfer = async () => {
      const WaveSurfer = await require('wavesurfer.js')

      const script = document.createElement("script");

      script.src = "plugin/wavesurfer.regions.js";
      script.async = true;

      document.body.appendChild(script);

      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#007E8E',
        progressColor: '#34D399',
        cursorColor: '#34D399',
      });

      wavesurferRef.current.on('ready', function () {
        wavesurferRef.current.enableDragSelection({})
        wavesurferRef.current.addRegion({
          start: 1,
          end: 3,
          color: 'hsla(100, 100%, 30%, 0.1)'
        })
        // const region = wavesurferRef.current.addRegion({
        //   start: 1,
        //   end: 3,
        //   color: 'hsla(100, 100%, 30%, 0.1)'
        // })
        // console.log(region)
      });

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
  }, [])

  return (
    <div>
      <div ref={waveformRef}></div>
    </div>
  )
}

export default AudioEditor