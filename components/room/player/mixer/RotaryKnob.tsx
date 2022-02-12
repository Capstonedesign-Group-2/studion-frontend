import { useEffect, useRef, useState } from "react"
import { Channel } from "./Mixer"

interface Props {
  label: string
  channel: Channel
}

const RotaryKnob = ({ label, channel }: Props) => {
  const knobRef = useRef<HTMLButtonElement>(null)
  const degreeRef = useRef<number>(0)
  const [deg, setDeg] = useState<number>(0)

  const onMouseMove = (evt: MouseEvent) => {
    if (!knobRef.current) return

    let el = knobRef.current,
      center_x,
      center_y,
      mouse_x,
      mouse_y,
      radians,
      degreeRatio

    center_x = (el.getBoundingClientRect().left) + (el.offsetWidth / 2)
    center_y = (el.getBoundingClientRect().top) + (el.offsetHeight / 2)
    mouse_x = evt.pageX
    mouse_y = evt.pageY
    radians = Math.atan2(mouse_x - center_x, mouse_y - center_y)
    degreeRef.current = (radians * (180 / Math.PI) * -1)
    if (degreeRef.current < 0) {
      degreeRef.current = degreeRef.current + 360
    }
    if (degreeRef.current >= 0 && degreeRef.current <= 360) {
      degreeRatio = ((degreeRef.current - 180) * 130 / 180)
      setDeg(parseInt(degreeRatio.toString()))
      channel.setPan(parseInt(degreeRatio.toString()) / 130)
    }
  }

  const onMouseDown = () => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp)
  }

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp)
  }

  useEffect(() => {
    knobRef.current?.addEventListener('mousedown', onMouseDown)

    return () => {
      knobRef.current?.removeEventListener('mousedown', onMouseDown)
    }
  }, [])

  return (
    <div className="flex flex-col justify-center items-center">
      <p className='text-studion-100'>▾</p>
      <div className='relative flex justify-center items-center h-12 aspect-square rounded-full bg-gray-700'>
        <div className="absolute bg-studion-100 h-[2px] w-2 rotate-45 translate-x-6 translate-y-5"></div>
        <div className="absolute bg-studion-100 h-[2px] w-2 -rotate-45 -translate-x-6 translate-y-5"></div>
        <button ref={knobRef}>
          <div className='flex justify-center h-10 aspect-square rounded-full bg-gray-800 shadow-studion-400 shadow'
            style={{ transform: 'rotate(' + deg + 'deg)' }}
          >
            <div className='mt-1 bg-studion-100 h-2 aspect-square rounded-full'></div>
          </div>
        </button>
      </div>
      <label className="mt-2 text-white text-sm text-center hover:cursor-pointer">
        {label}
      </label>
    </div>
  )
}

export default RotaryKnob