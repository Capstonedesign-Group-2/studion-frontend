const RoomBox = () => {
  return (
    <div className="flex flex-col relative rounded-lg items-center">
      <span className="absolute top-3 left-3 inline-flex items-center px-3 py-0.5 z-10 rounded-full text-sm font-medium leading-5 bg-white text-studion-600 shadow">
        locked
      </span>
      <div className="bg-studion-600 overflow-hidden aspect-video relative rounded-lg w-full shadow-lg">
        <span>
          <div></div>
        </span>
      </div>
      <div className="text-center info shadow-xl flex flex-col w-11/12 justify-center relative bg-white -top-14 rounded-lg z-0 py-5 px-2">
        <a className="px-4">
          <h3 className="text-xl overflow-hidden mb-5 w-full">
            new room
          </h3>
          <div className="h-3 w-full bg-studion-300 rounded-full relative">
            <div className="h-3 bg-studion-600 rounded-full" style={{ width: '70%' }}></div>
          </div>
          <span className="mt-3 text-md font-medium block">
            3 / 4
          </span>
        </a>
      </div>
    </div>
  )
}

export default RoomBox
