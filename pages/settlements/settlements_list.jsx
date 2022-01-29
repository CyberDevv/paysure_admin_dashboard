// imports
import React from 'react'
import Head from 'next/head'

import { SettlementsListDashboard } from '../../components'

// Page init
const SettlementsList = () => {
  return (
    <>
      <Head>
        <title>Settlements List | Paysure</title>
      </Head>

      <SettlementsListDashboard />
    </>
  )
}

// Page export
export default SettlementsList
