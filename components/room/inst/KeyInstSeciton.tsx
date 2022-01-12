import { useState } from "react"

import InstBtn from "./InstBtn"
import Drum from "./drum"

const Instlist = [
  { id: 1, type: 'vocal' },
  { id: 2, type: 'drum' },
  { id: 3, type: 'piano' },
  { id: 4, type: 'guitar' },
  { id: 5, type: 'bass' },
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
          <InstBtn key={v.id} type={v.type} inst={inst} setInst={setInst}/>
        ))}
      </div>
      {inst === 'drum' && <Drum/>}
    </div>
  )
}

export default KeyInstSection