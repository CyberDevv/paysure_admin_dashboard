// imports
import React from 'react'
import Head from 'next/head'

import { SignupsDashboard } from '../../components'

// Page init
const Signups = () => {
  return (
    <>
      <Head>
        <title>Signups | Paysure</title>
      </Head>

      <SignupsDashboard />
    </>
  )
}

// Page export
export default Signups
