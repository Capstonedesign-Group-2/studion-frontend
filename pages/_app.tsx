import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import cookie from 'react-cookies'

import { RootState } from '../redux/slices'
import wrapper from '../redux/store'
import { Modal } from '../components/common/modals'
import Router from 'next/router'
import '../styles/globals.css'
import ChatSocket from '../socket/chat'

function MyApp({ Component, pageProps }: AppProps) {
  const getUserError = useSelector<RootState, string>((state) => state.user.getUserError)
  const userData = useSelector<RootState, string>((state) => state.user.data)

  useEffect(() => {
    if (getUserError === 'Request failed with status code 401') {
      Modal.fire({
        icon: 'error',
        text: '토큰이 만료되었습니다. 다시 로그인 해주세요.',
        confirmButtonColor: '#007E8E',
      }).then(() => {
        ChatSocket.socket.removeAllListeners()
        cookie.remove('accessToken')
        Router.push('/login')
      })
    }
  }, [getUserError])

  useEffect(() => {
    if(userData) {
      ChatSocket.onUserRegister()
      ChatSocket.emitUserRegister()
    }
  }, [])

  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
