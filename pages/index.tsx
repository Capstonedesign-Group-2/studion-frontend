import type { NextPage } from 'next'
import Head from 'next/head'
import AppLayout from '../components/common/AppLayout'

import MainSection from '../components/main/MainContainer'

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

export default Home
