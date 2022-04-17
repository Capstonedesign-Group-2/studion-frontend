import { useRouter } from "next/router"
import AppLayout from "../../components/common/AppLayout"
import SoundCloudContainer from "../../components/soundCloud/SoundCloudContainer"
import http from "../../http"
import { stayLoggedIn } from '../../http/stay'
import { getUserPostList } from "../../redux/actions/post"
import { getAnotherUserInfo, getFollowData } from "../../redux/actions/another"
import wrapper from '../../redux/store'
import { useSelector } from "react-redux"

const SoundCloud = () => {
  const router = useRouter();
  // const onClickFollow = () => {
  // const userInfo2 = useSelector(state => state.another.userInfo)
  // }
  return (
    <div>
      <AppLayout>
        <SoundCloudContainer userId={router.query.id} />
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
  let queryId = context.query.id
  await store.dispatch(getAnotherUserInfo({ id: queryId }))
  await store.dispatch(getUserPostList({ id: queryId }))
  await store.dispatch(getFollowData({ userInfo: queryId, userData: store.getState().user.data.id }))

  return { props: {} }
})

export default SoundCloud;
