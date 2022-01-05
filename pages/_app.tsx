import type { AppContext, AppProps } from 'next/app'
import cookie from 'react-cookies'
import App from 'next/app'
import cookies from 'next-cookies'

import wrapper from '../redux/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
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
