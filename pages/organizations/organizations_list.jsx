// imports
import React from 'react'
import Head from 'next/head'

import { OrganizatonListDashboard } from '../../components'

// Page init
const OrganizatonList = () => {
  return (
    <>
      <Head>
        <title>Organizations List | Paysure</title>
      </Head>

      <OrganizatonListDashboard />
    </>
  )
}

// Page export
export default OrganizatonList
