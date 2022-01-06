import Header from "../components/common/Header"
import JoinContainer from "../components/auth/JoinContainer"
import wrapper from "../redux/store"
import cookies from "next-cookies"

const Join = () => {
  return (
    <div>
      <Header/>
      <JoinContainer/>
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

export default Join
