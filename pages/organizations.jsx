// imports
import React from 'react'
import Head from 'next/head'

import { OrganizationsDashboard } from '../components'

// Page init
const Organizations = () => {
  return (
    <>
      <Head>
        <title>Organizations | Paysure</title>
      </Head>

      <OrganizationsDashboard />
    </>
  )
}

// Page export
export default Organizations
