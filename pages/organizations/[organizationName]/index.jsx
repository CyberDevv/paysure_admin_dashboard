// imports
import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import Router from 'next/router'
import uid from 'generate-unique-id'
import nookies, { destroyCookie } from 'nookies'
import useSWR, { SWRConfig } from 'swr'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { logout } from '../../../features/userSlice'
import { OrganizationDashboard } from '../../../components'
import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const {
    query: {
      organizationName,
      fromDate = moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
      toDate = moment().format('YYYY-MM-DD 23:59:59'),
      page = 1,
      pageSize = 5,
    },
  } = ctx

  const { USER_AUTHORIZATION } = nookies.get(ctx)

  // TODO: create api route for paysure/api/processor/each-provider
  const organizationStats = await makeEncryptedRequest(
    {
      requestId: uid({ length: 20 }),
      fromDate: fromDate,
      toDate: toDate,
      pageId: page,
      partner: organizationName,
      pageSize: pageSize,
    },
    'paysure/api/processor/each-partner',
    'POST',
    USER_AUTHORIZATION,
  )
  console.log(
    '🚀 ~ file: index.jsx ~ line 43 ~ getServerSideProps ~ organizationStats',
    organizationStats,
  )

  return {
    props: {
      status: organizationStats ? organizationStats.status : 500,
      fallback: {
        [`/api/organizations/${organizationName}?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}`]:
          organizationStats ? organizationStats.data : [],
      },
    },
  }
}

function OrganizationPage() {
  const router = useRouter()
  const {
    organizationName,
    fromDate = moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
    toDate = moment().format('YYYY-MM-DD 23:59:59'),
    page = 1,
    pageSize = 5,
  } = router.query

  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR(
    `/api/organizations/${organizationName}?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}`,
    fetcher,
  )

  return (
    <>
      <Head>
        <title>Organization - {organizationName} | Paysure</title>
      </Head>

      <OrganizationDashboard
        organizationName={organizationName}
        organizationStats={data}
      />
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
