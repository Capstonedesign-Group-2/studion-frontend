import { useCallback } from "react"

interface Props {
  type: string
  inst: string
  setInst: React.Dispatch<React.SetStateAction<string>>
}

const InstBtn = ({ type, inst, setInst }: Props) => {
  const selectInst = useCallback(() => {
    if(inst === type) {
      setInst('')
    } else {
      setInst(type)
    }
  }, [inst, type])

  return (
    <div className="flex flex-col relative rounded-lg items-center group hover:cursor-pointer"
      onClick={selectInst}
    >
      <div className="bg-studion-600 overflow-hidden aspect-video relative rounded-lg w-full shadow-lg">
        <span className="flex justify-center items-center">
          <div className="text-white text-3xl md:text-2xl group-hover:scale-125 duration-150 -translate-y-4 ">
          </div>
        </span>
      </div>
      <div className="text-center shadow-xl flex flex-col w-11/12 justify-center relative bg-white -top-9 rounded-lg z-0 py-5 px-2 group-hover:-translate-y-4 duration-150">
        <a className="px-4">
          <h3 className="text-xl overflow-hidden w-full">
            { type }
          </h3>
        </a>
      </div>
    </div>
  )
}

export default InstBtn