import React from 'react'
import Head from 'next/head'
import nookies from 'nookies'
import Router from 'next/router'
import useSWR, { SWRConfig } from 'swr'
import { destroyCookie } from 'nookies'
import { useDispatch } from 'react-redux'

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
      searchKey: '',
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

  const { data } = useSWR('/api/providers/providerStats', fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
  })

  const { data: data2 } = useSWR('/api/providers/providerList', fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
  })

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

//   // const providerMetrics = await makeEncryptedRequest(
//   //   {
//   //     pageId: 1,
//   //     pageSize: 5,
//   //   },
//   //   'paysure/api/processor/list-providers-summaries',
//   //   'POST',
//   //   USER_AUTHORIZATION,
//   // )

//   // console.log('providerMetrics >>>>>' + JSON.stringify(providerMetrics))
