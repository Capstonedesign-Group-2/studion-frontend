import Image from "next/image"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/slices"
import AudioSelect from "./AudioSelect"

interface Props {
  audios: MediaDeviceInfo[]
}

const MyInfoSection = ({ audios }: Props) => {
  const userData = useSelector((state: RootState) => state.user.data)

  return (
    <div className="bg-white shadow-md rounded-md p-5 max-w-screen-sm w-full">
      <div className="flex flex-col items-center md:items-start md:flex-row">
        <div className="w-40 relative">
          {userData?.image
            ? <div className="relative overflow-hidden w-full aspect-square rounded-full"><Image src={userData.image} layout="fill" alt="profile image" /></div>
            : <div className='flex w-full aspect-square rounded-full bg-studion-400 justify-center items-center text-white text-7xl md:text-4xl xl:text-5xl'>
              <p>{userData?.name.slice(0, 2).toUpperCase()}</p>
            </div>
          }
        </div>
        <div className="md:ml-10 w-full">
          <div className="mb-2 md:mb-4">
            <span className="text-xs text-gray-500 -mb-1 block">
              Name
            </span>
            <h3 className="font-medium text-3xl leading-8">
              {userData?.name}
            </h3>
          </div>
          {/* <div className="bg-studion-400 text-ellipsis overflow-hidden">
            <AudioSelect audios={audios} />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default MyInfoSection