// imports
import React from 'react'
import Head from 'next/head'

import { TransactionsDashboard } from '../components'

// Page init
const Transactions = () => {
  return (
    <>
      <Head>
        <title>Transactions | Paysure</title>
      </Head>

      <TransactionsDashboard />
    </>
  )
}

// Page export
export default Transactions
