// imports
import uid from 'generate-unique-id'
import moment from 'moment'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import nookies, { destroyCookie } from 'nookies'
import React from 'react'
import { useDispatch } from 'react-redux'
import useSWR, { SWRConfig } from 'swr'

import { OrganizationDashboard } from '../../../components'
import { logout } from '../../../features/userSlice'
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
      partnerId: organizationName,
      pageSize: pageSize,
    },
    'paysure/api/processor/each-partner',
    'POST',
    USER_AUTHORIZATION,
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
        <title>Organization - {data.partnerName} | Paysure</title>
      </Head>

      <OrganizationDashboard
        organizationStats={data}
        organizationId={organizationName}
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
