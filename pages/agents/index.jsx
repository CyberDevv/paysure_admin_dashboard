// imports
import React from 'react'
import Head from 'next/head'

import { SinglarSuperAgentDashboard } from '../../components'

// Page init
const Agents = () => {
  return (
    <>
      <Head>
        <title>Agents | Paysure</title>
      </Head>

      <SinglarSuperAgentDashboard />
    </>
  )
}

// Page export
export default Agents
