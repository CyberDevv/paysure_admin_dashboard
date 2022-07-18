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
import { UserTransactionListDashboard } from '../../../components'
import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const {
    query: {
      phone,
      userName,
      email,
      fromDate = moment().subtract(400, 'days').format('YYYY-MM-DD 12:00:00'),
      toDate = moment().format('YYYY-MM-DD 23:59:59'),
      page = 1,
      pageSize = 10,
      status = 0,
      searchKey = '',
    },
  } = ctx

  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const formattedPhone = `+${phone.replace(/\D/g, '')}`
  
  const userTransList = await makeEncryptedRequest(
    {
      requestId: uid({ length: 20 }),
      fromDate: fromDate,
      toDate: toDate,
      pageId: page,
      pageSize: pageSize,
      phoneNumberPri: formattedPhone,
      emailAddress: email,
      status: status,
      searchKey: searchKey,
    },
    'paysure/api/processor/each-user-info',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: userTransList ? userTransList.status : 500,
      fallback: {
        [`/api/users/user/${userName}?phone=${formattedPhone}&email=${email}&fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}&status=${status}&search=${searchKey}`]:
          userTransList ? userTransList.data : [],
      },
    },
  }
}

function ProviderListPage() {
  const router = useRouter()
  const {
    phone,
    email,
    userName,
    fromDate = moment().subtract(400, 'days').format('YYYY-MM-DD 12:00:00'),
    toDate = moment().format('YYYY-MM-DD 23:59:59'),
    page = 1,
    pageSize = 10,
    status = 0,
    searchKey = '',
  } = router.query

  async function fetcher(url) {
    const res = await fetch(url)
    return res.json()
  }

  const formattedPhone = `+${phone.replace(/\D/g, '')}`

  const { data } = useSWR(
    `/api/users/user/${userName}?phone=${formattedPhone}&email=${email}&fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}&status=${status}&search=${searchKey}`,
    fetcher,
    )
    
  return (
    <>
      <Head>
        <title>{userName} - Transaction Record | Paysure</title>
      </Head>

      <UserTransactionListDashboard
        userName={userName}
        transactionData={data}
        toDate={toDate}
        fromDate={fromDate}
        page={page}
        searchKey={searchKey}
        status={status}
      />
    </>
  )
}

export default function TransactionList({ fallback, status }) {
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
      <ProviderListPage />
    </SWRConfig>
  )
}
