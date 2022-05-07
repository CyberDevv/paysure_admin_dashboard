import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import Router from 'next/router'
import uid from 'generate-unique-id'
import useSWR, { SWRConfig } from 'swr'
import { useDispatch } from 'react-redux'
import nookies, { destroyCookie } from 'nookies'

import { UsersDashboard } from '../../components'
import { logout } from '../../features/userSlice'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const usersStats = await makeEncryptedRequest(
    {
      requestId: uid({ length: 20 }),
      fromDate: moment().subtract(30, 'days').format('YYYY-MM-DD hh:mm:ss'),
      toDate: moment().format('YYYY-MM-DD hh:mm:ss'),
      pageId: 1,
      pageSize: 5,
    },
    'paysure/api/processor/user-dashboard-stats-with-grid',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: usersStats ? usersStats.status : 500,
      fallback: {
        '/api/users/usersStats': usersStats ? usersStats.data : [],
      },
    },
  }
}

function UsersPage() {
  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  // TODO: create url in api route for /api/users/usersStats
  const { data } = useSWR('/api/users/usersStats', fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
  })

  return (
    <>
      <Head>
        <title>Users | Paysure</title>
      </Head>

      <UsersDashboard usersStats={data} />
    </>
  )
}

export default function Users({ fallback, status }) {
  // dispatch
  const dispatch = useDispatch()

  // useEffect hook
  React.useEffect(() => {
    if (status === 873) {
      // logout the user and push to login page
      dispatch(logout())
      destroyCookie(null, 'USER_AUTHORIZATION')
      localStorage.removeItem('user')
      Router.push('/login')
    }
  }, [status, fallback, dispatch])

  return (
    <SWRConfig value={{ fallback }}>
      <UsersPage />
    </SWRConfig>
  )
}
