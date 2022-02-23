// imports
import axios from 'axios'
import React from 'react'
import Head from 'next/head'
import nookies from 'nookies'

import { HomeDashboard } from '../components'
import { makeEncryptedRequest } from '../utils/makeEncryptedRequest'

// Page init
const IndexPage = ({ data }) => {
  return (
    <>
      <Head>
        <title>Home | Paysure</title>
      </Head>

      <HomeDashboard homePageStats={data} />
    </>
  )
}

// // getStaticProps
export async function getServerSideProps(ctx) {
  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const response = await makeEncryptedRequest(
    {},
    'paysure/api/processor/admin-home-page-stats',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      data: response ? response.data : {},
    },
  }
}

// Page export
export default IndexPage
