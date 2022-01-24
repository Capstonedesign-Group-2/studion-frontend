import AppLayout from "../components/common/AppLayout"
import PlayContainer from "../components/play/PlayContainer"
import { stayLoggedIn } from "../http/auth"
import wrapper from "../redux/store"
import { getRoomList } from "../redux/actions/room"
import { useEffect } from "react"
import Socket from '../socket'
import { useDispatch } from "react-redux"

const Play = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    Socket.onUpdateRoomList(dispatch)
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
  await store.dispatch(getRoomList())
  return { props: {} }
})
