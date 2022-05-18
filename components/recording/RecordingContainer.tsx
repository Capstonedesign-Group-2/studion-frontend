import { Dispatch, SetStateAction, useRef, useState } from "react"
import { AudioFile } from "../room/player/mixer/Recorder"
import Controller from "./Controller"
import Mixer from "./inst/mixer/Mixer"
import KeyInst from "./KeyInst"
import Recorder from "./Recorder"

interface Props {
  audioFile: AudioFile
  setAudioFile: Dispatch<SetStateAction<AudioFile>>
  setAudioFiles: Dispatch<SetStateAction<AudioFile[]>>
  setNav: Dispatch<SetStateAction<boolean>>
  isLoading: boolean
}

const RecordingContainer: React.FC<Props> = ({ audioFile, setAudioFile, setAudioFiles, isLoading, setNav }) => {
  const mixerRef = useRef<Mixer>()
  
  return (
    <>
      <div className="pb-20 pt-20 px-5 xl:px-16 flex-1 overflow-y-scroll">
        <KeyInst mixerRef={mixerRef} />
      </div>
      <hr />
      <div className="px-5 xl:px-16 pb-8 pt-8 grid grid-cols-5 gap-4">
        <Recorder
          mixerRef={mixerRef}
          setNav={setNav}
          audioFile={audioFile}
          // setAudioFile={setAudioFile}
          // audioFiles={audioFiles}
          setAudioFiles={setAudioFiles}
          isLoading={isLoading} />
        <Controller
          mixerRef={mixerRef}
          audioFile={audioFile}
          setAudioFile={setAudioFile}
          // audioFiles={audioFiles}
          // setAudioFiles={setAudioFiles}
          isLoading={isLoading}
        />
      </div>
    </>
  )
}

export default RecordingContainer