// imports
import Head from 'next/head'
import nookies from 'nookies'
import React from 'react'

import { SettlementsDashboard } from '../../components'
import { fetcher } from '../../utils/fetcher'

export async function getServerSideProps(ctx) {
  const { USER_TOKEN } = nookies.get(ctx)

  const response = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/admin/settlement/analytics/getSettlementPageMetrics',
  )

  if (response.status === 401) {
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
    },
  }
}

export default function Settlements({ data }) {
  return (
    <>
      <Head>
        <title>Settlements | Paysure</title>
      </Head>

      <SettlementsDashboard settlementMetric={data} />
    </>
  )
}
