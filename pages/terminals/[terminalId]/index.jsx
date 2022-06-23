import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import Router from 'next/router'
import uid from 'generate-unique-id'
import { useRouter } from 'next/router'
import useSWR, { SWRConfig } from 'swr'
import { useDispatch } from 'react-redux'
import nookies, { destroyCookie } from 'nookies'

import { logout } from '../../../features/userSlice'
import { TerminalDashboard } from '../../../components'
import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const {
    query: {
      terminalId,
      fromDate = moment().subtract(400, 'days').format('YYYY-MM-DD 12:00:00'),
      toDate = moment().format('YYYY-MM-DD 23:59:59'),
      page = 1,
      pageSize = 5,
    },
  } = ctx

  const { USER_AUTHORIZATION } = nookies.get(ctx)

  // TODO: cREATE THE ROUTE FOR THIS IN THE API ROUTE /api/terminals/terminal/terminalStats
  const terminalStats = await makeEncryptedRequest(
    {
      fromDate: fromDate,
      toDate: toDate,
      pageId: page,
      pageSize: pageSize,
      terminalId: terminalId,
    },
    'paysure/api/processor/lookup-mappedterminal-stats',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: terminalStats ? terminalStats.status : 500,
      fallback: {
        [`/api/terminals/${terminalId}?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}`]:
          terminalStats ? terminalStats.data : [],
      },
    },
  }
}

function TerminalPage() {
  const router = useRouter()
  const {
    terminalId,
    fromDate = moment().subtract(400, 'days').format('YYYY-MM-DD 12:00:00'),
    toDate = moment().format('YYYY-MM-DD 23:59:59'),
    page = 1,
    pageSize = 5,
  } = router.query

  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR(
    `/api/terminals/${terminalId}?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}`,
    fetcher,
  )

  return (
    <>
      <Head>
        <title>Terminal | Paysure</title>
      </Head>

      <TerminalDashboard terminalStats={data} terminalId={terminalId} />
    </>
  )
}

export default function Terminal({ fallback, status }) {
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
      <TerminalPage />
    </SWRConfig>
  )
}
