// imports
import React from 'react'
import Head from 'next/head'

import { OrganizationServicesDashboard } from '../../../../components'

// Page init
const OrganizationServices = () => {
  return (
    <>
      <Head>
        <title>Services | Paysure</title>
      </Head>

      <OrganizationServicesDashboard />
    </>
  )
}

// Page export
export default OrganizationServices
