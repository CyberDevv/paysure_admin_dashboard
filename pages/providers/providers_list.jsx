// imports
import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import useSWR, { SWRConfig } from 'swr'
import { useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'
import nookies, { destroyCookie } from 'nookies'

import { logout } from '../../features/userSlice'
import { ProvidersListDashboard } from '../../components'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const {
    query: {
      fromDate = moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
      toDate = moment().format('YYYY-MM-DD 23:59:59'),
      page = 1,
      pageSize = 10,
      searchKey = '',
      status = 0,
    },
  } = ctx

  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const providersList = await makeEncryptedRequest(
    {
      fromDate: fromDate,
      toDate: toDate,
      pageId: page,
      pageSize: pageSize,
      searchKey: searchKey,
      status: status,
    },
    'paysure/api/processor/list-providers',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: providersList ? providersList.status : 500,
      fallback: {
        [`/api/providers/providersListLists?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}&searchKey=${searchKey}&status=${status}`]:
          providersList ? providersList.data : [],
      },
    },
  }
}

function ProvidersListPage() {
  const router = useRouter()
  const {
    fromDate = moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
    toDate = moment().format('YYYY-MM-DD 23:59:59'),
    page = 1,
    pageSize = 10,
    searchKey = '',
    status = 0,
  } = router.query

  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR(
    `/api/providers/providersListLists?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}&searchKey=${searchKey}&status=${status}`,
    fetcher,
  )

  return (
    <>
      <Head>
        <title>Providers List| Paysure</title>
      </Head>

      <ProvidersListDashboard
        providersList={data}
        page={page}
        searchKey={searchKey}
        status={status}
        toDate={toDate}
        fromDate={fromDate}
      />
    </>
  )
}

export default function ProvidersList({ fallback, status }) {
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
      <ProvidersListPage />
    </SWRConfig>
  )
}
