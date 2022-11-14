import Head from 'next/head'
import nookies from 'nookies'
import React from 'react'
import useSWR, { SWRConfig } from 'swr'

import { UsersDashboard } from '../../components'
import { fetcher } from '../../utils/fetcher'

export async function getServerSideProps(ctx) {
  const { USER_TOKEN } = nookies.get(ctx)

  const response = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/users/admin/adminUserDasboard/analytics',
  )

  const response2 = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/users/admin/analytics/getUserAnalyticsTable?limit=5&offset=1',
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
      fallback: {
        '/api/users/usersStats': response.data,
        '/api/users/usersList': response2.data,
      },
    },
  }
}

function UsersPage() {
  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR('/api/users/usersStats', fetcher)
  const { data: tableData } = useSWR('/api/users/usersList', fetcher)

  return (
    <>
      <Head>
        <title>Users | Paysure</title>
      </Head>

      <UsersDashboard usersStats={data} tableData={tableData} />
    </>
  )
}

export default function Users({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <UsersPage />
    </SWRConfig>
  )
}
