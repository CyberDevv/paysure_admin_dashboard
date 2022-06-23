// imports
import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import useSWR, { SWRConfig } from 'swr'
import { useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'
import nookies, { destroyCookie } from 'nookies'

import { logout } from '../../features/userSlice'
import { TerminalsListDashboard } from '../../components'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const {
    query: {
      // TODO: change this to the correct amount of days
      fromDate = moment().subtract(400, 'days').format('YYYY-MM-DD 12:00:00'),
      toDate = moment().format('YYYY-MM-DD 23:59:59'),
      page = 1,
      pageSize = 10,
      searchKey = '',
      status = 0,
    },
  } = ctx

  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const terminalsList = await makeEncryptedRequest(
    {
      fromDate: fromDate,
      toDate: toDate,
      pageId: page,
      pageSize: pageSize,
      searchKey: searchKey,
      status: status,
    },
    'paysure/api/processor/list-mapped-terminal-info',
    'POST',
    USER_AUTHORIZATION,
  )

  // TODO: cREATE THE ROUTE FOR THIS IN THE API ROUTE /api/terminals/terminalsListLists
  return {
    props: {
      status: terminalsList ? terminalsList.status : 500,
      fallback: {
        [`/api/terminals/terminalsListLists?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}&searchKey=${searchKey}&status=${status}`]:
          terminalsList ? terminalsList.data : [],
      },
    },
  }
}

function TerminalsListPage() {
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

  const { data } = useSWR(
    `/api/terminals/terminalsListLists?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}&searchKey=${searchKey}&status=${status}`,
    fetcher,
  )

  return (
    <>
      <Head>
        <title>Terminals List| Paysure</title>
      </Head>

      <TerminalsListDashboard
        terminalsList={data}
        page={page}
        searchKey={searchKey}
        status={status}
        toDate={toDate}
        pageSize={pageSize}
        fromDate={fromDate}
      />
    </>
  )
}

export default function TerminalsList({ fallback, status }) {
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
      <TerminalsListPage />
    </SWRConfig>
  )
}
