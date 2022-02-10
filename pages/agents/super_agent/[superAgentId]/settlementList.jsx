// imports
import React from 'react'
import Head from 'next/head'

import { SettlementListDashboard } from '../../../../components'

// Page init
const SettlementList = () => {
  return (
    <>
      <Head>
        <title>Settlement List | Paysure</title>
      </Head>

      <SettlementListDashboard />
    </>
  )
}

// Page export
export default SettlementList
