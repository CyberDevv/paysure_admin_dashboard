// imports
import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import nookies from 'nookies'
import Router from 'next/router'
import uid from 'generate-unique-id'
import useSWR, { SWRConfig } from 'swr'
import { destroyCookie } from 'nookies'
import { useDispatch } from 'react-redux'

import { logout } from '../../../../features/userSlice'
import { SuperAgentDashboard } from '../../../../components'
import { makeEncryptedRequest } from '../../../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const { email, phone } = ctx.query

  const { USER_AUTHORIZATION } = nookies.get(ctx)

  // TODO: cREATE THE ROUTE FOR THIS IN THE API ROUTE /api/agents/superAgentStats
  const superAgentStats = await makeEncryptedRequest(
    {
      requestId: uid({ length: 20 }),
      fromDate: moment().subtract(30, 'days').format('YYYY-MM-DD hh:mm:ss'),
      toDate: moment().format('YYYY-MM-DD hh:mm:ss'),
      pageId: 1,
      pageSize: 5,
      phoneNumberPri: phone,
      emailAddress: email,
    },
    'paysure/api/processor/each-user-info',
    'POST',
    USER_AUTHORIZATION,
  )

  console.log('>>>>>> ' + JSON.stringify(superAgentStats))
  return {
    props: {
      status: superAgentStats ? superAgentStats.status : 500,
      fallback: {
        '/api/agents/superAgentStats': superAgentStats
          ? superAgentStats.data
          : [],
      },
    },
  }
}

function SuperAgentPage() {
  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR('/api/agents/superAgentStats', fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
  })

  return (
    <>
      <Head>
        <title>Aggregator | Paysure</title>
      </Head>

      <SuperAgentDashboard superAgentStats={data} />
    </>
  )
}

export default function SuperAgent({ fallback, status }) {
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
      <SuperAgentPage />
    </SWRConfig>
  )
}
