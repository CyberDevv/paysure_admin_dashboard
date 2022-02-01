// imports
import React from 'react'
import Head from 'next/head'

import { UserDashboard } from '../../../components'

// Page init
const User = () => {
  return (
    <>
      <Head>
        <title>User | Paysure</title>
      </Head>

      <UserDashboard />
    </>
  )
}

// Page export
export default User
