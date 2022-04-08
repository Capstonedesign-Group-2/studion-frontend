import type { NextPage } from 'next'
import Head from 'next/head'

import AppLayout from '../components/common/AppLayout'
import MainSection from '../components/main/MainContainer'
import http from '../http'
import { stayLoggedIn } from '../http/stay'
import wrapper from '../redux/store'
import { IPost } from '../types'

interface Props {
  rank: { week: IPost[], month: IPost[] }
}

const Home: NextPage<Props> = ({ rank }) => {
  return (
    <div>
      <Head>
        <title>Studion</title>
        <meta name="description" content="Online band project main page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        {/* main section */}
        <MainSection rank={rank} />
      </AppLayout>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await stayLoggedIn(context, store);

  const rank = {
    week: [],
    month: []
  }

  try {
    const week = await http.get('/posts/rank/week')
    const month = await http.get('/posts/rank/month')
    rank.week = week.data.posts
    rank.month = month.data.posts
  } catch (err) {
    console.error('get rank error', err)
  }

  return { props: { rank } }
})

export default Home