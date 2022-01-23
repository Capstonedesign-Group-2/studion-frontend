import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Router from 'next/router'
import cookie from 'react-cookies'

import { RootState } from '../redux/slices'
import wrapper from '../redux/store'
import { Modal } from '../components/common/modals'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const getUserError = useSelector((state: RootState) => state.user.getUserError)

  useEffect(() => {
    if (getUserError === '401') {
      cookie.remove('accessToken')
      Modal.fire({
        icon: 'error',
        text: '토큰이 만료되었습니다. 다시 로그인 해주세요.',
        confirmButtonColor: '#007E8E',
      }).then(() => {
        Router.push('/login')
      })
    }
  }, [getUserError])

  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
