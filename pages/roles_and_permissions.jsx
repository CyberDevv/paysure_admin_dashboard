// imports
import React from 'react'
import Head from 'next/head'

import { Roles_and_PermissionsDashboard } from '../components'

// Page init
const Roles_and_Permissions = () => {
  return (
    <>
      <Head>
        <title>Roles and Permissions | Paysure</title>
      </Head>

      <Roles_and_PermissionsDashboard />
    </>
  )
}

// Page export
export default Roles_and_Permissions
