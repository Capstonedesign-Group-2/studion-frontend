import { useRef, useState } from "react"
import Controller from "./Controller"
import Mixer from "./inst/mixer/Mixer"
import KeyInst from "./KeyInst"
import Recorder from "./Recorder"

const RecordingContainer: React.FC = () => {
  const mixerRef = useRef<Mixer>()
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  return (
    <>
      <div className="pb-20 pt-20 px-5 xl:px-16 flex-1 overflow-y-scroll">
        <KeyInst mixerRef={mixerRef} />
      </div>
      <hr />
      <div className="px-5 xl:px-16 pb-8 pt-8">
        <Recorder mixerRef={mixerRef} />
        <Controller audioFile={undefined} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </div>
    </>
  )
}

export default RecordingContainer