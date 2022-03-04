import { stayLoggedIn } from '../../http/stay'
import ChatContainer from "../../components/soundCloud/chat/ChatContainer"
import Header from "../../components/soundCloud/chat/Header"
import wrapper from '../../redux/store'
import { useState } from "react"
import ChatList from "../../components/soundCloud/chat/ChatList"
import { useSelector } from 'react-redux'
const Show = () => {
  const [list, setList] = useState(false);
  const userData = useSelector(state => state.user.data);
  return (
    <div>
      <Header setList={setList} list={list}/>
      <div className='pt-14 h-screen max-h-screen w-full border-2'>
        <div className='flex h-full w-full relative'>
          <dir className="max-w-md w-full mx-auto">
            <ChatContainer />
          </dir>
        
          {list &&
                <ChatList userData={userData}/>
              }
        </div>
      </div>
    </div>
  )
} 

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await stayLoggedIn(context, store);
  // await store.dispatch(getPostList())
  return { props: {} }
})

export default Show;
