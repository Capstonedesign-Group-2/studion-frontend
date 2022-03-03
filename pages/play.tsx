import { useDispatch } from "react-redux"

import AppLayout from "../components/common/AppLayout"
import PlayContainer from "../components/play/PlayContainer"
import { stayLoggedIn } from "../http/stay"
import wrapper from "../redux/store"
import { useEffect, useState } from "react"
import Socket from '../socket'
import roomSlice from "../redux/slices/room"
import { IRoom } from "../types"

const Play = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    Socket.onUpdateRoomList(dispatch)

    Socket.socket.on('get_rooms_on', (data: { rooms: IRoom[] }) => {
      console.log(data)
      dispatch(roomSlice.actions.setRoomList(data.rooms))
    })

    Socket.socket.emit('get_rooms')

    return (() => {
      Socket.removeAllListeners()
    })
  }, [])

  return (
    <AppLayout>
      <PlayContainer />
    </AppLayout>
  )
}

export default Play

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await stayLoggedIn(context, store)
  return { props: {} }
})
