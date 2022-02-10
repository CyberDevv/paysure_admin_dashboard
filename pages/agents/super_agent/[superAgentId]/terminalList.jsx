// imports
import React from 'react'
import Head from 'next/head'

import { TerminalListDashboard } from '../../../../components'

// Page init
const TerminalList = () => {
  return (
    <>
      <Head>
        <title>Terminal List | Paysure</title>
      </Head>

      <TerminalListDashboard />
    </>
  )
}

// Page export
export default TerminalList
