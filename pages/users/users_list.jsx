// imports
import uid from 'generate-unique-id'
import moment from 'moment'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import nookies, { destroyCookie } from 'nookies'
import React from 'react'
import { useDispatch } from 'react-redux'
import useSWR, { SWRConfig } from 'swr'

import { UserListDashboard } from '../../components'
import { logout } from '../../features/userSlice'
import { fetcher } from '../../utils/fetcher'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

export async function getServerSideProps(ctx) {
  const { USER_TOKEN } = nookies.get(ctx)

  const {
    query: {
      startDate,
      endDate,
      offset = 1,
      limit = 10,
      searchParameter,
      userType,
    },
  } = ctx

  const response = await fetcher(
    USER_TOKEN,
    'GET',
    `/apis/v1/paysure/users/admin/analytics/getUserAnalyticsTable?limit=${limit}&offset=${offset}${
      searchParameter === undefined ? '' : `&searchParameter=${searchParameter}`
    }${userType === undefined ? '' : `&userType=${userType}`}${
      startDate === undefined ? '' : `&startDate=${startDate}`
    }${endDate === undefined ? '' : `&endDate=${endDate}`}`,
  )

  if (response.status === 401) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  if (response.status > 399) {
    console.log(response.data)
  }

  return {
    props: {
      tableData: response.status > 399 ? [] : response.data,
    },
  }
}

export default function UsersList({ tableData }) {
  const router = useRouter()
  const { startDate, endDate, offset, searchParameter, userType } = router.query
  return (
    <>
      <Head>
        <title>User List | Paysure</title>
      </Head>

      <UserListDashboard
        tableData={tableData}
        page={offset}
        searchKey={searchParameter}
        toDate={endDate}
        fromDate={startDate}
      />
    </>
  )
}
