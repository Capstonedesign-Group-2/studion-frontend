import Header from "../components/common/Header"
import CommunityContainer from "../components/community/CommunityContainer"
import { stayLoggedIn } from '../http/stay'
import wrapper from '../redux/store'

const Community = () => {
  return (
    <div className="bg-gray-100">
      <Header/>    
      <CommunityContainer/>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await stayLoggedIn(context, store);
  return { props: {} }
})

export default Community
