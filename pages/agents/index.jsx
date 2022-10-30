import nookies from 'nookies'
import React from 'react'

import { SinglarSuperAgentDashboard } from '../../components'
import { fetcher } from '../../utils/fetcher'

export async function getServerSideProps(ctx) {
  const { USER_TOKEN } = nookies.get(ctx)

  const response = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/aggregator/admin/CLM/analytics',
  )

  const clmTableResponse = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/aggregator/admin/analytics/getClusterManagersAnalyticsTable?limit=5&offset=1',
  )

  return {
    props: {
      data: response.data,
      clmTableData: clmTableResponse.data,
    },
  }
}

export default function Agent({ data, clmTableData }) {
  const clmData = [data, clmTableData]

  return (
    <>
      <SinglarSuperAgentDashboard clmData={clmData} />
    </>
  )
}
