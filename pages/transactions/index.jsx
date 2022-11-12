// imports
import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import Router from 'next/router'
import uid from 'generate-unique-id'
import useSWR, { SWRConfig } from 'swr'
import { useDispatch } from 'react-redux'
import nookies, { destroyCookie } from 'nookies'

import { logout } from '../../features/userSlice'
import { TransactionsDashboard } from '../../components'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'
import { fetcher } from '../../utils/fetcher'

export async function getServerSideProps(ctx) {
  const { USER_TOKEN } = nookies.get(ctx)

  const response = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/admin/transactions/analytics/getTransactionsPageMetrics',
  )

  const response2 = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/admin/transactions/analytics/settlementOverview',
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
      settlementData: response2.data,
    },
  }
}

export default function Providers({ data, settlementData }) {
  return (
    <>
      <Head>
        <title>Transactions | Paysure</title>
      </Head>

      <TransactionsDashboard
        transactionsPageStats={data}
        settlementData={settlementData}
      />
    </>
  )
}
