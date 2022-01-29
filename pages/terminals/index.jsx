// imports
import React from 'react'
import Head from 'next/head'

import { TerminalsDashboard } from '../../components'

// Page init
const Terminals = () => {
  return (
    <>
      <Head>
        <title>Terminals | Paysure</title>
      </Head>

      <TerminalsDashboard />
    </>
  )
}

// Page export
export default Terminals
