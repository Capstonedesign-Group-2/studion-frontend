import { useState } from "react"

import InstBtn from "./InstBtn"
import DrumComponent from "./drum"
import PianoComponent from "./piano"

const Instlist = [
  { id: 1, type: 'vocal', imgPath: '/images/vocal.svg' },
  { id: 2, type: 'drum', imgPath: '/images/drum.svg' },
  { id: 3, type: 'piano', imgPath: '/images/piano.svg' },
  { id: 4, type: 'guitar', imgPath: '/images/guitar.svg' },
  { id: 5, type: 'bass', imgPath: '/images/bass.svg' },
]

const KeyInstSection = () => {
  const [selectedInst, setSelectedInst] = useState<string>('')

  return (
    <div>
      <h3 className="text-xl font-medium mb-5">
        # Select Virtual Instrument
      </h3>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {Instlist.map(v => (
          <InstBtn key={v.id} type={v.type} imgPath={v.imgPath} selectedInst={selectedInst} setSelectedInst={setSelectedInst} />
        ))}
      </div>
      <div style={{ display: selectedInst === 'drum' ? 'block' : 'none' }}>
        <DrumComponent selectedInst={selectedInst} />
      </div>
      <div style={{ display: selectedInst === 'piano' ? 'block' : 'none' }}>
        <PianoComponent selectedInst={selectedInst} />
      </div>
    </div>
  )
}

export default KeyInstSection