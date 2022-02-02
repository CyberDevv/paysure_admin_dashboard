// imports
import React from 'react'
import Head from 'next/head'

import { AdminstratorDashboard } from '../../components'

// Page init
const Adminstrator = () => {
  return (
    <>
      <Head>
        <title>Adminstrator | Paysure</title>
      </Head>

      <AdminstratorDashboard />
    </>
  )
}

// Page export
export default Adminstrator
