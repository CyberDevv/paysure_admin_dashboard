// imports
import React from 'react'
import Head from 'next/head'

import { TransactionListDashboard } from '../../../components'

// Page init
const TransactionList = () => {
  return (
    <>
      <Head>
        <title>Transaction List | Paysure</title>
      </Head>

      <TransactionListDashboard />
    </>
  )
}

// Page export
export default TransactionList
