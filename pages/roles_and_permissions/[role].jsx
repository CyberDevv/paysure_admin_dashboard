// imports
import React from 'react'
import nookies from 'nookies'
import Head from 'next/head'

import { AdminstratorDashboard } from '../../components'
import { fetcher } from '../../utils/fetcher'

export async function getServerSideProps(ctx) {
  const { role } = ctx.query

  const { USER_TOKEN } = nookies.get(ctx)

  const response = await fetcher(
    USER_TOKEN,
    'GET',
    `/apis/v1/paysure/admin/rolesAndPermissions/roles/getRole?roleTitle=${role}`,
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
      data: response.status > 399 ? [] : response.data,
    },
  }
}
// Page init
const Adminstrator = ({ data }) => {
  return (
    <>
      <Head>
        <title>{data.roleTitle} - Role and Permissions | Paysure</title>
      </Head>

      <AdminstratorDashboard roleData={data} />
    </>
  )
}

// Page export
export default Adminstrator
