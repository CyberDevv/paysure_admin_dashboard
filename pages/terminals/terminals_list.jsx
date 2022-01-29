// imports
import React from 'react'
import Head from 'next/head'

import { TerminalsListDashboard } from '../../components'

// Page init
const TerminalsList = () => {
  return (
    <>
      <Head>
        <title>Terminals List | Paysure</title>
      </Head>

      <TerminalsListDashboard />
    </>
  )
}

// Page export
export default TerminalsList
