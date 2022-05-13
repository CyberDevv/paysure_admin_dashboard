import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import Router from 'next/router'
import uid from 'generate-unique-id'
import useSWR, { SWRConfig } from 'swr'
import { useDispatch } from 'react-redux'
import nookies, { destroyCookie } from 'nookies'

import { logout } from '../../../features/userSlice'
import { UserDashboard } from '../../../components'
import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const { USER_AUTHORIZATION } = nookies.get(ctx)

  // TODO: cREATE THE ROUTE FOR THIS IN THE API ROUTE /api/users/user/userStats
  const userStats = await makeEncryptedRequest(
    {
      requestId: uid({ length: 20 }),
      fromDate: moment().subtract(30, 'days').format('YYYY-MM-DD hh:mm:ss'),
      toDate: moment().format('YYYY-MM-DD hh:mm:ss'),
      pageId: 1,
      pageSize: 5,
      phoneNumberPri: '+2348022534558',
      emailAddress: 'adeojo@gmail.com',
    },
    'paysure/api/processor/each-user-info',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: userStats ? userStats.status : 500,
      fallback: {
        '/api/users/user/userStats': userStats ? userStats.data : [],
      },
    },
  }
}

function UserPage() {
  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR('/api/users/user/userStats', fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
  })

  return (
    <>
      <Head>
        <title>User | Paysure</title>
      </Head>

      <UserDashboard userStats={data} />
    </>
  )
}

export default function User({ fallback, status }) {
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
      <UserPage />
    </SWRConfig>
  )
}
