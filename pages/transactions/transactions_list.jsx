// imports
import React from 'react'
import Head from 'next/head'

import { TransactionsListDashboard } from '../../components'

// Page init
const TransactionsList = () => {
  return (
    <>
      <Head>
        <title>Transactions List | Paysure</title>
      </Head>

      <TransactionsListDashboard />
    </>
  )
}

// Page export
export default TransactionsList
