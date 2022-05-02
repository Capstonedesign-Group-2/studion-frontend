import { useState } from "react"
import Controller from "./Controller"
import KeyInst from "./KeyInst"
import Recorder from "./Recorder"

const RecordingContainer = () => {
  return (
    <>
      <div className="pb-20 pt-20 px-5 xl:px-16 flex-1 overflow-y-scroll">
        <KeyInst />
      </div>
      <hr />
      <div className="px-5 xl:px-16 pb-8 pt-8">
        <Recorder />
        <Controller />
      </div>
    </>
  )
}

export default RecordingContainer