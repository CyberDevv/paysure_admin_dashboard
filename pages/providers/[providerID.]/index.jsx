// imports
import React from 'react'
import Head from 'next/head'
import nookies from 'nookies'
import Router from 'next/router'
import uid from 'generate-unique-id'
import { destroyCookie } from 'nookies'
import { useDispatch } from 'react-redux'

import { logout } from '../../../features/userSlice'
import { ProviderDashboard } from '../../../components'
import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

// Page init
const Provider = ({ status, data }) => {
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
        <title>Provider | Paysure</title>
      </Head>

      <ProviderDashboard providerData={data} />
    </>
  )
}

// getServerSideProps
export async function getServerSideProps(ctx) {
  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const response = await makeEncryptedRequest(
    {
      requestId: uid({ length: 20 }),
      fromDate: '2021-03-31 23:59:59',
      toDate: '2022-04-30 23:59:59',
      pageId: 1,
      pageSize: 10,
      provider: 'KUDA',
    },
    'paysure/api/processor/each-provider',
    'POST',
    USER_AUTHORIZATION,
  )

  console.log(response)
  
  return {
    props: {
      status: response ? response.status : '500',
      data: response ? response.data : {},
    },
  }
}

// Page export
export default Provider
