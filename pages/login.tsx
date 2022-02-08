import Header from "../components/common/Header"
import LoginContainer from "../components/auth/LoginContainer"
import wrapper from "../redux/store"
import { stayLoggedIn } from "../http/stay"

const Login = () => {
  return (
    <div>
      <Header />
      <LoginContainer />
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await stayLoggedIn(context, store)
  if (store.getState().user.data) { // 유저 데이터가 있으면 '/'로 리다이렉트
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return { props: {} }
})

export default Login
