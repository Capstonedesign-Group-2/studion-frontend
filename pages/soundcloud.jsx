import AppLayout from "../components/common/AppLayout"
import SoundCloudContainer from "../components/soundCloud/SoundCloudContainer"
import { stayLoggedIn } from '../http/stay'
import { getPostList } from "../redux/actions/post"
import wrapper from '../redux/store'
import ChatSection from "../components/soundCloud/ChatSection"
import PostList from "../components/soundCloud/PostList"

const SoundCloud = ({ userInfo }) => {
  return (
    <div>
      <AppLayout>
        <div className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="pt-36 pb-56">
                        <h2 className="text-2xl font-medium mb-8">
                            サウンドくも
                        </h2>
                        <div className="flex">
                          <PostList />
                          <ChatSection />
                          {/* 채팅방 */}
                          {/* <div className="bg-gray-100 shadow-md flex-1 mt-4 ml-3" style={{ height: '500px', width:'100px' }}>
                            d
                          </div> */}
                          </div>
                        {/* <Link href="/soundcloud/1">hello</Link> */}
                    </div>
                </div>
            </div>
        </div>
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
