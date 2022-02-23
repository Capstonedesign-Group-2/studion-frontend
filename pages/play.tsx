import { useDispatch } from "react-redux"

import AppLayout from "../components/common/AppLayout"
import PlayContainer from "../components/play/PlayContainer"
import { stayLoggedIn } from "../http/stay"
import wrapper from "../redux/store"
import { useEffect } from "react"
import Socket from '../socket'

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
  return { props: {} }
})
