// imports
import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import Router from 'next/router'
import uid from 'generate-unique-id'
import useSWR, { SWRConfig } from 'swr'
import { useDispatch } from 'react-redux'
import nookies, { destroyCookie } from 'nookies'

import { logout } from '../../features/userSlice'
import { TransactionsDashboard } from '../../components'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const transactionStats = await makeEncryptedRequest(
    {
      requestId: uid({ length: 20 }),
      fromDate: moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
      toDate: moment().format('YYYY-MM-DD 23:59:59'),
      pageId: 1,
      pageSize: 5,
    },
    'paysure/api/processor/admin-summary-and-paged-th',
    'POST',
    USER_AUTHORIZATION,
  )
  console.log(
    '🚀 ~ file: index.jsx ~ line 30 ~ getServerSideProps ~ transactionStats',
    JSON.stringify(transactionStats),
  )

  return {
    props: {
      status: transactionStats ? transactionStats.status : 500,
      fallback: {
        '/api/transactions/transactionStats': transactionStats
          ? transactionStats.data
          : [],
      },
    },
  }
}

function TransactionsPage() {
  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR('/api/transactions/transactionStats', fetcher)

  return (
    <>
      <Head>
        <title>Transactions | Paysure</title>
      </Head>

      <TransactionsDashboard transactionsPageStats={data} />
    </>
  )
}

export default function Transactions({ fallback, status }) {
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
      <TransactionsPage />
    </SWRConfig>
  )
}
