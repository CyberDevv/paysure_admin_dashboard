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

  const aggData = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/signups/aggregatorsSignups/metrics',
  )

  const agtData = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/signups/agentsSignups/metrics',
  )

  const userData = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/signups/usersSignups/metrics',
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
}) {
  const clmData = [data, clmTableData]
  const aggregatorData = [aggData, aggTableData]
  const agentData = [agtData, agtTableData]
  const userData = [usrData, agtTableData]

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
