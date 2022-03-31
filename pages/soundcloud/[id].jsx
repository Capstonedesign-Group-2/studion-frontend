import { useRouter } from "next/router"
import AppLayout from "../../components/common/AppLayout"
import SoundCloudContainer from "../../components/soundCloud/soundCloudContainer"
import { stayLoggedIn } from '../../http/stay'
import { getUserPostList } from "../../redux/actions/post"
import wrapper from '../../redux/store'

const SoundCloud = () => {
  const router = useRouter();
  // const onClickFollow = () => {

  // }
  return (
    <div>
      <AppLayout>
        <SoundCloudContainer userId={router.query.id}/>
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
  await store.dispatch(getUserPostList({ id: context.query.id }))
  return { props: {} }
})

export default SoundCloud;
