const RoomHeader = () => {
  return (
    <header className="w-full">
      <div className="absolute top-4 bg-studion-600 w-5/12 h-12 rounded-r-full"></div>
      <div className="relative top-4 h-12 flex items-center justify-between mx-auto max-w-screen-xl px-2 sm:px-6 lg:px-8">
        <div className="text-white text-xl sm:text-2xl">
          New Room
        </div>
        <button className="h-12 aspect-video rounded-xl leading-5 text-white bg-studion-500 hover:cursor-pointer hover:bg-studion-400 active:bg-studion-600 transition ease-in-out duration-150">
          Exit
        </button>
      </div>
    </header>
  )
}

export default RoomHeader