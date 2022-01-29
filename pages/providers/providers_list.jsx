// imports
import React from 'react'
import Head from 'next/head'

import { ProvidersListDashboard } from '../../components'

// Page init
const ProvidersList = () => {
  return (
    <>
      <Head>
        <title>Providers List | Paysure</title>
      </Head>

      <ProvidersListDashboard />
    </>
  )
}

// Page export
export default ProvidersList
