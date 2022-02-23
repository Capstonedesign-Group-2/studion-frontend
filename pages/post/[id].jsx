import AppLayout from "../../components/common/AppLayout"
import { stayLoggedIn } from '../../http/stay'
import SoundCloudContainer from '../../components/soundCloud/soundCloudContainer'
// import { getPostList } from "../redux/actions/post"
import wrapper from '../../redux/store'

const Show = () => {
  return (
    <div>
      <AppLayout>
        {/* <SoundCloudContainer /> */}
      </AppLayout>
    </div>
  )
} 

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await stayLoggedIn(context, store);
  // await store.dispatch(getPostList())
  return { props: {} }
})

export default Show;
