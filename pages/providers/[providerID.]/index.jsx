// imports
import React from 'react'
import Head from 'next/head'

import { ProviderDashboard } from '../../../components'

// Page init
const Provider = () => {
  return (
    <>
      <Head>
        <title>Provider | Paysure</title>
      </Head>

      <ProviderDashboard />
    </>
  )
}

// Page export
export default Provider
