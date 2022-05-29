import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import Router from 'next/router'
import useSWR, { SWRConfig } from 'swr'
import { useDispatch } from 'react-redux'
import nookies, { destroyCookie } from 'nookies'

import { logout } from '../../features/userSlice'
import { SignupsDashboard } from '../../components'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const { USER_AUTHORIZATION } = nookies.get(ctx)

  // TODO: cREATE THE ROUTE FOR THIS IN THE API ROUTE /api/signups/signupsList
  const signupsList = await makeEncryptedRequest(
    {
      fromDate: moment().subtract(60, 'days').format('YYYY-MM-DD 12:00:00'),
      toDate: moment().format('YYYY-MM-DD 23:59:59'),
      // status: '0',
      pageId: 1,
      pageSize: 5,
    },
    'paysure/api/processor/signup-stats-with-grid',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: signupsList ? signupsList.status : 500,
      fallback: {
        '/api/signups/signupsList': signupsList ? signupsList.data : [],
      },
    },
  }
}

function SignupsPage() {
  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR('/api/signups/signupsList', fetcher)

  return (
    <>
      <Head>
        <title>Signups | Paysure</title>
      </Head>

      <SignupsDashboard signupsList={data} />
    </>
  )
}

export default function Signups({ fallback, status }) {
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
      <SignupsPage />
    </SWRConfig>
  )
}
