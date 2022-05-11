import { useRef, useState } from "react"
import { AudioFile } from "../room/player/mixer/Recorder"
import Controller from "./Controller"
import Mixer from "./inst/mixer/Mixer"
import KeyInst from "./KeyInst"
import Recorder from "./Recorder"

interface Props
 {
   audioFile: AudioFile
   isLoading: boolean
}

const RecordingContainer: React.FC<Props> = ({ audioFile, isLoading }) => {
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
        <Controller mixerRef={mixerRef} audioFile={audioFile} isLoading={isLoading} setIsPlaying={setIsPlaying} />
      </div>
    </>
  )
}

export default RecordingContainer