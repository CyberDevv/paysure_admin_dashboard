import Head from 'next/head'
import nookies from 'nookies'
import React from 'react'

import { ProvidersDashboard } from '../../components'
import { fetcher } from '../../utils/fetcher'

export async function getServerSideProps(ctx) {
  const { USER_TOKEN } = nookies.get(ctx)

  const response = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/providers/getAnalytics',
  )

  const response2 = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/providers/getProviderAnalyticsTable',
  )

  if (response.status === 401 || response2.status === 401) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      data: response.data,
      tableTata: response2.data,
    },
  }
}

export default function Providers({ data, tableTata }) {
  return (
    <>
      <Head>
        <title>Providers | Paysure</title>
      </Head>

      <ProvidersDashboard providerStats={data} tableTata={tableTata} />
    </>
  )
}
