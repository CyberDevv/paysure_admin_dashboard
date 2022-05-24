import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import Router from 'next/router'
import uid from 'generate-unique-id'
import useSWR, { SWRConfig } from 'swr'
import { useDispatch } from 'react-redux'
import nookies, { destroyCookie } from 'nookies'

import { logout } from '../../features/userSlice'
import { SinglarSuperAgentDashboard } from '../../components'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const agentsStats = await makeEncryptedRequest(
    {
      fromDate: moment().subtract(30, 'days').format('YYYY-MM-DD hh:mm:ss'),
      toDate: moment().format('YYYY-MM-DD hh:mm:ss'),
      pageId: 1,
      pageSize: 5,
    },
    'paysure/api/processor/agents-stats',
    'POST',
    USER_AUTHORIZATION,
  )
  console.log(
    '🚀 ~ file: index.jsx ~ line 24 ~ getServerSideProps ~ agentsStats',
    JSON.stringify(agentsStats),
  )

  const superAgentsStats = await makeEncryptedRequest(
    {
      // requestId: uid({ length: 20 }),
      // fromDate: moment().subtract(30, 'days').format('YYYY-MM-DD hh:mm:ss'),
      // toDate: moment().format('YYYY-MM-DD hh:mm:ss'),
      pageId: 1,
      pageSize: 5,
    },
    'paysure/api/processor/superagents-stats',
    'POST',
    USER_AUTHORIZATION,
  )

  // TODO: cREATE THE ROUTE FOR THIS IN THE API ROUTE /api/agents/agentsStats and /api/agents/superAgentsStats
  return {
    props: {
      status: agentsStats ? agentsStats.status : 500,
      status2: superAgentsStats ? superAgentsStats.status : 500,
      fallback: {
        '/api/agents/agentsStats': agentsStats ? agentsStats.data : [],
        '/api/agents/superAgentsStats': superAgentsStats
          ? superAgentsStats.data
          : [],
      },
    },
  }
}

function AgentsPage() {
  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR('/api/agents/agentsStats', fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
  })

  const { data: data2 } = useSWR('/api/agents/superAgentsStats', fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
  })

  return (
    <>
      <Head>
        <title>Agents | Paysure</title>
      </Head>

      <SinglarSuperAgentDashboard agentData={data} superAgentData={data2} />
    </>
  )
}

export default function Agent({ fallback, status, status2 }) {
  // dispatch
  const dispatch = useDispatch()

  // useEffect hook
  React.useEffect(() => {
    if (status === 873 || status2 === 873) {
      // logout the user and push to login page
      dispatch(logout())
      destroyCookie(null, 'USER_AUTHORIZATION')
      localStorage.removeItem('user')
      Router.push('/login')
    }
  }, [status, status2, fallback, dispatch])

  return (
    <SWRConfig value={{ fallback }}>
      <AgentsPage />
    </SWRConfig>
  )
}
