import nookies from 'nookies'
import React from 'react'

import { SignupsDashboard } from '../../components'
import { fetcher } from '../../utils/fetcher'

export async function getServerSideProps(ctx) {
  const { USER_TOKEN } = nookies.get(ctx)

  const response = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/signups/CLMSignups/metrics',
  )

  const clmTableData = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/signups/agentsSignups/findAllByCLMFullnameAndStatus?limit=5&offset=1',
  )

  const aggData = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/signups/aggregatorsSignups/metrics',
  )

  const aggTableData = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/signups/agentsSignups/findAllByAggregatorsFullnameAndStatus?limit=5&offset=1',
  )

  const agtData = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/signups/agentsSignups/metrics',
  )

  const agtTableData = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/signups/agentsSignups/findAllByAgentsFullnameAndStatus?limit=5&offset=1',
  )

  const userData = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/signups/usersSignups/metrics',
  )

  const usrTableData = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/signups/agentsSignups/findAllByUserFullnameAndStatus?limit=5&offset=1',
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
      aggData: aggData.data,
      agtData: agtData.data,
      usrData: userData.data,
      clmTableData: clmTableData.data,
      aggTableData: aggTableData.data,
      agtTableData: agtTableData.data,
      usrTableData: usrTableData.data,
    },
  }
}

export default function SignupsPage({
  data,
  clmTableData,
  aggData,
  aggTableData,
  agtData,
  agtTableData,
  usrData,
  usrTableData,
}) {
  const clmData = [data, clmTableData]
  const aggregatorData = [aggData, aggTableData]
  const agentData = [agtData, agtTableData]
  const userData = [usrData, usrTableData]

  return (
    <>
      <SignupsDashboard
        clmData={clmData}
        aggregatorData={aggregatorData}
        agentData={agentData}
        userData={userData}
      />
    </>
  )
}
