import AppLayout from "../components/common/AppLayout"
import { stayLoggedIn } from '../http/stay'
import { getPostList } from "../redux/actions/post"
import wrapper from '../redux/store'

const Relay = () => {
  return (
    <div>
      <AppLayout>
        hello
      </AppLayout>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await stayLoggedIn(context, store);
  if (!store.getState().user.data) { // 유저 데이터가 없으면 '/login'로 리다이렉트
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  await store.dispatch(getPostList())
  return { props: {} }
})

export default Relay;
