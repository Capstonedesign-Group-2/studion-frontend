import { DcData } from "../../types"
import { PlayDrumHandle } from "./inst/drum"
import KeyInstSection from "./inst/KeyInstSeciton"
import { PlayPianoHandle } from "./inst/piano"
import PlayerSection from "./player/PlayerSection"

interface Props {
  sendDataToAllUsers: (data: DcData) => void
  drumInst: React.RefObject<PlayDrumHandle>
  pianoInst: React.RefObject<PlayPianoHandle>
}

const RoomContainer = ({ sendDataToAllUsers, drumInst, pianoInst }: Props) => {
  return (
    <div className="pb-20 relative pt-10 px-5 xl:px-16">
      <KeyInstSection
        sendDataToAllUsers={sendDataToAllUsers}
        drumInst={drumInst}
        pianoInst={pianoInst}
      />
      <PlayerSection />
    </div>
  )
}

export default RoomContainer
