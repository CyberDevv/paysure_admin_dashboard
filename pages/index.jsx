import Head from 'next/head'
import nookies from 'nookies'
import React from 'react'

import { HomeDashboard } from '../components'
import { fetcher } from '../utils/fetcher'

export async function getServerSideProps(ctx) {
  const { USER_TOKEN } = nookies.get(ctx)

  const response = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/admin/adminMainPage/analytics',
  )

  const response2 = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/admin/analytics/homePage/IncomeFromUsers',
  )

  const response3 = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/admin/analytics/homePage/IncomeFromAgencyBanking',
  )

  const response4 = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/admin/homePage/analytics/getRecentTransactions?limit=5&offset=1',
  )

  if (
    response.status === 401 ||
    response2.status === 401 ||
    response3.status === 401 ||
    response4.status === 401
  ) {
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
      userTable: response2.data,
      bankTable: response3.data,
      recentTransTable: response4.data,
    },
  }
}

export default function Home({ data, userTable, bankTable, recentTransTable }) {
  const homePageStats = [data, userTable, bankTable, recentTransTable]

  return (
    <>
      <Head>
        <title>Home | Paysure</title>
      </Head>

      <HomeDashboard homePageStats={homePageStats} />
    </>
  )
}
