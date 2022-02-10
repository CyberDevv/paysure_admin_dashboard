// imports
import React from 'react'
import Head from 'next/head'

import { AgentListDashboard } from '../../../../components'

// Page init
const AgentList = () => {
  return (
    <>
      <Head>
        <title>Agent List | Paysure</title>
      </Head>

      <AgentListDashboard />
    </>
  )
}

// Page export
export default AgentList
