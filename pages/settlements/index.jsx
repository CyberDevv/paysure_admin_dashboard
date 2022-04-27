// imports
import React from 'react'
import Head from 'next/head'
import nookies from 'nookies'
import Router from 'next/router'
import uid from 'generate-unique-id'
import { destroyCookie } from 'nookies'
import { useDispatch } from 'react-redux'

import { logout } from '../../features/userSlice'
import { SettlementsDashboard } from '../../components'
import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

// Page init
const Settlements = ({ status, data }) => {
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
  })

  return (
    <>
      <Head>
        <title>Settlements | Paysure</title>
      </Head>

      <SettlementsDashboard settlementData={data} />
    </>
  )
}

// getServerSideProps
export async function getServerSideProps(ctx) {
  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const response = await makeEncryptedRequest(
    {
      requestId: uid({ length: 20 }),
      fromDate: '2021-03-31 23:59:59',
      toDate: '2022-04-30 23:59:59',
      pageId: 1,
      pageSize: 2,
    },
    'paysure/api/processor/admin-settlement-paged-th',
    'POST',
    USER_AUTHORIZATION,
  )

  return {
    props: {
      status: response ? response.status : '500',
      data: response ? response.data : {},
    },
  }
}

// Page export
export default Settlements
