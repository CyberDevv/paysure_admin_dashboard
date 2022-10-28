import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import nookies from 'nookies'
import Router from 'next/router'
import uid from 'generate-unique-id'
import useSWR, { SWRConfig } from 'swr'
import { destroyCookie } from 'nookies'
import { useDispatch } from 'react-redux'

import { AgenttDashboard } from '../../../../components'
import { logout } from '../../../../features/userSlice'
import { makeEncryptedRequest } from '../../../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const { email, phone } = ctx.query
  
  const { USER_AUTHORIZATION } = nookies.get(ctx)

  // TODO: cREATE THE ROUTE FOR THIS IN THE API ROUTE /api/agents/agentStats
  const agentStats = await makeEncryptedRequest(
    {
      requestId: uid({ length: 20 }),
      fromDate: moment().subtract(60, 'days').format('YYYY-MM-DD 12:00:00'),
      toDate: moment().format('YYYY-MM-DD 23:59:59'),
      pageId: 1,
      pageSize: 5,
      phoneNumberPri: phone,
      emailAddress: email,
    },
    'paysure/api/processor/each-user-info',
    'POST',
    USER_AUTHORIZATION,
  )
  
  console.log('>>>>>> ' + JSON.stringify(agentStats))
  return {
    props: {
      status: agentStats ? agentStats.status : 500,
      fallback: {
        '/api/agents/agentStats': agentStats ? agentStats.data : [],
      },
    },
  }
}


function AgentPage() {
  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR('/api/agents/agentStats', fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
  })

  return (
    <>
      <Head>
        <title>Agent | Paysure</title>
      </Head>

      <AgenttDashboard agentStats={data} />
    </>
  )
}

export default function Agent({ fallback, status }) {
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
      <AgentPage />
    </SWRConfig>
  )
}
