import Image from "next/image"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/slices"

const MyInfoSection = () => {
  const userData = useSelector((state: RootState) => state.user.data)

  return (
    <div className="bg-white shadow-md rounded-md p-5 max-w-screen-sm w-full">
      <div className="flex flex-col items-center md:items-start md:flex-row">
        <div className="w-40 relative">
          {userData.image
            ? <Image className="w-full rounded-full" src='/' layout="fill" alt="profile image"/>
            : <div className='flex w-full aspect-square rounded-full bg-studion-400 justify-center items-center text-white text-7xl md:text-4xl xl:text-5xl'>
                <p>{userData.name.slice(0, 2).toUpperCase()}</p>
              </div>
          }
        </div>
        <div className="md:ml-10 w-full">
          <div className="mb-2 md:mb-4">
            <span className="text-xs text-gray-500 -mb-1 block">
              Name
            </span>
            <h3 className="font-medium text-3xl leading-8">
              {userData.name}
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyInfoSection