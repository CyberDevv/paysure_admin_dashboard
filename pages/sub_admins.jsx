// imports
import React from 'react'
import nookies from 'nookies'
import Head from 'next/head'

import { Sub_AccountsDashboard } from '../components'
import { fetcher } from '../utils/fetcher'

export async function getServerSideProps(ctx) {
  const { USER_TOKEN } = nookies.get(ctx)

  const response = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/admin/SubAdmin/getSubAdminTable?limit=10&offset=1',
  )

  if (response.status === 401) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      data: response.data,
    },
  }
}
// Page init
const Sub_Admins = ({ data }) => {
  return (
    <>
      <Head>
        <title>Sub Admins | Paysure</title>
      </Head>

      <Sub_AccountsDashboard subAdminsData={data} />
    </>
  )
}

// Page export
export default Sub_Admins
