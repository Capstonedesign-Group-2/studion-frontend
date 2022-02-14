import { DcData } from "../../types"
import KeyInstSection from "./inst/KeyInstSeciton"
import { PlayPianoHandle } from "./inst/piano"
import Mixer from "./player/mixer/Mixer"
import PlayerSection from "./player/PlayerSection"

interface Props {
  sendDataToAllUsers: (data: DcData) => void
  pianoInst: React.RefObject<PlayPianoHandle>
  mixerRef: React.MutableRefObject<Mixer | undefined>
}

const RoomContainer = ({ sendDataToAllUsers, pianoInst, mixerRef }: Props) => {
  return (
    <div className="pb-20 relative pt-10 px-5 xl:px-16">
      <KeyInstSection
        sendDataToAllUsers={sendDataToAllUsers}
        pianoInst={pianoInst}
        mixerRef={mixerRef}
      />
      <PlayerSection
        mixerRef={mixerRef}
      />
    </div>
  )
}

export default RoomContainer
