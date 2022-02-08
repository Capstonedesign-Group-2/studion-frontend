import { forwardRef, ForwardRefRenderFunction, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import Box from '@mui/material/Box'

import { VolumeSlider } from '../../player/mixer/VolumeSlider'
import { DATA, playingStyle, loadBuffer } from './drum'
import { DcData } from "../../../../types"

interface Track {
  letter: string
  buffer: AudioBuffer
}

export interface PlayDrumHandle {
  onPlay: (key: string) => void
}

interface Props {
  selectedInst: string
  sendDataToAllUsers: (data: DcData) => void
}

const DrumComponent: ForwardRefRenderFunction<PlayDrumHandle, Props> = ({ selectedInst, sendDataToAllUsers }, ref) => {
  const [playing, setPlaying] = useState<string[]>([])
  const [tracks, setTracks] = useState<Track[]>([])
  const audioCtxRef = useRef<AudioContext>()
  const gainNode = useRef<GainNode>()

  const handleVolumeChange = useCallback((event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number' && gainNode.current) {
      gainNode.current.gain.value = newValue / 1200
    }
  }, [])

  useImperativeHandle(ref, () => ({
    onPlay: (key: string) => onPlay(key)
  }));

  const onPlay = useCallback((key: string) => {
    if (audioCtxRef.current && gainNode.current) {
      console.log('play drum:', key);
      const audioBufferSourceNode = audioCtxRef.current.createBufferSource()
      audioBufferSourceNode.buffer = tracks.find(v => v.letter === key)!.buffer
      audioBufferSourceNode.connect(gainNode.current).connect(audioCtxRef.current.destination)
      audioBufferSourceNode.start()
    }
    setPlaying((prev) => [...prev, key])
    setTimeout(() => {
      setPlaying((prev) => prev.filter(v => v !== key))
    }, 100)
  }, [tracks])

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const key = e.key.toUpperCase()
    if (tracks.find(v => v.letter === key)) {
      const dcData = {
        type: 'drum',
        key: key
      }
      sendDataToAllUsers(dcData)
      onPlay(key)
    }
  }, [tracks, onPlay, sendDataToAllUsers])

  useEffect(() => {
    audioCtxRef.current = new AudioContext()
    if (audioCtxRef.current) {
      DATA.map(v => {
        loadBuffer(v.url, audioCtxRef.current as AudioContext, function (buffer: AudioBuffer) {
          setTracks((prev) => (prev as Track[]).concat({
            'letter': v.letter,
            'buffer': buffer
          }))
        })
      })
      gainNode.current = audioCtxRef.current.createGain()
      gainNode.current.gain.value = 100 / 1200
    }
  }, [])

  useEffect(() => {
    // 사용자가 드럼을 선택했을때만 키 입력 리슨
    if (selectedInst === 'drum') {
      document.addEventListener('keydown', handleKeyPress)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [selectedInst, handleKeyPress])

  return (
    <div className="flex justify-center mt-12 mb-24">
      <div className="flex items-center gap-4 p-4 bg-studion-600 rounded-md">
        <div className="grid grid-cols-3 gap-2 rounded-l-md">
          {DATA && DATA.map((pad) => (
            <div className="flex justify-center items-center text-white bg-studion-300 w-24 h-24 rounded-md duration-75"
              style={playing.find(v => v === pad.letter) ? playingStyle : {}}
              onClick={() => onPlay(pad.letter)}
              key={pad.id}
            >
              <div id={pad.id}>
                <audio key={pad.id} id={pad.id} src={pad.url}></audio>
                {pad.letter}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col h-full pt-3 justify-between items-center">
          <Box className="h-64">
            <VolumeSlider
              valueLabelDisplay="auto"
              aria-label="volume slider"
              defaultValue={100}
              max={120}
              orientation="vertical"
              onChange={handleVolumeChange}
            />
          </Box>
          <div className="px-3 text-sm rounded bg-gray-200">
            drum
          </div>
        </div>
      </div>
    </div>
  )
}
DrumComponent.displayName = "DrumComponent";

export default forwardRef(DrumComponent)
