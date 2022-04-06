import Image from "next/image"
import { memo } from "react"
import { useSelector } from "react-redux"

import { RootState } from "../../redux/slices"
import CreateBtn from "./CreateBtn"

const UserProfileBox = () => {
  const userData = useSelector((state: RootState) => state.user.data)

  if (!userData) return null

  return (
    <div className="flex flex-col items-center xl:flex-row justify-between xl:items-end">
      <div className="w-full md:w-1/2">
        <div className="bg-white shadow-md rounded-md p-5 max-w-screen-sm w-full">
          <div className="flex flex-col items-center md:items-start md:flex-row">
            <div className="w-40 relative">
              {userData.image
                ? <Image className="w-full rounded-full" src='/' layout="fill" alt="profile image" />
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
              <div className="items-center grid grid-cols-2 mt-1">
                <div>
                  <span className="text-xs text-gray-500 block">
                    Following
                  </span>
                  <h4>{userData.followings}</h4>
                </div>
                <div className="ml-8">
                  <span className="text-xs text-gray-500 block">
                    Follower
                  </span>
                  <h4>{userData.followers}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-center w-full md:w-1/2 ">
            <a className="inline-flex w-full items-center justify-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:cursor-pointer hover:text-gray-500 focus:outline-none focus:border-studion-300 focus:ring focus:ring-studion-400 active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
              Edit profile
            </a>
            <a className="ml-3 inline-flex w-full justify-center items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-studion-500 hover:cursor-pointer hover:bg-studion-400 active:bg-studion-500 transition ease-in-out duration-150">
              See profile
            </a>
          </div>
        </div>
      </div>
      <CreateBtn />
    </div>
  )
}

export default memo(UserProfileBox)
