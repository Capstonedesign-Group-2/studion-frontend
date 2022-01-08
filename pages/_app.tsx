import type { AppContext, AppProps } from 'next/app'
import cookie from 'react-cookies'
import App from 'next/app'
import cookies from 'next-cookies'

import wrapper from '../redux/store'
import '../styles/globals.css'
import { useEffect } from 'react'
import Router from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/slices'

function MyApp({ Component, pageProps }: AppProps) {
  const getUserError = useSelector((state: RootState) => state.user.getUserError)
  useEffect(() => {
    if(getUserError === '401') {
      alert('토큰이 만료되었습니다. 다시 로그인해주세요.')
      cookie.remove('accessToken')
      Router.push('/login')
    }
  }, [getUserError])

  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  const {ctx} = appContext;
  const allCookies = cookies(ctx);
  const accessTokenByCookie = allCookies['accessToken'];
  if(accessTokenByCookie !== undefined) {
    cookie.save('accessToken', accessTokenByCookie, {
      path: '/'
    })
  }

  return {...appProps}
}

export default wrapper.withRedux(MyApp)
