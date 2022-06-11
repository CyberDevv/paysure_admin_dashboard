import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import nookies from 'nookies'
import useSWR, { SWRConfig } from 'swr'
import { destroyCookie } from 'nookies'
import { useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'

import { logout } from '../../features/userSlice'
import { TerminalDashboard } from '../../components'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const {
    query: {
      terminalId,
      fromDate = moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
      toDate = moment().format('YYYY-MM-DD 23:59:59'),
      page = 1,
      pageSize = 5,
    },
  } = ctx

  const { USER_AUTHORIZATION } = nookies.get(ctx)

  // TODO: cREATE THE ROUTE FOR THIS IN THE API ROUTE /api/terminals/terminal/terminalStats
  const terminalStats = await makeEncryptedRequest(
    {
      fromDate: moment().subtract(30, 'days').format('YYYY-MM-DD hh:mm:ss'),
      toDate: moment().format('YYYY-MM-DD hh:mm:ss'),
      status: '0',
      pageId: 1,
      pageSize: 5,
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
        '/api/terminals/terminal/terminalStats': terminalStats
          ? terminalStats.data
          : [],
      },
    },
  }
}

function TerminalPage() {
  const router = useRouter()
  const {
    terminalId,
    fromDate = moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
    toDate = moment().format('YYYY-MM-DD 23:59:59'),
    page = 1,
    pageSize = 5,
  } = router.query

  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR('/api/terminals/terminal/terminalStats', fetcher)
  console.log(
    '🚀 ~ file: [terminalId].jsx ~ line 61 ~ TerminalPage ~ data',
    data,
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
