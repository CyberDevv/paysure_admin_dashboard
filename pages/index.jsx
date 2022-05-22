// imports
import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import nookies from 'nookies'
import Router from 'next/router'
import uid from 'generate-unique-id'
import useSWR, { SWRConfig } from 'swr'
import { destroyCookie } from 'nookies'
import { useDispatch } from 'react-redux'

import { HomeDashboard } from '../components'
import { logout } from '../features/userSlice'
import { makeEncryptedRequest } from '../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const homeStats = await makeEncryptedRequest(
    {},
    'paysure/api/processor/admin-home-page-stats',
    'POST',
    USER_AUTHORIZATION,
  )

  const homeDataList = await makeEncryptedRequest(
    {
      requestId: uid({ length: 20 }),
      fromDate: moment().subtract(30, 'days').format('YYYY-MM-DD hh:mm:ss'),
      toDate: moment().format('YYYY-MM-DD hh:mm:ss'),
      pageId: 1,
      pageSize: 5,
    },
    'paysure/api/processor/admin-dashboard-stats-with-grid',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: homeStats ? homeStats.status : 500,
      status2: homeDataList ? homeDataList.status : 500,
      fallback: {
        '/api/home/homeStats': homeStats ? homeStats.data : [],
        '/api/home/homeDataList': homeDataList ? homeDataList.data : [],
      },
    },
  }
}

function HomePage() {
  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR('/api/home/homeStats', fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
  })

  const { data: data2 } = useSWR('/api/home/homeDataList', fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
  })

  return (
    <>
      <Head>
        <title>Home | Paysure</title>
      </Head>

      <HomeDashboard homePageGrid={data2} homePageStats={data} />
    </>
  )
}

export default function Home({ fallback, status, status2 }) {
  // dispatch
  const dispatch = useDispatch()

  // useEffect hook
  React.useEffect(() => {
    if (status === 873 || status2 === 873) {
      // logout the user and push to login page
      dispatch(logout())
      destroyCookie(null, 'USER_AUTHORIZATION')
      localStorage.removeItem('user')
      Router.push('/login')
    }
  }, [status, status2, fallback, dispatch])

  return (
    <SWRConfig value={{ fallback }}>
      <HomePage />
    </SWRConfig>
  )
}
