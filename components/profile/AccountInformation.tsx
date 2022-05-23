const AccountInformation = () => {
  const onSaveInformation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  // 페이지 넘어가기전에 비밀번호 체크
  // email name password profileImage PATCH

  return (
    <article className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Account Information
          </h3>
        </div>
      </div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={onSaveInformation}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium leading-5 text-gray-700" htmlFor="name">
                    Name
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input type="text" name="name" id="name"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium leading-5 text-gray-700" htmlFor="position">
                    Position
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input type="text" name="position" id="position"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium leading-5 text-gray-700" htmlFor="position">
                    Password
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input type="password" name="password" id="password"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium leading-5 text-gray-700" htmlFor="position">
                    Password Confirm
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input type="password" name="passwordConfirm" id="passwordConfirm"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button type="submit" className=" py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-studion-400 shadow-sm hover:bg-studion-300 focus:outline-none focus:ring focus:ring-blue-400 active:bg-blue-600 transition duration-150 ease-in-out">Save</button>
            </div>
          </div>
        </form>
      </div>
    </article>
  )
}

export default AccountInformation