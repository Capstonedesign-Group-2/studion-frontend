import AppLayout from "../../components/common/AppLayout"
import { stayLoggedIn } from '../../http/stay'
// import ShowContainer from '../../components/soundCloud/showContainer'
// import { getPostList } from "../redux/actions/post"
import wrapper from '../../redux/store'

const Show = () => {
  return (
    <div>
      <AppLayout>
        {/* <ShowContainer /> */}
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
