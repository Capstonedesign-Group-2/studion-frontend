import Image from "next/image"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import http from "../../http"
import { RootState } from "../../redux/slices"
import userSlice from "../../redux/slices/user"
import { IUser } from "../../types"

const ProfileComponent = () => {
  const dispatch = useDispatch()
  const userData = useSelector<RootState, IUser>((state) => state.user.data)
  const [imageSrc, setImageSrc] = useState<string>(userData.image || '')
  const [imageFile, setImageFile] = useState<Blob>()

  const onSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!imageFile) return

    const formData = new FormData()
    formData.append("_method", 'PATCH')
    formData.append('image', imageFile)

    try {
      const res = await http.post(`users/${userData.id}`, formData)
      if (res.data.status === 'success') {
        dispatch(userSlice.actions.setUserData(res.data.user))
      }
    } catch (err) {
      console.error('Update Account info error', err)
    }
  }

  const encodeFileToBase64 = (fileBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result as string);
        resolve
      };
    });
  };

  const onChoosePhoto = (e: React.FormEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files
    console.log(files)
    if (files?.length) {
      encodeFileToBase64(files[0])
      setImageFile(files[0])
    }
  }

  return (
    <article className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Profile
          </h3>
        </div>
      </div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={onSaveProfile}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium leading-5 text-gray-700" htmlFor="name">
                    Avatar
                  </label>
                  <div className="mt-2 flex items-center">
                    <span className="relative inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      {imageSrc
                        ? <Image className="w-full rounded-full" src={imageSrc} layout="fill" alt="profile image" />
                        : <div className='flex w-full aspect-square rounded-full bg-studion-400 justify-center items-center text-white text-xl'>
                          <p>{userData.name.slice(0, 2).toUpperCase()}</p>
                        </div>
                      }
                    </span>
                    <span className="ml-5 rounded-md shadow-sm">
                      <label htmlFor="image">
                        <div className="py-2 px-3 border-[1px] border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 hover:cursor-pointer focus:outline-none focus:border-blue-300 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                          Choose photo
                        </div>
                      </label>
                    </span>
                    <input type="file" name="image" id="image"
                      className="hidden"
                      accept="image/*"
                      onChange={onChoosePhoto}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button type="submit" className=" py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-studion-400 shadow-sm hover:bg-studion-300 focus:outline-none focus:ring focus:ring-blue-400 active:bg-blue-600 transition duration-150 ease-in-out">
                Upload & Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </article>
  )
}

export default ProfileComponent