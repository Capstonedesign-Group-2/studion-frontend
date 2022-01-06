import Header from "../components/common/Header"
import LoginContainer from "../components/auth/LoginContainer"
import wrapper from "../redux/store"
import cookies from "next-cookies"
import axios from "axios"
import { getUser } from "../redux/actions/user"
import Router from "next/router"

const Login = () => {
  return (
    <div>
      <Header/>
      <LoginContainer/>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const allCookies = cookies(ctx)
  const accessTokenByCookie = allCookies['accessToken']
  
  if(accessTokenByCookie !== undefined) {
    return { // 로그인 상태일 경우 '/' 로 리다이렉트
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return { props: {} }
})

export default Login
