// imports
import React from 'react'
import moment from 'moment'
import Head from 'next/head'
import uid from 'generate-unique-id'
import useSWR, { SWRConfig } from 'swr'
import { useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'
import nookies, { destroyCookie } from 'nookies'

import { logout } from '../../features/userSlice'
import { UserListDashboard } from '../../components'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const {
    query: {
      fromDate = moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
      toDate = moment().format('YYYY-MM-DD 23:59:59'),
      page = 1,
      pageSize = 10,
      searchKey = '',
    },
  } = ctx

  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const usersList = await makeEncryptedRequest(
    {
      requestId: uid({ length: 20 }),
      fromDate: fromDate,
      toDate: toDate,
      pageId: page,
      pageSize: pageSize,
      searchKey: searchKey,
    },
    'paysure/api/processor/user-dashboard-stats-with-grid',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: usersList ? usersList.status : 500,
      fallback: {
        [`/api/users/usersListLists?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}&searchKey=${searchKey}`]:
          usersList ? usersList.data : [],
      },
    },
  }
}

function UsersListPage() {
  const router = useRouter()
  const {
    fromDate = moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
    toDate = moment().format('YYYY-MM-DD 23:59:59'),
    page = 1,
    pageSize = 10,
    searchKey = '',
  } = router.query

  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const { data } = useSWR(
    `/api/users/usersListLists?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}&searchKey=${searchKey}`,
    fetcher,
  )

  return (
    <>
      <Head>
        <title>User List | Paysure</title>
      </Head>

      <UserListDashboard
        usersList={data}
        page={page}
        searchKey={searchKey}
        toDate={toDate}
        fromDate={fromDate}
      />
    </>
  )
}

export default function UsersList({ fallback, status }) {
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
      <UsersListPage />
    </SWRConfig>
  )
}
