// imports
import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import nookies from 'nookies'
import Router from 'next/router'
import uid from 'generate-unique-id'
import { destroyCookie } from 'nookies'
import useSWR, { SWRConfig } from 'swr'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { logout } from '../../../features/userSlice'
import { ProviderDashboard } from '../../../components'
import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const {
    query: { providerName },
  } = ctx

  const { USER_AUTHORIZATION } = nookies.get(ctx)

  // TODO: create api route for paysure/api/processor/each-provider
  const providerStats = await makeEncryptedRequest(
    {
      requestId: uid({ length: 20 }),
      fromDate: moment().subtract(30, 'days').format('YYYY-MM-DD hh:mm:ss'),
      toDate: moment().format('YYYY-MM-DD hh:mm:ss'),
      pageId: 1,
      pageSize: 10,
      provider: providerName,
    },
    'paysure/api/processor/each-provider',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: providerStats ? providerStats.status : 500,
      fallback: {
        '/api/providers/eachProviderStats': providerStats
          ? providerStats.data
          : [],
      },
    },
  }
}

function ProviderPage() {
  const router = useRouter()
  const { providerName } = router.query

  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR('/api/providers/eachProviderStats', fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
  })

  return (
    <>
      <Head>
        <title>Provider - {providerName} | Paysure</title>
      </Head>

      <ProviderDashboard providerName= {providerName} providerData={data} />
    </>
  )
}

export default function EachProvider({ fallback, status }) {
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
      <ProviderPage />
    </SWRConfig>
  )
}
