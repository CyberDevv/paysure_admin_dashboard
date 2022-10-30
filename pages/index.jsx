import Head from 'next/head'
import nookies from 'nookies'
import React from 'react'

import { fetcher } from '../utils/fetcher'
import { HomeDashboard } from '../components'

export async function getServerSideProps(ctx) {
  const { USER_TOKEN } = nookies.get(ctx)

  const response = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/admin/adminMainPage/analytics',
  )

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
