// imports
import React from 'react'
import Head from 'next/head'

import { AgentDashboard } from '../../../../components'

// Page init
const Agent = () => {
  return (
    <>
      <Head>
        <title>Agent | Paysure</title>
      </Head>

      <AgentDashboard />
    </>
  )
}

// Page export
export default Agent
