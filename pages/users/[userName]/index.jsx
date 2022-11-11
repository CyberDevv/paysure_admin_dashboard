import Head from 'next/head'
import nookies from 'nookies'
import React from 'react'

import { UserDashboard } from '../../../components'
import { fetcher } from '../../../utils/fetcher'

export async function getServerSideProps(ctx) {
  const { username } = ctx.query

  const { USER_TOKEN } = nookies.get(ctx)

  const response = await fetcher(
    USER_TOKEN,
    'GET',
    `/apis/v1/paysure/users/admin/profile/getUserProfile?username=${username}`,
  )

  const response2 = await fetcher(
    USER_TOKEN,
    'GET',
    `/apis/v1/paysure/users/admin/analytics/getUserTransactionsTable?limit=5&offset=1&userName=${username}`,
  )

  if (response.status === 401 || response2.status === 401) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  if (response.status > 399 || response2.status > 399) {
    console.log(response.data)
  }

  return {
    props: {
      data: response.status > 399 ? [] : response.data,
      tableData: response2.status > 399 ? [] : response2.data,
    },
  }
}

export default function User({ data, tableData }) {
  return (
    <>
      <Head>
        <title>User - {data.firstName + ' ' + data.lastName} | Paysure</title>
      </Head>

      <UserDashboard userStats={data} tableData={tableData} />
    </>
  )
}
