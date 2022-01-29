// imports
import React from 'react'
import Head from 'next/head'

import { AgentsListDashboard } from '../../components'

// Page init
const AgentsList = () => {
  return (
    <>
      <Head>
        <title>Agents List | Paysure</title>
      </Head>

      <AgentsListDashboard />
    </>
  )
}

// Page export
export default AgentsList
