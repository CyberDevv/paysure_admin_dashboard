import { Button, Tooltip } from '@mui/material'
import moment from 'moment'
import React from 'react'
import tw from 'twin.macro'

import Head from 'next/head'
import CurrencyFormat from 'react-currency-format'
import { DataGridViewTemp, HomeMetricCard } from '.'
import numberFormatter from '../utils/numberFormatter'
import BarChat from './BarChat'
import { EditActionSVG, ViewActionSVG } from './SVGIcons'

const AggregatorsDashboard = ({ aggregatorData = [] }) => {
  // Data array of super agents stats
  const aggregatorsStats = [
    {
      amount: numberFormatter(aggregatorData[0].totalAggregator),
      title: 'Total number of Aggregators',
    },
    {
      amount: numberFormatter(aggregatorData[0].totalActiveAggregator),
      title: 'Total number of active Aggregators',
    },
    {
      amount: numberFormatter(aggregatorData[0].totalInactiveAggregator),
      title: 'Total number of inactive Aggregators',
    },
  ]

  // DataGrid rows
  const rows = aggregatorData[1].map((item, index) => {
    return {
      id: index,
      col1: index + 1,
      name: item.fullname,
      noOfAgents: item.noOfAgents,
      terminals: item.terminals,
      noOfTransactions: item.noOfTransactions,
      transactions: item.totalAmountInTransactions,
      walletBalance: item.walletBalance,
      dateAdded: item.dateAdded,
      status: item.status,
      actions: '',
    }
  })

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
      field: 'name',
      headerName: 'Aggregator Name',
      minWidth: 227,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'noOfAgents',
      headerName: 'No. of Agents',
      minWidth: 236,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'terminals',
      headerName: 'Terminals',
      minWidth: 193,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <div>
            {params.row.terminals.length !== 0 ? (
              <div tw="space-x-1">
                {params.row.terminals.slice(0, 2).map((item, index) => {
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
                {params.row.terminals.length > 2 && (
                  <span tw="ml-4">+{params.row.col5.length - 2}</span>
                )}
              </div>
            ) : (
              <spn>0</spn>
            )}
          </div>
        )
      },
    },
    {
      field: 'noOfTransactions',
      headerName: 'No. of Transactions',
      minWidth: 176,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'transactions',
      headerName: 'Transactions{N}',
      minWidth: 150,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <CurrencyFormat
            value={params.row.transactions}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          />
        )
      },
    },
    {
      field: 'walletBalance',
      headerName: 'Wallet Balance',
      minWidth: 144,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <CurrencyFormat
            value={params.row.walletBalance}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          />
        )
      },
    },
    {
      field: 'dateAdded',
      headerName: 'Date Added',
      minWidth: 153,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span>
            {moment(params.row.dateAdded).format('MMM DD, YYYY HH:mm')}
          </span>
        )
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 140,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span
            css={
              params.row.status.toLowerCase() !== 'active'
                ? tw`bg-[#FDF6EF] text-paysure-danger-100 text-[10px] uppercase p-1 rounded`
                : tw`bg-[#E9FBF9] text-paysure-success-100 text-[10px] uppercase p-1 rounded`
            }
          >
            {params.row.status}
          </span>
        )
      },
    },
    {
      field: 'actions',
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

          // Router.push(`/agents/super_agent/${thisRow.col1}`)
        }

        return (
          <div tw="space-x-1">
            <Tooltip title="Edit Aggregator">
              <button onClick={handleEdit}>
                <EditActionSVG />
              </button>
            </Tooltip>

            <Tooltip title="View Aggregator">
              <button onClick={handleView}>
                <ViewActionSVG />
              </button>
            </Tooltip>
          </div>
        )
      },
    },
  ]

  return (
    <>
      <Head>
        <title>Aggregators | Paysure</title>
      </Head>

      <div css={[tw`flex items-center justify-between`]}>
        <Ttile className="font-bold">Aggregators</Ttile>
      </div>

      <div tw="grid mt-10 grid-cols-2 gap-3 md:grid-cols-3 lg:(gap-5)">
        {aggregatorsStats.map((item, index) => (
          <HomeMetricCard.PlainCard
            key={index}
            amount={item.amount}
            title={item.title}
          />
        ))}
      </div>

      <BarChat
        title={'Performance of Aggregators'}
        categories={[
          'AGGREGATOR 1',
          'AGGREGATOR 2',
          'AGGREGATOR 3',
          'AGGREGATOR 4',
          'AGGREGATOR 5',
          'AGGREGATOR 6',
          'AGGREGATOR 7',
          'AGGREGATOR 8',
        ]}
      />

      <DataGridViewTemp
        limited
        link="/agents/super_agents_list"
        title="Aggregator list"
        rows={rows}
        columns={columns}
      />
    </>
  )
}

// Tailwind Styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`

export default AggregatorsDashboard
