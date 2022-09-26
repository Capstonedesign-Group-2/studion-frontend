import useTranslation from "next-translate/useTranslation"
import { memo, useCallback } from "react"
import { Modal } from "../common/modals"
import CreateForm from "./CreateForm"

const CreateBtn = () => {
  const { t } = useTranslation("play")
  const langs = {
    create_room_name: t("create_room_name"),
    create_room_password: t("create_room_password"),
    create_room_info: t("roomInfo"),
    create_room_max: t("create_room_max"),
    create_room_btn: t("create_room_btn")

  }
  const onCreateRoom = useCallback(() => {
    Modal.fire({
      title: <p>{t("create_room_title")}</p>,
      html: (
        <CreateForm Modal={Modal} langs={langs}/>
      ),
      showConfirmButton: false,
    })
  }, [])

  return (
    <button className="mt-16 inline-block justify-center items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-studion-500 hover:cursor-pointer hover:bg-studion-400 active:bg-studion-500 transition ease-in-out duration-150"
      onClick={onCreateRoom}
    >
      {t("create_room_btn")}
    </button>
  )
}

export default memo(CreateBtn)
