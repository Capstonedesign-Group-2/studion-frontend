import { useState } from "react"

import Recorder from "./inst/vocal/Recorder"
import DrumComponent from "./inst/drum/DrumComponent"
import PianoComponent from "./inst/piano/PianoComponents"
import Mixer from "./inst/mixer/Mixer"
import InstBtn from "./InstBtn"

type Props = {
  mixerRef: React.MutableRefObject<Mixer | undefined>
}

export type Inst = {
  id: number
  imgPath: string
  type: string
}

const instList: Inst[] = [
  {
    id: 1,
    imgPath: '/images/recording/vocal.png',
    type: 'mic'
  },
  {
    id: 2,
    imgPath: '/images/recording/drum.png',
    type: 'drum'
  },
  {
    id: 3,
    imgPath: '/images/recording/piano.png',
    type: 'piano'
  },
  {
    id: 4,
    imgPath: '/images/recording/guitar.png',
    type: 'guitar'
  },
  {
    id: 5,
    imgPath: '/images/recording/bass.png',
    type: 'bass'
  }
]

const KeyInst: React.FC<Props> = ({ mixerRef }) => {
  const [selectedInst, setSelectedInst] = useState<string>('')
  return (
    <>
      <h3 className="text-xl font-medium mb-5">
        # Select Virtual Instrument
      </h3>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {
          instList.map(inst => <InstBtn key={inst.id} inst={inst} setSelectedInst={setSelectedInst} />)
        }
      </div>
      <div style={{ display: selectedInst === 'mic' ? 'block' : 'none' }}>
        <Recorder selectedInst={selectedInst} mixerRef={mixerRef} />
      </div>
      <div style={{ display: selectedInst === 'drum' ? 'block' : 'none' }}>
        <DrumComponent selectedInst={selectedInst} mixerRef={mixerRef} />
      </div>
      <div style={{ display: selectedInst === 'piano' ? 'block' : 'none' }}>
        <PianoComponent selectedInst={selectedInst} mixerRef={mixerRef} />
      </div>
    </>
  )
}

export default KeyInst