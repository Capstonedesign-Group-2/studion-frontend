import UserProfileBox from "./UserProfileBox"
import RoomList from './RoomList'
import { memo } from "react"
import useTranslation from "next-translate/useTranslation"

const PlayContainer = () => {
  const { t } = useTranslation("play")
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="pt-36 pb-56">
            <h2 className="text-2xl font-medium mb-8">
              {t("title")}
            </h2>
            <UserProfileBox />
            <RoomList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(PlayContainer)
