import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from 'next-auth/react'
import Header from '../components/Header'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps: {session, ...pageProps} }: any) {
  return (
    <ApolloProvider client={client}>

    
    <SessionProvider session={session} refetchInterval={5*60}>
    <Toaster/>
      <div className='h-screen overflow-y-scroll bg-slate-200'>
        <Header />
        {/* every single page will have the header */}
        <Component {...pageProps} />
      </div>
       

    </SessionProvider>
    </ApolloProvider>
  )
}
// use us to use hooks all over

export default MyApp
