// imports
import React from 'react'
import Head from 'next/head'

import { Airtime_transactionRecordDashboard } from '../../../components'

// Page init
const airtime_transactionRecord = () => {
  return (
    <>
      <Head>
        <title>Airtime Transaction Record | Paysure</title>
      </Head>

      <Airtime_transactionRecordDashboard />
    </>
  )
}

// Page export
export default airtime_transactionRecord
