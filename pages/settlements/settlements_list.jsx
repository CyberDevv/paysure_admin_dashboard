// imports
import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import uid from 'generate-unique-id'
import useSWR, { SWRConfig } from 'swr'
import { useDispatch } from 'react-redux'
import nookies, { destroyCookie } from 'nookies'

import { logout } from '../../features/userSlice'
import { SettlementsListDashboard } from '../../components'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const {
    query: {
      fromDate = moment().subtract(400, 'days').format('YYYY-MM-DD 12:00:00'),
      toDate = moment().format('YYYY-MM-DD 23:59:59'),
      page = 1,
      pageSize = 10,
      searchKey = '',
      status = 0,
    },
  } = ctx

  const { USER_AUTHORIZATION } = nookies.get(ctx)

  // TODO: cREATE THE ROUTE FOR THIS IN THE API ROUTE /api/settlements/settlementStats
  const settlementStats = await makeEncryptedRequest(
    {
      requestId: uid({ length: 20 }),
      fromDate: fromDate,
      toDate: toDate,
      pageId: page,
      pageSize: pageSize,
      searchKey: searchKey,
      status: status,
    },
    'paysure/api/processor/admin-settlement-paged-th',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: settlementStats ? settlementStats.status : 500,
      fallback: {
        '/api/settlements/settlementStats': settlementStats
          ? settlementStats.data
          : [],
      },
    },
  }
}

function SettlementsListPage() {
  const router = useRouter()

  const {
    fromDate = moment().subtract(400, 'days').format('YYYY-MM-DD 12:00:00'),
    toDate = moment().format('YYYY-MM-DD 23:59:59'),
    page = 1,
    pageSize = 10,
    searchKey = '',
    status = 0,
  } = router.query

  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR('/api/settlements/settlementStats', fetcher)
  console.log('🚀 ~ file: index.jsx ~ line 51 ~ SettlementPage ~ data', data)

  return (
    <>
      <Head>
        <title>Settlements List | Paysure</title>
      </Head>

      <SettlementsListDashboard
        settlementsList={data}
        page={page}
        searchKey={searchKey}
        status={status}
        toDate={toDate}
        fromDate={fromDate}
      />
    </>
  )
}

export default function SettlementsList({ fallback, status }) {
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
      <SettlementsListPage />
    </SWRConfig>
  )
}
