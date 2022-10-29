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
  const response = await axios.get(
    `${process.env.BASE_URL}/apis/bizzdeskgroup/users/admin/adminUserDasboard/analytics`,
    {
      headers: {
        Authorization: `Bearer ${USER_TOKEN}`,
      },
    },
  )

  // if status is 401, redirect to login page
  // if (response.status === 401) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    props: {
      data: response.data,
    },
  }
}

export default function Users({ data }) {
  return (
    <>
      <Head>
        <title>Users | Paysure</title>
      </Head>

      <UsersDashboard usersStats={data} />
    </>
  )
}
