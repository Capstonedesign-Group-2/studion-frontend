import { useCallback, useEffect, useRef, useState } from "react"

interface Props {
  pad: {
    letter: string
    keycode: number
    id: string
    url: string
  }
  volume: number
}

const playingStyle = {
  backgroundColor: '',
  borderBottom: '6px solid #34D399',
  transform: 'scale(0.95)'
}

const Pad = ({ pad, volume }: Props) => {
  const [playing, setPlaying] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key.toUpperCase() === pad.letter) {
      // console.log(volume)
      // datachannel로 { type: drum, volume } 등 보내기
      onPlay(volume);
    }
  }, [volume, pad.letter])

  const onPlay = useCallback((volume: number) => {
    if(audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.volume = volume / 100
      audioRef.current.play()
      setPlaying(true)
      setTimeout(() => {
        setPlaying(false)
      }, 100)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [volume])

  return (
    <div className="flex justify-center items-center text-white bg-studion-600 w-24 h-24 rounded-md duration-75"
      style={playing ? playingStyle : {}}
    >
      <div
        id={pad.id}
        onClick={() => onPlay(volume)}
      >
        <audio 
          id={pad.letter}
          src={pad.url}
          ref={audioRef}
        >
        </audio>
        {pad.letter}
      </div>
    </div>
  )
}

export default Pad