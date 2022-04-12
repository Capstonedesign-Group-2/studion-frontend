import AppLayout from "../components/common/AppLayout"
import SoundCloudContainer from "../components/soundCloud/SoundCloudContainer"
import { stayLoggedIn } from '../http/stay'
import { getAnotherUserInfo } from "../redux/actions/another"
import { getPostList } from "../redux/actions/post"
import wrapper from '../redux/store'

const SoundCloud = ({ userInfo }) => {
  return (
    <div>
      <AppLayout>
        <SoundCloudContainer userInfo={userInfo} />
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
  return { props: { userInfo: store.getState().user.data } }
})

export default SoundCloud;
