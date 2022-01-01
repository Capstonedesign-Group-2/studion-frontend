import RoomBox from "./RoomBox"

const RoomContainer = () => {
  return (
    <div className="mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-5 gap-x-10 pb-10">
        {
          [1,2,3].map(v => <RoomBox key={v}/>)
        }
      </div>
    </div>
  )
}

export default RoomContainer
