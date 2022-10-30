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

  const aggregatorResponse = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/aggregator/admin/aggregators/analytics',
  )

  const aggregatorTableResponse = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/aggregator/admin/analytics/getAggregatorsAnalyticsTable?limit=5&offset=1',
  )

  const agentResponse = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/aggregator/admin/aggregators/analytics',
  )

  const agentTableResponse = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/paysure/agents/admin/analytics/getAgentAnalyticsTable?limit=5&offset=1',
  )

  return {
    props: {
      data: response.data,
      clmTableData: clmTableResponse.data,
      aggData: aggregatorResponse.data,
      aggTableData: aggregatorTableResponse.data,
      agtData: agentResponse.data,
      agtTableData: agentTableResponse.data,
    },
  }
}

export default function Agent({
  data,
  clmTableData,
  aggData,
  aggTableData,
  agtData,
  agtTableData,
}) {
  const clmData = [data, clmTableData]
  const aggregatorData = [aggData, aggTableData]
  const agentData = [agtData, agtTableData]

  return (
    <>
      <SinglarSuperAgentDashboard
        clmData={clmData}
        aggregatorData={aggregatorData}
        agentData={agentData}
      />
    </>
  )
}
