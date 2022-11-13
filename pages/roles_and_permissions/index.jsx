import Head from 'next/head'
import nookies from 'nookies'
import React from 'react'

import { fetcher } from '../../utils/fetcher'
import { Roles_and_PermissionsDashboard } from '../../components'

export async function getServerSideProps(ctx) {
  const { USER_TOKEN } = nookies.get(ctx)

  const response = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/admin/rolesAndPermissions/roles/getAllRoles',
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
const Roles_and_Permissions = ({data}) => {
  return (
    <>
      <Head>
        <title>Roles and Permissions | Paysure</title>
      </Head>

      <Roles_and_PermissionsDashboard RandPData= {data} />
    </>
  )
}

// Page export
export default Roles_and_Permissions
