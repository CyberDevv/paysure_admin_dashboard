// imports
import React from 'react'
import Head from 'next/head'

import { AgentsDashboard } from '../components'

// Page init
const Agents = () => {
  return (
    <>
      <Head>
        <title>Agents | Paysure</title>
      </Head>

      <AgentsDashboard />
    </>
  )
}

// Page export
export default Agents
