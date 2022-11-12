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

  const clmBarChart = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/aggregator/admin/ClusterManager/analytics/getPerformanceAnlytics?limit=8&offset=1',
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

  const aggregatorBarChat = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/aggregator/admin/aggregators/analytics/getPerformanceAnlytics?limit=8&offset=1',
  )

  const agentResponse = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/paysure/agents/analytics',
  )

  const agentTableResponse = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/paysure/agents/admin/analytics/getAgentAnalyticsTable?limit=5&offset=1',
  )

  const agentBarChat = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/paysure/agents/admin/analytics/getPerformanceAnlytics?limit=8&offset=1',
  )

  if (
    response.status === 401 ||
    clmTableResponse.status === 401 ||
    aggregatorResponse.status === 401 ||
    aggregatorTableResponse.status === 401 ||
    agentResponse.status === 401 ||
    agentTableResponse.status === 401
  ) {
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
      clmTableData: clmTableResponse.data,
      aggData: aggregatorResponse.data,
      aggTableData: aggregatorTableResponse.data,
      agtData: agentResponse.data,
      agtTableData: agentTableResponse.data,
      agentBarChat: agentBarChat.data,
      aggregatorBarChat: aggregatorBarChat.data,
      clmBarChart: clmBarChart.data,
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
  agentBarChat,
  aggregatorBarChat,
  clmBarChart,
}) {
  const clmData = [data, clmTableData, clmBarChart]
  const aggregatorData = [aggData, aggTableData, aggregatorBarChat]
  const agentData = [agtData, agtTableData, agentBarChat]

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
