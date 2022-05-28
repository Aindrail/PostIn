import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from 'next-auth/react'
import Header from '../components/Header'

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session} refetchInterval={5*60}>
      <div className='h-screen overflow-y-scroll bg-slate-200'>
        <Header />
        <Component {...pageProps} />
      </div>
       

    </SessionProvider>
  
  )
}
// use us to use hooks all over

export default MyApp
