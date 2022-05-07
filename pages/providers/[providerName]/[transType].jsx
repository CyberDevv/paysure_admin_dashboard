// imports
import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { ProviderTradeSumaryDashboard } from '../../../components'

// Page init
const airtime_transactionRecord = () => {
  const router = useRouter()
  const { transType, providerName } = router.query

  console.log(router.query)

  return (
    <>
      <Head>
        <title>
          {providerName} - {transType} Transaction Record | Paysure
        </title>
      </Head>

      <ProviderTradeSumaryDashboard
        providerName={providerName}
        transType={transType}
      />
    </>
  )
}

// Page export
export default airtime_transactionRecord
