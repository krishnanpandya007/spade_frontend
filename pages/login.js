import Head from 'next/head'
import React from 'react'

import Login from '../components/Login'

function LoginHome() {
  return (
    <>
      <Head>
        <title>Login | Spade</title>
      </Head>
      <Login />
    </>
  )
}

// Something in this perticuallar sitruaio

export default LoginHome