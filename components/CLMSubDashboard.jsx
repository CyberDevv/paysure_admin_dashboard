import { Button, Tooltip } from '@mui/material'
import moment from 'moment'
import Head from 'next/head'
import Router from 'next/router'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import tw from 'twin.macro'

import { DataGridViewTemp, HomeDisplayCard, HomeMetricCard } from '.'
import numberFormatter from '../utils/numberFormatter'
import BarChat from './BarChat'
import Modal from './layouts/modal_ayout/index.modal_layout'
import Label from './layouts/modal_ayout/LabelInput.main_layout'
import {
  Add,
  EditActionSVG,
  UserWithNegative,
  UserWithPositive,
  ViewActionSVG,
  Wallet,
} from './SVGIcons'

const CMDashboard = ({ clmData = [] }) => {
  console.log(
    '🚀 ~ file: CLMSubDashboard.jsx ~ line 17 ~ CMDashboard ~ clmData',
    clmData,
  )
  const { transStats = [], trxInfo = [] } = clmData

  // functions
  const clmStats = [
    {
      amount: numberFormatter(clmData[0].totalCLM),
      title: 'Total number of Cluster Managers',
    },
    {
      amount: numberFormatter(clmData[0].totalActiveCLM),
      title: 'Total number of Active Cluster Managers',
      link: '/agents/agents_list',
    },
    {
      amount: numberFormatter(clmData[0].totalInactiveCLM),
      title: 'Total number of inactive Cluster Managers',
    },
  ]

  // DataGrid rows
  const rows = clmData[1].map((item, index) => {
    return {
      id: index,
      col1: index + 1,
      col2: item.fullname,
      col3: item.noOfAgents,
      col4: item.noOfAggregators,
      col5: item.terminals,
      col6: item.noOfTransactions,
      col7: item.totalAmountInTransactions,
      col8: item.walletBalance,
      col9: item.dateAdded,
      col10: item.status,
      col11: '',
    }
  })

  // dataGrid column
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
      headerName: "Cluster Manager's Name",
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
      headerName: 'No. of Aggregators',
      minWidth: 236,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col5',
      headerName: 'Terminals',
      minWidth: 193,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <div>
            {params.row.col5.length !== 0 ? (
              <div tw="space-x-1">
                {params.row.col5.slice(0, 2).map((item, index) => {
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
                {params.row.col5.length > 2 && (
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
      field: 'col6',
      headerName: 'No. of Transactions',
      minWidth: 176,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col7',
      headerName: 'Transactions{N}',
      minWidth: 150,
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
      headerName: 'Wallet Balance',
      minWidth: 144,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <CurrencyFormat
            value={params.row.col8}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          />
        )
      },
    },
    {
      field: 'col9',
      headerName: 'Date Added',
      minWidth: 153,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span>{moment(params.row.col9).format('MMM DD, YYYY HH:mm')}</span>
        )
      },
    },
    {
      field: 'col10',
      headerName: 'Status',
      minWidth: 140,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span
            css={
              params.row.col10.toLowerCase() !== 'active'
                ? tw`bg-[#FDF6EF] text-paysure-danger-100 text-[10px] uppercase p-1 rounded`
                : tw`bg-[#E9FBF9] text-paysure-success-100 text-[10px] uppercase p-1 rounded`
            }
          >
            {params.row.col10}
          </span>
        )
      },
    },
    {
      field: 'col11',
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
            <Tooltip title="Edit Cluster Manager">
              <button onClick={handleEdit}>
                <EditActionSVG />
              </button>
            </Tooltip>

            {params.row.col10.toLowerCase() === 'active' && (
              <Tooltip title="Deactivate Cluster Manager">
                <button onClick={handleView}>
                  <UserWithPositive />
                </button>
              </Tooltip>
            )}

            {params.row.col10.toLowerCase() === 'inactive' && (
              <Tooltip title="Activate Cluster Manager">
                <button onClick={handleView}>
                  <UserWithNegative />
                </button>
              </Tooltip>
            )}

            <Tooltip title="View Cluster Manager">
              <button onClick={handleView}>
                <Wallet />
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
        <title>Cluster Manager | Paysure</title>
      </Head>

      <div css={[tw`flex items-center justify-between`]}>
        <Ttile className="font-bold">Cluster Manager</Ttile>
      </div>

      <div tw="grid mt-10 grid-cols-2 gap-3 lg:(grid-cols-3 gap-5)">
        {clmStats.map((item, index) => (
          <HomeMetricCard.PlainCard
            key={index}
            amount={item.amount}
            title={item.title}
          />
        ))}
      </div>

      <BarChat
        title={'Performance of Cluster Managers'}
        categories={[
          'Cluster Managers 1',
          'Cluster Managers 2',
          'Cluster Managers 3',
          'Cluster Managers 4',
          'Cluster Managers 5',
          'Cluster Managers 6',
          'Cluster Managers 7',
          'Cluster Managers 8',
        ]}
      />

      <DataGridViewTemp
        limited
        link="/agents/agents_list"
        title="Cluster Manager List"
        rows={rows}
        columns={columns}
      />
    </>
  )
}

// Tailwind Styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 pl-3.5 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`
const FlexBox = tw.div`flex items-center justify-between space-x-4`

export default CMDashboard
