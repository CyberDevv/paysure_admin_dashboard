import React from 'react'
import Head from 'next/head'

import { SignupDashboard } from '../components'

const SignUp = () => {
  return (
    <>
      <Head>
        <title>Signup | Paysure</title>
      </Head>

      <SignupDashboard />
    </>
  )
}

export default SignUp
