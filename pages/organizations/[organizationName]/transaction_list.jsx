// imports
import React from 'react'
import Head from 'next/head'

import { OrganizationTransactionListDashboard } from '../../../components'

// Page init
const TransactionList = () => {
  return (
    <>
      <Head>
        <title>Transaction List | Paysure</title>
      </Head>

      <OrganizationTransactionListDashboard />
    </>
  )
}

// Page export
export default TransactionList
