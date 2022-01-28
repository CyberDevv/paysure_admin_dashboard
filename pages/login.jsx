import React from 'react'
import Head from 'next/head'

import { LoginDashboard } from '../components'

const login = () => {
  return (
    <>
      <Head>
        <title>Login | Paysure</title>
      </Head>

      <LoginDashboard />
    </>
  )
}

export default login
