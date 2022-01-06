import axios from "axios"
import cookies from "next-cookies"

import ChatSection from "../../components/room/menu/ChatSection"
import MyInfoSection from "../../components/room/menu/MyInfoSection"
import RoomContainer from "../../components/room/RoomConatiner"
import RoomHeader from "../../components/room/RoomHeader"
import { getUser } from "../../redux/actions/user"
import wrapper from "../../redux/store"

const Room = () => {
  return (
    <div className="bg-gray-50 min-w-screen min-h-screen">
      <RoomHeader/>
      <div className="xl:mr-96">
        <RoomContainer/>
      </div>
      <div className="fixed hidden top-12 right-0 xl:flex flex-col shadow-md w-96">
        <MyInfoSection/>
        <div className="md:px-4 w-full pt-7 min-h-screen">
          <ChatSection/>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const allCookies = cookies(ctx)
  const accessTokenByCookie = allCookies['accessToken']
  
  if(accessTokenByCookie !== undefined) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessTokenByCookie}`
    await store.dispatch(getUser())
  }

  return { props: {} }
})

export default Room
