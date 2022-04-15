// imports
import React from 'react'
import Head from 'next/head'
import nookies from 'nookies'
import Router from 'next/router'
import { destroyCookie } from 'nookies'
import { useDispatch } from 'react-redux'

import { logout } from '../../features/userSlice'
import { AgentsListDashboard } from '../../components'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

// Page init
const AgentsList = ({ status, data }) => {
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
  })

  return (
    <>
      <Head>
        <title>Agents List | Paysure</title>
      </Head>

      <AgentsListDashboard agentData={data} />
    </>
  )
}

// getServerSideProps
export async function getServerSideProps(ctx) {
  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const response = await makeEncryptedRequest(
    { pageId: 1, pageSize: 5 },
    'paysure/api/processor/agents-stats',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: response ? response.status : {},
      data: response ? response.data : {},
    },
  }
}

// Page export
export default AgentsList
