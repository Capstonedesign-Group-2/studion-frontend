import Link from "next/link"
import Router from "next/router"
import React, { memo, useCallback } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/slices"
import { IRoom, IUser } from "../../types"

import { Modal } from "../common/modals"
import EnterForm from "./EnterForm"

const RoomBox = ({ room }: { room: IRoom }) => {
  const userData = useSelector<RootState, IUser>(state => state.user.data)

  const redirectLogin = () => {
    Modal.close()
    Router.push('login')
  }

  const onShowRoom = useCallback(() => {
    if (!userData?.id) {
      Modal.fire({
        icon: 'error',
        title: 'ログインしてください！',
        text: 'ログインが必要なサービスです。',
        footer: <p onClick={redirectLogin} className="text-studion-400 hover:cursor-pointer">ログイン →</p>,
        showConfirmButton: false,
      })
    } else {
      Modal.fire({
        title: <p>{room.title}</p>,
        html: <EnterForm room={room} />,
        showConfirmButton: false,
      })
    }
  }, [room, userData])

  return (
    <div className="flex flex-col relative rounded-lg items-center group hover:cursor-pointer"
      onClick={onShowRoom}
    >
      {room.locked === 1 &&
        <span className="absolute top-3 left-3 inline-flex items-center px-3 py-0.5 z-10 rounded-full text-sm font-medium leading-5 bg-white text-studion-600 shadow">
          Locked
        </span>
      }
      <div className="bg-studion-600 overflow-hidden aspect-video relative rounded-lg w-full shadow-lg">
        <span className="w-full h-full flex justify-center items-center">
          <div className="text-white text-3xl md:text-2xl group-hover:scale-125 duration-150 -translate-y-4 ">
            {room.title}
          </div>
        </span>
      </div>
      <div className="text-center info shadow-xl flex flex-col w-11/12 justify-center relative bg-white -top-14 rounded-lg z-0 py-5 px-2 group-hover:-translate-y-4 duration-150">
        <a className="px-4">
          <h3 className="text-xl overflow-hidden mb-5 w-full">
            参加者：{room.users.length}名
          </h3>
          <div className="h-3 w-full bg-studion-300 rounded-full relative">
            <div className="h-3 bg-studion-600 rounded-full" style={{ width: `${(room.users.length / room.max) * 100}%` }}></div>
          </div>
          <span className="mt-3 text-md font-medium block">
            {`${room.users.length} / ${room.max}`}
          </span>
        </a>
      </div>
    </div>
  )
}

export default memo(RoomBox)
