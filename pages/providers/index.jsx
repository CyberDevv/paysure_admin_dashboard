// imports
import React from 'react'
import Head from 'next/head'
import nookies from 'nookies'
import Router from 'next/router'
import { destroyCookie } from 'nookies'
import { useDispatch } from 'react-redux'

import { logout } from '../../features/userSlice'
import { ProvidersDashboard } from '../../components'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

// Page init
const Providers = ({ providerStats, providersList, status }) => {
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
        <title>Providers | Paysure</title>
      </Head>

      <ProvidersDashboard
        providerStats={providerStats}
        providersList={providersList}
      />
    </>
  )
}

// getStaticProps
export async function getServerSideProps(ctx) {
  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const providerStats = await makeEncryptedRequest(
    {},
    'paysure/api/processor/lookup-provider-stats',
    'POST',
    USER_AUTHORIZATION,
  )

  const providersList = await makeEncryptedRequest(
    { searchKey: '' },
    'paysure/api/processor/list-providers',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: providerStats ? providerStats.status : {},
      providersList: providersList ? providersList.data : {},
      providerStats: providerStats ? providerStats.data : {},
    },
  }
}

// Page export
export default Providers
