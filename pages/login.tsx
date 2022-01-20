import cookies from "next-cookies"

import Header from "../components/common/Header"
import LoginContainer from "../components/auth/LoginContainer"
import wrapper from "../redux/store"

const Login = () => {
  return (
    <div>
      <Header />
      <LoginContainer />
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const allCookies = cookies(ctx)
  const accessTokenByCookie = allCookies['accessToken']

  if (accessTokenByCookie !== undefined) {
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
