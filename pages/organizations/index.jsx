import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import nookies from 'nookies'
import Router from 'next/router'
import useSWR, { SWRConfig } from 'swr'
import { destroyCookie } from 'nookies'
import { useDispatch } from 'react-redux'

import { logout } from '../../features/userSlice'
import { OrganizationsDashboard } from '../../components'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const { USER_AUTHORIZATION } = nookies.get(ctx)

  // TODO: cREATE THE ROUTE FOR THIS IN THE API ROUTE /api/organizations/organizationList
  const organizationList = await makeEncryptedRequest(
    {
      // fromDate: moment().subtract(30, 'days').format('YYYY-MM-DD hh:mm:ss'),
      // toDate: moment().format('YYYY-MM-DD hh:mm:ss'),
      // status: '0',
      pageId: 1,
      pageSize: 5,
    },
    'paysure/api/processor/list-partners',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: organizationList ? organizationList.status : 500,
      fallback: {
        '/api/organizations/organizationList': organizationList
          ? organizationList.data
          : [],
      },
    },
  }
}

function OrganizationPage() {
  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR('/api/organizations/organizationList', fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
  })

  return (
    <>
      <Head>
        <title>Organizations | Paysure</title>
      </Head>

      <OrganizationsDashboard organizationList={data} />
    </>
  )
}

export default function Organization({ fallback, status }) {
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
      <OrganizationPage />
    </SWRConfig>
  )
}
