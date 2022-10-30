// imports
import Head from 'next/head'
import nookies from 'nookies'
import React from 'react'

import { TerminalsDashboard } from '../../components'
import { fetcher } from '../../utils/fetcher'

export async function getServerSideProps(ctx) {
  const { USER_TOKEN } = nookies.get(ctx)

  const response = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/terminals/analytics',
  )

  const response2 = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/terminals/getTerminals?limit=5&offset=1',
  )

  const response3 = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/terminals/analytics/getTerminalsByAgent?limit=5&offset=1',
  )

  const response4 = await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/terminals/analytics/getTerminalsByBank?limit=5&offset=1',
  )

  return {
    props: {
      data: response.data,
      tableData: response2.data,
      agentTableData: response3.data,
      bankTableData: response4.data,
    },
  }
}

export default function Terminals({ data, tableData, agentTableData, bankTableData }) {

  const terminalData = [data, tableData, agentTableData, bankTableData]
  
  return (
    <>
      <Head>
        <title>Terminals | Paysure</title>
      </Head>

      <TerminalsDashboard terminalData={terminalData} />
    </>
  )
}
