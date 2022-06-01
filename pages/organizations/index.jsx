import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import Router from 'next/router'
import useSWR, { SWRConfig } from 'swr'
import { useDispatch } from 'react-redux'
import nookies, { destroyCookie } from 'nookies'

import { logout } from '../../features/userSlice'
import { OrganizationsDashboard } from '../../components'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const { USER_AUTHORIZATION } = nookies.get(ctx)

  // TODO: cREATE THE ROUTE FOR THIS IN THE API ROUTE /api/organizations/organizaionStats
  const organizaionStats = await makeEncryptedRequest(
    {
      fromDate: moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
      toDate: moment().format('YYYY-MM-DD 23:59:59'),
      status: 0,
      searchKey: 'ABU',
      pageId: 1,
      pageSize: 5,
    },
    'paysure/api/processor/list-partner-stats',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: organizaionStats ? organizaionStats.status : 500,
      fallback: {
        '/api/organizations/organizaionStats': organizaionStats
          ? organizaionStats.data
          : [],
      },
    },
  }
}

function OrganizationPage() {
  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR('/api/organizations/organizaionStats', fetcher)

  return (
    <>
      <Head>
        <title>Organizations | Paysure</title>
      </Head>

      <OrganizationsDashboard organizaionStats={data} />
    </>
  )
}

export default function Organization({ fallback, status }) {
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
      <OrganizationPage />
    </SWRConfig>
  )
}
