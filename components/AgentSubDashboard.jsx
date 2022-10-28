import { Button, Tooltip } from '@mui/material'
import moment from 'moment'
import Router from 'next/router'
import React from 'react'
import tw from 'twin.macro'

import CurrencyFormat from 'react-currency-format'
import { DataGridViewTemp, HomeDisplayCard } from '.'
import BarChat from './BarChat'
import { EditActionSVG, ViewActionSVG } from './SVGIcons'

const AgentsDashboard = ({ superAgentData = [] }) => {
  const { transStats = [], trxInfo = [] } = superAgentData

  // Data array of super agents stats
  const agentStats = [
    {
      amount: '32201',
      title: 'Total transactions',
      link: '/agents/super_agents_list',
    },
    {
      amount: '213',
      title: 'Total number of agents',
      link: '/agents/super_agents_list',
    },
    {
      amount: '213',
      title: 'Total number of active agents',
    },
    {
      amount: '213',
      title: 'Total number of inactive agents',
    },
  ]

  // DataGrid rows
  let rows
  // check if trxInfo is an array
  if (Array.isArray(trxInfo)) {
    rows = trxInfo.map((superAgent, index) => {
      console.log(superAgent.dateAdded)

      return {
        id: superAgent.tid,
        col1: index + 1,
        col2: superAgent.fullName,
        col3: superAgent.noOfAgents,
        col4: superAgent.AgentsTerminal,
        col5: superAgent.transCount,
        col6: superAgent.transSum,
        col7: superAgent.walletBalance,
        col8: superAgent.dateAdded,
        col9: superAgent.statusStr,
        col10: '',
        email: superAgent.emailAddress,
        phone: superAgent.phonePri,
      }
    })
  } else {
    rows = []
  }

  return (
    <>
      <div css={[tw`flex items-center justify-between`]}>
        <Ttile className="font-bold">Agents</Ttile>
      </div>

      <HomeDisplayCard data={agentStats} />

      <BarChat
        title={'Performance of Agents'}
        categories={[
          'AGENT 1',
          'AGENT 2',
          'AGENT 3',
          'AGENT 4',
          'AGENT 5',
          'AGENT 6',
          'AGENT 7',
          'AGENT 8',
        ]}
      />

      <DataGridViewTemp
        limited
        link="/agents/super_agents_list"
        title="Agent list"
        rows={rows}
        columns={columns}
        columnVisibilityModel={{ email: false, phone: false }}
      />
    </>
  )
}

const columns = [
  {
    field: 'col1',
    headerName: 'S/N',
    minWidth: 71,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return <span>{params.row.col1}.</span>
    },
  },
  {
    field: 'col2',
    headerName: 'Super Agent Name',
    minWidth: 227,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'No. of Agents',
    minWidth: 236,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Terminals',
    minWidth: 193,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <div tw="space-x-1">
          {params.row.col4.slice(0, 2).map((item, index) => {
            return (
              <span
                key={index}
                css={[
                  tw`bg-paysure-10 text-paysure-100 text-[10px] uppercase p-1 rounded`,
                ]}
              >
                {item}
              </span>
            )
          })}
          {params.row.col4.length > 2 && (
            <span tw="ml-4">+{params.row.col4.length - 2}</span>
          )}
        </div>
      )
    },
  },
  {
    field: 'col5',
    headerName: 'No. of Transactions',
    minWidth: 176,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col6',
    headerName: 'Transactions{N}',
    minWidth: 150,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <CurrencyFormat
          value={params.row.col6}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      )
    },
  },
  {
    field: 'col7',
    headerName: 'Wallet Balance',
    minWidth: 144,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <CurrencyFormat
          value={params.row.col7}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      )
    },
  },
  {
    field: 'col8',
    headerName: 'Date Added',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return <span>{moment(params.row.col8).format('MMM DD, YYYY HH:mm')}</span>
    },
  },
  {
    field: 'col9',
    headerName: 'Status',
    minWidth: 140,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <span
          css={
            params.row.col9.toLowerCase() !== 'active'
              ? tw`bg-[#FDF6EF] text-paysure-danger-100 text-[10px] uppercase p-1 rounded`
              : tw`bg-[#E9FBF9] text-paysure-success-100 text-[10px] uppercase p-1 rounded`
          }
        >
          {params.row.col9}
        </span>
      )
    },
  },
  {
    field: 'col10',
    headerName: 'Actions',
    minWidth: 100,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      const handleEdit = () => {
        console.log('edit')
      }

      const handleView = e => {
        const api = params.api
        const thisRow = {}

        api
          .getAllColumns()
          .filter(c => c.field !== '__check__' && !!c)
          .forEach(
            c => (thisRow[c.field] = params.getValue(params.id, c.field)),
          )

        Router.push({
          pathname: `/agents/agentt/${thisRow.col2}`,
          query: { email: thisRow.email, phone: thisRow.phone },
        })
      }

      return (
        <div tw="space-x-1">
          <Tooltip title="Edit Super Agent">
            <button onClick={handleEdit}>
              <EditActionSVG />
            </button>
          </Tooltip>

          <Tooltip title="View Super Agent">
            <button onClick={handleView}>
              <ViewActionSVG />
            </button>
          </Tooltip>
        </div>
      )
    },
  },
  {
    field: 'email',
    minWidth: 123,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'phone',
    minWidth: 123,
    flex: 1,
    headerClassName: 'grid-header',
  },
]

// Tailwind Styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 pl-3.5 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`
const FlexBox = tw.div`flex items-center justify-between space-x-4`

export default AgentsDashboard
