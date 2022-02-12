// imports
import React from 'react'
import Head from 'next/head'

import { OrganizationDashboard } from '../../../components'

// Page init
const Organization = () => {
  return (
    <>
      <Head>
        <title>Organization | Paysure</title>
      </Head>

      <OrganizationDashboard />
    </>
  )
}

// Page export
export default Organization
