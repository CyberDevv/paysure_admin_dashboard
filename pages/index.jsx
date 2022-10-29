import axios from 'axios'
import Head from 'next/head'
import nookies from 'nookies'
import React from 'react'

import { HomeDashboard } from '../components'

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
      `${process.env.BASE_URL}/apis/v1/paysure/admin/adminMainPage/analytics`,
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
    },
  }
}

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Home | Paysure</title>
      </Head>

      <HomeDashboard homePageStats={data} />
    </>
  )
}
