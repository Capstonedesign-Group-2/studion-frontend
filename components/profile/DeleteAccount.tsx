import React from "react"

const DeleteAccount = () => {
  const onDeleteAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <article className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-red-500">
            Delete Account
          </h3>
        </div>
      </div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={onDeleteAccount}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div>
                <label htmlFor="block text-sm leading-5 text-gray-700">
                  {"This is a permanent action and it can't be undone."}
                  <br />
                  {"After you delete your account "}
                  <b>no one</b>
                  {" will be able to recover it."}
                </label>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex-col md:flex-row flex justify-between items-end md:items-center">
              <div className="flex items-start md:items-center mb-5 md:mb-0">
                <input type="checkbox" id="deleteAgree" name="dleteAgree"
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <label htmlFor="deleteAgree" className="ml-2 block text-sm leading-5 text-gray-900">
                  {"I understand this action is "}
                  <b>permanent</b>
                  {" and no one will be able to undo it."}
                </label>
              </div>
              <span className="inline-flex md:justify-center justify-end rounded-md shadow-sm">
                <button type="submit" className="shadow inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-blue-700 focus:ring  focus:ring-blue-400  active:bg-blue-700 transition duration-150 ease-in-out  pointer-events-none opacity-25">
                  Delete Account
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </article>
  )
}

export default DeleteAccount