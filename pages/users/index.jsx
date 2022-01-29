// imports
import React from 'react'
import Head from 'next/head'

import { UsersDashboard } from '../../components'

// Page init
const Users = () => {
  return (
    <>
      <Head>
        <title>Users | Paysure</title>
      </Head>

      <UsersDashboard />
    </>
  )
}

// Page export
export default Users
