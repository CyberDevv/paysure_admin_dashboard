// imports
import React from 'react'
import Head from 'next/head'

import { ProvidersDashboard } from '../../components'

// Page init
const Providers = () => {
  return (
    <>
      <Head>
        <title>Providers | Paysure</title>
      </Head>

      <ProvidersDashboard />
    </>
  )
}

// Page export
export default Providers
