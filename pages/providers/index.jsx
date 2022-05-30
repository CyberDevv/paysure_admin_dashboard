import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import Router from 'next/router'
import useSWR, { SWRConfig } from 'swr'
import { useDispatch } from 'react-redux'
import nookies, { destroyCookie } from 'nookies'

import { logout } from '../../features/userSlice'
import { ProvidersDashboard } from '../../components'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const providerStats = await makeEncryptedRequest(
    {},
    'paysure/api/processor/lookup-provider-stats',
    'POST',
    USER_AUTHORIZATION,
  )

  const providersList = await makeEncryptedRequest(
    {
      fromDate: moment().subtract(60, 'days').format('YYYY-MM-DD 12:00:00'),
      toDate: moment().format('YYYY-MM-DD 23:59:59'),
      pageId: 1,
      pageSize: 5,
      searchKey: '',
      status: 1,
    },
    'paysure/api/processor/list-providers',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: providerStats ? providerStats.status : 500,
      status2: providersList ? providersList.status : 500,
      fallback: {
        '/api/providers/providerStats': providerStats ? providerStats.data : [],
        '/api/providers/providerList': providersList ? providersList.data : [],
      },
    },
  }
}

function ProviderPage() {
  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR('/api/providers/providerStats', fetcher)

  const { data: data2 } = useSWR('/api/providers/providerList', fetcher)

  return (
    <>
      <Head>
        <title>Providers | Paysure</title>
      </Head>

      <ProvidersDashboard providerStats={data} providersList={data2} />
    </>
  )
}

export default function Providers({ fallback, status, status2 }) {
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
      <ProviderPage />
    </SWRConfig>
  )
}
