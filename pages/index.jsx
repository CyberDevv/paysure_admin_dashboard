// imports
import React from 'react'
import Head from 'next/head'
import nookies from 'nookies'
import Router from 'next/router'
import uid from 'generate-unique-id'
import { destroyCookie } from 'nookies'
import { useDispatch } from 'react-redux'

import { HomeDashboard } from '../components'
import { logout } from '../features/userSlice'
import { makeEncryptedRequest } from '../utils/makeEncryptedRequest'

// Page init
const IndexPage = ({ status, data, status2, data2 }) => {
  // dispatch
  const dispatch = useDispatch()

  // useEffect hook
  React.useEffect(() => {
    if ((status || status2) === 873) {
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
        <title>Home | Paysure</title>
      </Head>

      <HomeDashboard homePageGrid={data} homePageStats={data2} />
    </>
  )
}

// getServerSideProps
export async function getServerSideProps(ctx) {
  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const response2 = await makeEncryptedRequest(
    {},
    'paysure/api/processor/admin-home-page-stats',
    'POST',
    USER_AUTHORIZATION,
  )

  const response = await makeEncryptedRequest(
    {
      requestId: uid({ length: 20 }),
      fromDate: '2021-03-31 23:59:59',
      toDate: '2022-04-30 23:59:59',
      pageId: 1,
      pageSize: 2,
    },
    'paysure/api/processor/admin-dashboard-stats-with-grid',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: response ? response.status : '500',
      data: response ? response.data : {},
      status2: response2 ? response2.status : '500',
      data2: response2 ? response2.data : {},
    },
  }
}

// Page export
export default IndexPage
