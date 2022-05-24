// imports
import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import useSWR, { SWRConfig } from 'swr'
import { useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'
import nookies, { destroyCookie } from 'nookies'

import { logout } from '../../features/userSlice'
import { AgentsListDashboard } from '../../components'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const {
    query: {
      fromDate = moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
      toDate = moment().format('YYYY-MM-DD 23:59:59'),
      page = 1,
      pageSize = 10,
      searchKey = '',
    },
  } = ctx

  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const agentsList = await makeEncryptedRequest(
    {
      fromDate: fromDate,
      toDate: toDate,
      pageId: page,
      pageSize: pageSize,
      searchKey: searchKey,
    },
    'paysure/api/processor/agents-stats',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: agentsList ? agentsList.status : 500,
      fallback: {
        [`/api/agents/agentsListLists?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}&searchKey=${searchKey}`]:
          agentsList ? agentsList.data : [],
      },
    },
  }
}

function AgentsListPage() {
  const router = useRouter()
  const {
    fromDate = moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
    toDate = moment().format('YYYY-MM-DD 23:59:59'),
    page = 1,
    pageSize = 10,
    searchKey = '',
  } = router.query

  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR(
    `/api/agents/agentsListLists?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}&searchKey=${searchKey}`,
    fetcher,
  )

  return (
    <>
      <Head>
        <title>Agents List | Paysure</title>
      </Head>

      <AgentsListDashboard
        agentsList={data}
        page={page}
        searchKey={searchKey}
      />
    </>
  )
}

export default function AgentsList({ fallback, status }) {
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
      <AgentsListPage />
    </SWRConfig>
  )
}
