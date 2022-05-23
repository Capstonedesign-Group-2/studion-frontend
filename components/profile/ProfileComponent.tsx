const ProfileComponent = () => {

  const onSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const onChoosePhoto = () => {

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
                    <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      {/* <Image></Image> */}
                    </span>
                    <span className="ml-5 rounded-md shadow-sm">
                      <div onClick={onChoosePhoto} className="py-2 px-3 border-[1px] border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 hover:cursor-pointer focus:outline-none focus:border-blue-300 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                        Choose photo
                      </div>
                    </span>
                    <input type="file" name="avatar" id="avatar"
                      className="hidden"
                      accept="image/*"
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