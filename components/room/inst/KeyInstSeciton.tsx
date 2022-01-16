import { useState } from "react"

import InstBtn from "./InstBtn"
import Drum from "./drum"

const Instlist = [
  { id: 1, type: 'vocal', imgPath: '/images/vocal.svg' },
  { id: 2, type: 'drum', imgPath: '/images/drum.svg' },
  { id: 3, type: 'piano', imgPath: '/images/piano.svg' },
  { id: 4, type: 'guitar', imgPath: '/images/guitar.svg' },
  { id: 5, type: 'bass', imgPath: '/images/bass.svg' },
]

const KeyInstSection = () => {
  const [inst, setInst] = useState<string>('')

  return (
    <div>
      <h3 className="text-xl font-medium mb-5">
        # Select Virtual Instrument
      </h3>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {Instlist.map(v => (
          <InstBtn key={v.id} type={v.type} imgPath={v.imgPath} inst={inst} setInst={setInst}/>
        ))}
      </div>
      {inst === 'drum' && <Drum/>}
    </div>
  )
}

export default KeyInstSection