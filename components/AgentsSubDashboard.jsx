import { Button, Tooltip } from '@mui/material'
import moment from 'moment'
import Router from 'next/router'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import tw from 'twin.macro'

import { DataGridViewTemp, HomeDisplayCard } from '.'
import numberFormatter from '../utils/numberFormatter'
import BarChat from './BarChat'
import Modal from './layouts/modal_ayout/index.modal_layout'
import Label from './layouts/modal_ayout/LabelInput.main_layout'
import { Add, EditActionSVG, ViewActionSVG } from './SVGIcons'

const CMDashboard = ({ agentData = [] }) => {
  const { transStats = [], trxInfo = [] } = agentData

  // functions
  const agentStats = [
    {
      amount: numberFormatter(232),
      title: 'Total number of Cluster Managers',
    },
    {
      amount: numberFormatter(232),
      title: 'Total number of Active Cluster Managers',
      link: '/agents/agents_list',
    },
    {
      amount: numberFormatter(232),
      title: 'Total number of inactive Cluster Managers',
    },
  ]

  // DataGrid rows
  let rows
  // check if trxInfo is an array
  if (Array.isArray(trxInfo)) {
    rows = trxInfo.map((item, index) => {
      return {
        id: item.tid,
        col1: index + 1,
        col2: item.fullName,
        col3: item.parent,
        col4: item.AgentsTerminal,
        col5: item.totalTransactionsCount,
        col6: item.sumTotalSuccessful,
        col7: item.walletBalance,
        col8: item.contractType,
        col9: item.dateAdded,
        col10: item.statusStr,
        col11: '',
        email: item.emailAddress,
        phone: item.phonePri,
      }
    })
  } else {
    rows = []
  }

  // dataGrid column
  const columns = [
    {
      field: 'col1',
      headerName: 'S/N',
      minWidth: 71,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col2',
      headerName: 'Agent Name',
      minWidth: 227,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col3',
      headerName: 'Parent',
      minWidth: 236,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col4',
      headerName: 'Terminals',
      minWidth: 203,
      flex: 1,
      headerClassName: 'grid-header',
      // renderCell: params => {
      //   return (
      //     <div tw="space-x-1">
      //       {params.row.col4.slice(0, 2).map((item, index) => {
      //         return (
      //           <span
      //             key={index}
      //             css={[
      //               tw`bg-paysure-10 text-paysure-100 text-[10px] uppercase p-1 rounded`,
      //             ]}
      //           >
      //             {item}
      //           </span>
      //         )
      //       })}
      //       {params.row.col4.length > 2 && (
      //         <span tw="ml-4">+{params.row.col4.length - 2}</span>
      //       )}
      //     </div>
      //   )
      // },
    },
    {
      field: 'col5',
      headerName: 'No. of Transactions',
      minWidth: 166,
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
      headerName: 'Current Plan',
      minWidth: 153,
      flex: 1,
      headerClassName: 'grid-header',
      disableClickEventBubbling: true,
    },
    {
      field: 'col9',
      headerName: 'Date Added',
      minWidth: 123,
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
      minWidth: 100,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span
            css={[
              tw`uppercase text-[10px] p-1 rounded`,
              params.row.col10.toLowerCase() === 'active'
                ? tw`bg-[#E9FBF9] text-paysure-success-100 `
                : tw`bg-[#FDF6EF] text-[#EDA95A] `,
            ]}
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

          Router.push({
            pathname: `/agents/agent/${thisRow.col2}`,
            query: { email: thisRow.email, phone: thisRow.phone },
          })
        }

        return (
          <div tw="space-x-1">
            <Tooltip title="Edit Agent">
              <button onClick={handleEdit}>
                <EditActionSVG />
              </button>
            </Tooltip>

            {/* <button onClick={handleView}>
            <UserWithPositive />
          </button> */}

            <Tooltip title="View Agent">
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

  return (
    <>
      <div css={[tw`flex items-center justify-between`]}>
        <Ttile className="font-bold">Cluster Manager</Ttile>
      </div>

      <HomeDisplayCard data={agentStats} />

      <BarChat title={'Performance of Cluster Managers'} />

      <DataGridViewTemp
        limited
        link="/agents/agents_list"
        title="Cluster Manager List"
        rows={rows}
        columns={columns}
        columnVisibilityModel={{ email: false, phone: false }}
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
