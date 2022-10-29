import axios from 'axios'
import Head from 'next/head'
import nookies from 'nookies'
import React from 'react'

import { UsersDashboard } from '../../components'

export async function getServerSideProps(ctx) {
  const { USER_TOKEN } = nookies.get(ctx)

  // check if user is logged in, if not, redirect to login page
  if (!USER_TOKEN) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  // fetch data from server
  const response = await axios
    .get(
      `${process.env.BASE_URL}/apis/bizzdeskgroup/users/admin/adminUserDasboard/analytics`,
      {
        headers: {
          Authorization: `Bearer ${USER_TOKEN}`,
        },
      },
    )
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err.response.data)
      return { data: err.response.data }
    })

  const response2 = await axios
    .get(
      `${process.env.BASE_URL}/apis/bizzdeskgroup/users/admin/analytics/getUserAnalyticsTable?limit=5&offset=1`,
      {
        headers: {
          Authorization: `Bearer ${USER_TOKEN}`,
        },
      },
    )
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err.response.data)
      return { data: err.response.data }
    })

  return {
    props: {
      data: response.data,
      tableData: response2.data,
    },
  }
}

export default function Users({ data, tableData }) {
  console.log('🚀 ~ file: index.jsx ~ line 65 ~ Users ~ tableData', tableData)
  return (
    <>
      <Head>
        <title>Users | Paysure</title>
      </Head>

      <UsersDashboard usersStats={data} />
    </>
  )
}
