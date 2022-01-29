// imports
import React from 'react'
import Head from 'next/head'

import { SettlementsDashboard } from '../../components'

// Page init
const Settlements = () => {
  return (
    <>
      <Head>
        <title>Settlements | Paysure</title>
      </Head>

      <SettlementsDashboard />
    </>
  )
}

// Page export
export default Settlements
