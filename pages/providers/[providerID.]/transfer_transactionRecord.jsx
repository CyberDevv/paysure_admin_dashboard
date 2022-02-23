// imports
import React from 'react'
import Head from 'next/head'

import { Transfer_transactionRecordDashboard } from '../../../components'

// Page init
const transfer_transactionRecord = () => {
  return (
    <>
      <Head>
        <title>Transfer Transaction Record | Paysure</title>
      </Head>

      <Transfer_transactionRecordDashboard />
    </>
  )
}

// Page export
export default transfer_transactionRecord
