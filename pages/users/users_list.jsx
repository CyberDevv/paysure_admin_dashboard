// imports
import React from 'react'
import Head from 'next/head'

import { UserListDashboard } from '../../components'

// Page init
const UserList = () => {
  return (
    <>
      <Head>
        <title>User List | Paysure</title>
      </Head>

      <UserListDashboard />
    </>
  )
}

// Page export
export default UserList
