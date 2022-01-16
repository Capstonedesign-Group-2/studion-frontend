import axios from "axios"
import cookies from "next-cookies"
import Router from "next/router"
import { useEffect, useState } from "react"

import ChatSection from "../../components/room/menu/ChatSection"
import MyInfoSection from "../../components/room/menu/MyInfoSection"
import RoomInfoSection from "../../components/room/menu/RoomInfoSection"
import RoomContainer from "../../components/room/RoomConatiner"
import RoomHeader from "../../components/room/RoomHeader"
import { getUser } from "../../redux/actions/user"
import wrapper from "../../redux/store"

const Room = () => {
  const [menu, setMenu] = useState<boolean>(true)
  const handleRouteChange = () => {
    console.log('leave room')
  }

  

  // 뒤로가기 등 페이지 이동시 연결해제
	useEffect(() => {
		Router.events.on('routeChangeStart', handleRouteChange);

		return () => {
			Router.events.off('routeChangeStart', handleRouteChange);
		}
	}, []);

  return (
    <div className="bg-gray-50 min-w-screen min-h-screen">
      {/* 헤더 */}
      <RoomHeader setMenu={setMenu} menu={menu}/>

      {/* 메인 */}
      <div className="pt-12 xl:mr-96"
        style={{ marginRight: menu? '' : '0px' }}
      >
        <RoomContainer/>
      </div>

      {/* 메뉴 */}
      {menu && (
        <div className="fixed bg-gray-200 top-12 right-0 flex flex-col items-center shadow-md md:w-96">
          <MyInfoSection/>
          <div className="flex flex-col gap-7 md:px-4 w-full pt-7 min-h-screen">
            <RoomInfoSection/>
            <ChatSection/>
          </div>
        </div>
      )}
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
