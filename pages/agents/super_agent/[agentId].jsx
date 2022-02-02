// imports
import React from 'react'
import Head from 'next/head'

import { SuperAgentDashboard } from '../../../components'

// Page init
const SuperAgent = () => {
  return (
    <>
      <Head>
        <title>Super Agent | Paysure</title>
      </Head>

      <SuperAgentDashboard />
    </>
  )
}

// Page export
export default SuperAgent
