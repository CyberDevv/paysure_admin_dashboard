// imports
import React from 'react'
import Head from 'next/head'
import nookies from 'nookies'
import Router from 'next/router'
import { destroyCookie } from 'nookies'
import { useDispatch } from 'react-redux'

import { logout } from '../../features/userSlice'
import { ProvidersListDashboard } from '../../components'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

// Page init
const ProvidersList = ({ status, providersList }) => {
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
        <title>Providers List | Paysure</title>
      </Head>

      <ProvidersListDashboard providersList={providersList} />
    </>
  )
}

// getStaticProps
export async function getServerSideProps(ctx) {
  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const providersList = await makeEncryptedRequest(
    { searchKey: '' },
    'paysure/api/processor/list-providers',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: providersList ? providersList.status : {},
      providersList: providersList ? providersList.data : {},
    },
  }
}

// Page export
export default ProvidersList
