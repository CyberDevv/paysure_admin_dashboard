// imports
import Head from 'next/head'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import React from 'react'

import { UserTransactionListDashboard } from '../../../components'
import { fetcher } from '../../../utils/fetcher'

// username

export async function getServerSideProps(ctx) {
  const { USER_TOKEN } = nookies.get(ctx)

  const {
    query: { startDate, endDate, offset = 1, limit = 10, username },
  } = ctx

  const response = await fetcher(
    USER_TOKEN,
    'GET',
    `/apis/v1/paysure/users/admin/analytics/getUserTransactionsTable?limit=${limit}&offset=${offset}${
      username === undefined ? '' : `&userName=${username}`
    }${startDate === undefined ? '' : `&startDate=${startDate}`}${
      endDate === undefined ? '' : `&endDate=${endDate}`
    }`,
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

export default function TransactionList({ tableData }) {
  console.log(
    '🚀 ~ file: transaction_list.jsx ~ line 50 ~ TransactionList ~ tableData',
    tableData,
  )
  const router = useRouter()
  const { startDate, endDate, offset, username } = router.query
  return (
    <>
      <Head>
        <title>Transaction Record | Paysure</title>
      </Head>

      <UserTransactionListDashboard
        tableData={tableData}
        page={offset}
        username={username}
        toDate={endDate}
        fromDate={startDate}
      />
    </>
  )
}
