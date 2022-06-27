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
import { TerminalsDashboard } from '../../components'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const { USER_AUTHORIZATION } = nookies.get(ctx)

  // TODO: cREATE THE ROUTE FOR THIS IN THE API ROUTE /api/terminals/terminalStats
  const terminalStats = await makeEncryptedRequest(
    {
      requestId: uid({ length: 20 }),
      // TODO: change this to the correct amount of days
      fromDate: moment().subtract(40, 'days').format('YYYY-MM-DD 12:00:00'),
      toDate: moment().format('YYYY-MM-DD 23:59:59'),
      pageId: 1,
      pageSize: 5,
      status: 0,
    },
    'paysure/api/processor/list-mapped-terminal-info',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: terminalStats ? terminalStats.status : 500,
      fallback: {
        '/api/terminals/terminalStats': terminalStats ? terminalStats.data : [],
      },
    },
  }
}

function TerminalPage() {
  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR('/api/terminals/terminalStats', fetcher)

  return (
    <>
      <Head>
        <title>Terminals | Paysure</title>
      </Head>

      <TerminalsDashboard terminalStats={data} />
    </>
  )
}

export default function Terminals({ fallback, status }) {
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
