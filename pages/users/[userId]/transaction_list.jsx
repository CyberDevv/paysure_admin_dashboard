// imports
import React from 'react'
import Head from 'next/head'

import { UserTransactionListDashboard } from '../../../components'

// Page init
const TransactionList = () => {
  return (
    <>
      <Head>
        <title>Transaction List | Paysure</title>
      </Head>

      <UserTransactionListDashboard />
    </>
  )
}

// Page export
export default TransactionList
