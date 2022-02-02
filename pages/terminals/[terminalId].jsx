// imports
import React from 'react'
import Head from 'next/head'

import { TerminalDashboard } from '../../components'

// Page init
const SuperAgent = () => {
  return (
    <>
      <Head>
        <title>Terminal | Paysure</title>
      </Head>

      <TerminalDashboard />
    </>
  )
}

// Page export
export default SuperAgent
