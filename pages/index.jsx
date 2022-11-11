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

  if (
    response.status === 401 ||
    response2.status === 401 ||
    response3.status === 401
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
    },
  }
}

export default function Home({ data, userTable, bankTable }) {
  const homePageStats = [data, userTable, bankTable]

  return (
    <>
      <Head>
        <title>Home | Paysure</title>
      </Head>

      <HomeDashboard homePageStats={homePageStats} />
    </>
  )
}
