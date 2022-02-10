// imports
import React from 'react'
import Head from 'next/head'

import { SuperAgentDocViewDashboard } from '../../components'

// Page init
const SuperAgentDocView = () => {
  return (
    <>
      <Head>
        <title>Super Agent DocView | Paysure</title>
      </Head>

      <SuperAgentDocViewDashboard />
    </>
  )
}

// Page export
export default SuperAgentDocView
