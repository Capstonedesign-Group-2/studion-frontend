import InstBtn from "./InstBtn"

const Instlist = [
  { id: 1, type: 'vocal' },
  { id: 2, type: 'drum' },
  { id: 3, type: 'piano' },
  { id: 4, type: 'guitar' },
  { id: 5, type: 'bass' },
]

const KeyInstSection = () => {
  return (
    <div>
      <h3 className="text-xl font-medium mb-5">
        # Select Virtual Instrument
      </h3>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {Instlist.map(v => (
          <InstBtn key={v.id} type={v.type}/>
        ))}
      </div>
    </div>
  )
}

export default KeyInstSection