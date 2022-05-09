import Image from "next/image"
import React from "react"
import { Inst } from './KeyInst'

type Props = {
  inst: Inst
  setSelectedInst: React.Dispatch<React.SetStateAction<string>>
}

const InstBtn: React.FC<Props> = ({ inst, setSelectedInst }) => {
  return (
    <div className="flex flex-col relative rounded-lg items-center group hover:cursor-pointer"
      onClick={() => setSelectedInst(inst.type)}
    >
      <div className="bg-studion-600 overflow-hidden aspect-video relative rounded-lg w-full shadow-lg">
        <span className="flex justify-center items-center h-full">
          <div className="w-9/12 relative aspect-video group-hover:scale-110 duration-150 -translate-y-4">
            <Image src={inst.imgPath} alt="inst image" layout="fill"></Image>
          </div>
        </span>
      </div>
      <div className="text-center shadow-xl flex flex-col w-11/12 justify-center relative bg-white -top-9 rounded-lg z-0 py-5 px-2 group-hover:-translate-y-4 duration-150">
        <a className="px-4">
          <h3 className="text-xl overflow-hidden w-full">
            {inst.type}
          </h3>
        </a>
      </div>
    </div>
  )
}

export default InstBtn