import axios from "axios"
import cookies from "next-cookies"
import Router from "next/router"
import { useEffect } from "react"

import ChatSection from "../../components/room/menu/ChatSection"
import MyInfoSection from "../../components/room/menu/MyInfoSection"
import RoomContainer from "../../components/room/RoomConatiner"
import RoomHeader from "../../components/room/RoomHeader"
import { getUser } from "../../redux/actions/user"
import wrapper from "../../redux/store"

const Room = () => {
  const handleRouteChange = () => {
    console.log('leave room')
  }

	useEffect(() => {
		// 뒤로가기 등 페이지 이동시 연결해제
		Router.events.on('routeChangeStart', handleRouteChange);

		return () => {
			Router.events.off('routeChangeStart', handleRouteChange);
		}
	}, []);

  return (
    <div className="bg-gray-50 min-w-screen min-h-screen">
      <RoomHeader/>
      <div className="pt-12 xl:mr-96">
        <RoomContainer/>
      </div>
      <div className="fixed hidden bg-gray-200 top-12 right-0 xl:flex flex-col shadow-md w-96">
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
