// imports
import React from 'react'
import Head from 'next/head'

import { HomeDashboard } from '../components'

// Page init
const IndexPage = () => {
  return (
    <>
      <Head>
        <title>Home | Paysure</title>
      </Head>

      <HomeDashboard />
    </>
  )
}

// Page export
export default IndexPage
