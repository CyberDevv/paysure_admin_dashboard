// imports
import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import nookies from 'nookies'
import Router from 'next/router'
import uid from 'generate-unique-id'
import { destroyCookie } from 'nookies'
import useSWR, { SWRConfig } from 'swr'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { logout } from '../../../features/userSlice'
import { ProviderTransactionListDashboard } from '../../../components'
import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const {
    query: {
      providerName,
      fromDate = moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
      toDate = moment().format('YYYY-MM-DD 12:00:00'),
      page = 1,
    },
  } = ctx

  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const providerStats = await makeEncryptedRequest(
    {
      requestId: uid({ length: 20 }),
      fromDate: fromDate,
      toDate: toDate,
      pageId: page,
      pageSize: 10,
      provider: providerName,
    },
    'paysure/api/processor/each-provider',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: providerStats ? providerStats.status : 500,
      fallback: {
        [`/api/providers/${providerName}?fromDate=${fromDate}&toDate=${toDate}&page=${page}`]:
          providerStats ? providerStats.data : [],
      },
    },
  }
}

function ProviderListPage() {
  const router = useRouter()
  const {
    providerName,
    fromDate = moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
    toDate = moment().format('YYYY-MM-DD 12:00:00'),
    page = 1,
  } = router.query

  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR(
    `/api/providers/${providerName}?fromDate=${fromDate}&toDate=${toDate}&page=${page}`,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
    },
  )

  http: return (
    <>
      <Head>
        <title>{providerName} - Transaction Record | Paysure</title>
      </Head>

      <ProviderTransactionListDashboard
        providerName={providerName}
        providerData={data}
        toDate={toDate}
        fromDate={fromDate}
        page={page}
      />
    </>
  )
}

export default function EachProviderList({ fallback, status }) {
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
      <ProviderListPage />
    </SWRConfig>
  )
}
