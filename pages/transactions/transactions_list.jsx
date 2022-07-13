import uid from 'generate-unique-id'
import moment from 'moment'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import nookies, { destroyCookie } from 'nookies'
import React from 'react'
import { useDispatch } from 'react-redux'
import useSWR, { SWRConfig } from 'swr'

import { TransactionsListDashboard } from '../../components'
import { logout } from '../../features/userSlice'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'


export async function getServerSideProps(ctx) {
  const {
    query: {
      fromDate = moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
      toDate = moment().format('YYYY-MM-DD 23:59:59'),
      page = 1,
      pageSize = 10,
      searchKey = '',
      status = 0,
    },
  } = ctx

  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const transactionsList = await makeEncryptedRequest(
    {
      requestId: uid({ length: 20 }),
      fromDate: fromDate,
      toDate: toDate,
      pageId: page,
      pageSize: pageSize,
      searchKey: searchKey,
      status: status,
    },
    'paysure/api/processor/admin-summary-and-paged-th',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: transactionsList ? transactionsList.status : 500,
      fallback: {
        [`/api/transactions/transactionsListLists?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}&searchKey=${searchKey}&status=${status}`]:
          transactionsList ? transactionsList.data : [],
      },
    },
  }
}

function TransactionsListPage() {
  const router = useRouter()
  const {
    fromDate = moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
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

  const { data } = useSWR(
    `/api/transactions/transactionsListLists?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}&searchKey=${searchKey}&status=${status}`,
    fetcher,
  )
    console.log("🚀 ~ file: transactions_list.jsx ~ line 70 ~ TransactionsListPage ~ data", data)

  return (
    <>
      <Head>
        <title>Transactions List | Paysure</title>
      </Head>

      <TransactionsListDashboard
        transactionsList={data}
        page={page}
        searchKey={searchKey}
        status={status}
        toDate={toDate}
        fromDate={fromDate}
      />
    </>
  )
}

export default function TransactionsList({ fallback, status }) {
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
      <TransactionsListPage />
    </SWRConfig>
  )
}