import { useRouter } from "next/router"
import { useEffect } from "react"
import AppLayout from "../../components/common/AppLayout"
import SoundCloudContainer from "../../components/soundCloud/soundCloudContainer"
import http from "../../http"
import { stayLoggedIn } from '../../http/stay'
import { getUserPostList } from "../../redux/actions/post"
import wrapper from '../../redux/store'

const SoundCloud = ({ userInfo }) => {
  const router = useRouter();
  // const onClickFollow = () => {

  // }
  return (
    <div>
      <AppLayout>
        <SoundCloudContainer userId={router.query.id} userInfo={userInfo} />
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
  await store.dispatch(getUserPostList({ id: queryId }))

  try {
    const res = await http.get(`/users/${queryId}`)
    console.log(res.data.user)
    return { props: { userInfo: res.data.user } }
  } catch (err) {
    console.error('[Error] get user data error soundcloud/[id].jsx', err)
  }

  return { props: {} }
})

export default SoundCloud;
