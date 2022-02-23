// imports
import React from 'react'
import Head from 'next/head'

import { Data_transactionRecordDashboard } from '../../../components'

// Page init
const Data_transactionRecord = () => {
  return (
    <>
      <Head>
        <title>Data Transaction Record | Paysure</title>
      </Head>

      <Data_transactionRecordDashboard />
    </>
  )
}

// Page export
export default Data_transactionRecord
