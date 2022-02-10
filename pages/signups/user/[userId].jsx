// imports
import React from 'react'
import Head from 'next/head'

import { NewUsersSignupsDashboard } from '../../../components'

// Page init
const UsersSignups = () => {
  return (
    <>
      <Head>
        <title>New Users | Paysure</title>
      </Head>

      <NewUsersSignupsDashboard />
    </>
  )
}

// Page export
export default UsersSignups
