import axios from "axios"
import cookies from "next-cookies"

import AppLayout from "../components/common/AppLayout"
import PlayContainer from "../components/play/PlayContainer"
import { getUser } from "../redux/actions/user"
import wrapper from "../redux/store"

const Play = () => {
  return (
    <AppLayout>
      <PlayContainer/>
    </AppLayout>
  )
}

export default Play

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const allCookies = cookies(ctx)
  const accessTokenByCookie = allCookies['accessToken']
  
  if(accessTokenByCookie !== undefined) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessTokenByCookie}`
    await store.dispatch(getUser())
  }

  return { props: {} }
})
