// imports
import React from 'react'
import Head from 'next/head'

import { Sub_AccountsDashboard } from '../components'

// Page init
const Sub_Accounts = () => {
  return (
    <>
      <Head>
        <title>Sub Account | Paysure</title>
      </Head>

      <Sub_AccountsDashboard />
    </>
  )
}

// Page export
export default Sub_Accounts
