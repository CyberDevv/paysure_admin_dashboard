// imports
import React from 'react'
import Head from 'next/head'

import { AgentTransactionListDashboard } from '../../../../components'

// Page init
const TransactionList = () => {
  return (
    <>
      <Head>
        <title>Transaction List | Paysure</title>
      </Head>

      <AgentTransactionListDashboard />
    </>
  )
}

// Page export
export default TransactionList
