import Head from 'next/head'
import nookies from 'nookies'
import React from 'react'

import { UsersDashboard } from '../../components'
import { fetcher } from '../../utils/fetcher'

export async function getServerSideProps(ctx) {
  const { USER_TOKEN } = nookies.get(ctx)

  const response = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/bizzdeskgroup/users/admin/adminUserDasboard/analytics',
  )

  const response2 = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/bizzdeskgroup/users/admin/analytics/getUserAnalyticsTable?limit=5&offset=1',
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
      tableData: response2.data,
    },
  }
}

export default function Users({ data, tableData }) {
  return (
    <>
      <Head>
        <title>Users | Paysure</title>
      </Head>

      <UsersDashboard usersStats={data} tableData={tableData} />
    </>
  )
}
