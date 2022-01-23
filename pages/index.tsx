import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AppLayout from '../components/common/AppLayout'
import MainSection from '../components/main/MainContainer'
import { stayLoggedIn } from '../http/auth'
import { getUser } from '../redux/actions/user'
import wrapper from '../redux/store'

const Home: NextPage = () => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getUser())
  // })

  return (
    <div>
      <Head>
        <title>Studion</title>
        <meta name="description" content="Online band project main page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        {/* main section */}
        <MainSection />
      </AppLayout>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await stayLoggedIn(context, store);
  return { props: {} }
})

export default Home