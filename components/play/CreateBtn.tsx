import { memo, useCallback } from "react"
import { Modal } from "../common/modals"
import CreateForm from "./CreateForm"

const CreateBtn = () => {
  const onCreateRoom = useCallback(() => {
    Modal.fire({
      title: <p>新しいルームを作る</p>,
      html: (
        <CreateForm Modal={Modal} />
      ),
      showConfirmButton: false,
    })
  }, [])

  return (
    <button className="mt-16 inline-block justify-center items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-studion-500 hover:cursor-pointer hover:bg-studion-400 active:bg-studion-500 transition ease-in-out duration-150"
      onClick={onCreateRoom}
    >
      新しいルーム
    </button>
  )
}

export default memo(CreateBtn)
