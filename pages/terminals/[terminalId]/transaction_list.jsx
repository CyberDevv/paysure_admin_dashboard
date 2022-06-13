import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import nookies from 'nookies'
import useSWR, { SWRConfig } from 'swr'
import { destroyCookie } from 'nookies'
import { useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'

import { logout } from '../../../features/userSlice'
import { TerminalTransactionListDashboard } from '../../../components'
import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const {
    query: {
      terminalId,
      // TODO: change this to the correct amount of days
      fromDate = moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
      toDate = moment().format('YYYY-MM-DD 23:59:59'),
      page = 1,
      pageSize = 10,
      searchKey = '',
      status = 0,
    },
  } = ctx

  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const terminalList = await makeEncryptedRequest(
    {
      fromDate: fromDate,
      toDate: toDate,
      pageId: page,
      pageSize: pageSize,
      searchKey: searchKey,
      status: status,
      terminalId: terminalId,
    },
    'paysure/api/processor/lookup-mappedterminal-stats',
    'POST',
    USER_AUTHORIZATION,
  )

  // TODO: cREATE THE ROUTE FOR THIS IN THE API ROUTE /api/terminal/terminalListLists
  return {
    props: {
      status: terminalList ? terminalList.status : 500,
      fallback: {
        [`/api/terminal/terminalListLists?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}&searchKey=${searchKey}&status=${status}`]:
          terminalList ? terminalList.data : [],
      },
    },
  }
}

function TerminalListPage() {
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
    `/api/terminal/terminalListLists?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}&searchKey=${searchKey}&status=${status}`,
    fetcher,
  )

  return (
    <>
      <Head>
        <title>Terminal History| Paysure</title>
      </Head>

      <TerminalTransactionListDashboard
        terminalList={data}
        page={page}
        searchKey={searchKey}
        status={status}
        toDate={toDate}
        fromDate={fromDate}
      />
    </>
  )
}

export default function TerminalList({ fallback, status }) {
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
      <TerminalListPage />
    </SWRConfig>
  )
}
