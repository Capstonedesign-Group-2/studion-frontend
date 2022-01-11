import { useEffect, useRef, useState } from "react"

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
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleKeyPress = (e: KeyboardEvent) => {
    console.log(e.key, pad.letter)
    if (e.key.toUpperCase() === pad.letter) {
      onPlay();
    }
  }

  const onPlay = () => {
    if(audioRef.current) {
      const sound = audioRef.current;
      sound.currentTime = 0;
      sound.volume = volume / 100;
      sound.play();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <div>
      <div
        id={pad.id}
        onClick={onPlay}
      >
        <audio id={pad.letter} 
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