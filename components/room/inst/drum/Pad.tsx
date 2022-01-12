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

const Pad = ({ pad, volume }: Props) => {
  const [playing, setPlaying] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key.toUpperCase() === pad.letter) {
      onPlay();
    }
  }, [pad.letter])

  const onPlay = useCallback(() => {
    if(audioRef.current) {
      const sound = audioRef.current
      sound.currentTime = 0
      sound.volume = volume / 100
      sound.play()
      setPlaying(true)
      setTimeout(() => {
        setPlaying(false)
      }, 100)
    }
  }, [volume])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <div className="flex justify-center items-center text-white bg-studion-600 w-24 h-24 rounded-full duration-75"
      style={{ backgroundColor: playing ? '#007E8E' : '', transform: playing ? 'scale(0.9)' : '' }}
    >
      <div
        id={pad.id}
        onClick={onPlay}
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