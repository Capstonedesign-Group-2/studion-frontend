import axios from 'axios'
import type { NextPage } from 'next'
import cookies from 'next-cookies'
import Head from 'next/head'

import AppLayout from '../components/common/AppLayout'
import MainSection from '../components/main/MainContainer'
import { getUser } from '../redux/actions/user'
import wrapper from '../redux/store'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Studion</title>
        <meta name="description" content="Online band project main page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        {/* main section */}
        <MainSection/>
      </AppLayout>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const allCookies = cookies(ctx)
  const accessTokenByCookie = allCookies['accessToken']
  
  if(accessTokenByCookie !== undefined) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessTokenByCookie}`
    await store.dispatch(getUser())
  }

  return { props: {} }
})

export default Home