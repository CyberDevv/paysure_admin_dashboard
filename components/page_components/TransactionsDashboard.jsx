import tw from 'twin.macro'
import { Button } from '@mui/material'
import React, { useState } from 'react'
import CurrencyFormat from 'react-currency-format'

import Layout from '../layouts/main_layout/index.main_layout'
import { DataGridViewTemp, HomeDisplayCard, OverviewCardSection } from '..'
import { Print, ViewActionSVG } from '../SVGIcons'

const TransacitonsDashboard = () => {
  // UseState hook
  const [selectedDrop, setSelectedDrop] = useState(showingDropdownData[0].value)

  // // functions
  // const handleDropdownSelected = React.useCallback(event => {
  //   setSelectedDrop(event.target.value)
  // })

  const transactionStatsData = [
    {
      amount: (
        <CurrencyFormat
          value={373732}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      title: 'Total Transactions',
      link: '/transactions/transactions_list',
    },
    {
      amount: 4,
      // amount: transactionStats.filter(item => item.status === 'Pending').length,
      title: 'Total number of successful transactions',
    },
    {
      amount: '3',
      title: 'Total number of failed transactions',
    },
    {
      amount: '3',
      title: 'Total number of pending transactions',
    },
  ]

  return (
    <Layout title="Transactions">
      <div>
        <Ttile className="font-bold">Transactions</Ttile>
      </div>

      <HomeDisplayCard data={transactionStatsData} />

      <OverviewCardSection
        title="Settlement Overview"
        data={agencyOveriewData}
      />

      <DataGridViewTemp
        limited
        link="/transactions/transactions_list"
        title="Transaction Records"
        rows={rows}
        columns={columns}
        dropdownData={showingDropdownData}
        typeDropdownData={typeDropdownData}
        StatusDropdownData={StatusDropdownData}
        hasSearch
        hasFilterShowing
        hasFilterStatus
        hasFilterType
        hasSort
        hasExportBtn
        // TODO: has additional two filtering options
      />
    </Layout>
  )
}

const showingDropdownData = [
  {
    value: 'superAgents',
    label: 'Super Agents',
  },
  {
    value: 'agents',
    label: 'Agents',
  },
  {
    value: 'users',
    label: 'Users',
  },
  {
    value: 'settlements',
    label: 'Settlements',
  },
  {
    value: 'providers',
    label: 'Providers',
  },
]

const StatusDropdownData = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'user',
    label: 'User',
  },
  {
    value: 'admin',
    label: 'Admin',
  },
]

const typeDropdownData = [
  {
    value: 'withdrawal',
    label: 'Withdrawal',
  },
  {
    value: 'fundWallet',
    label: 'Fund Wallet',
  },
  {
    value: 'settlement',
    label: 'Settlement',
  },
]

// FIXME: Temp data (should be replaced with real data)
const rows = [
  {
    id: 1,
    col1: 1,
    col2: 'Apple',
    col3: 'POS',
    col4: 1,
    col5: 4243,
    col6: '443943043',
    col7: '443943043',
    col8: '7013',
    col9: 'Dec 30, 2018 05:12',
    col10: '',
  },
  {
    id: 2,
    col1: 2,
    col2: 'Master Card',
    col3: 'POS',
    col4: 1,
    col5: 4243,
    col6: '443943043',
    col7: '443943043',
    col8: '7013',
    col9: 'Dec 30, 2018 05:12',
    col10: '',
  },
  {
    id: 3,
    col1: 3,
    col2: 'Bessie Cooper',
    col3: 'Tv Subscription',
    col4: 5000,
    col5: 39.9,
    col6: '443943043',
    col7: 'Bank Card',
    col8: 'pending',
    col9: 'Dec 30, 2018 05:12',
    col10: '',
  },
  {
    id: 4,
    col1: 4,
    col2: 'Bessie Cooper',
    col3: 'Tv Subscription',
    col4: 5000,
    col5: 39.9,
    col6: '443943043',
    col7: 'Bank Card',
    col8: 'completed',
    col9: 'Dec 30, 2018 05:12',
    col10: '',
  },
  {
    id: 5,
    col1: 5,
    col2: 'Bessie Cooper',
    col3: 'Tv Subscription',
    col4: 5000,
    col5: 39.9,
    col6: '443943043',
    col7: 'Bank Card',
    col8: 'pending',
    col9: 'Dec 30, 2018 05:12',
    col10: '',
  },
]

// FIXME: Temp data (should be replaced with real data)
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
    headerName: 'Mark Pan',
    minWidth: 167,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Terminal ID',
    minWidth: 167,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Merchant Name',
    minWidth: 203,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col5',
    headerName: 'Amount',
    minWidth: 156,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <CurrencyFormat
          value={params.row.col5}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      )
    },
  },
  {
    field: 'col6',
    headerName: 'Charge',
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
    headerName: 'Transaction Ref.',
    minWidth: 144,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col8',
    headerName: 'RRR',
    minWidth: 143,
    flex: 1,
    headerClassName: 'grid-header',
    disableClickEventBubbling: true,
  },
  {
    field: 'col9',
    headerName: 'Type',
    minWidth: 123,
    flex: 1,
    headerClassName: 'grid-header',
  },

  // {
  //   field: 'col10',
  //   headerName: 'Identifier',
  //   minWidth: 123,
  //   flex: 1,
  //   headerClassName: 'grid-header',
  // },
  // {
  //   field: 'col11',
  //   headerName: 'Percentage',
  //   minWidth: 100,
  //   flex: 1,
  //   headerClassName: 'grid-header',
  // },

  // {
  //   field: 'col12',
  //   headerName: 'Status',
  //   minWidth: 100,
  //   flex: 1,
  //   headerClassName: 'grid-header',
  // },

  // {
  //   field: 'col13',
  //   headerName: 'Date',
  //   minWidth: 100,
  //   flex: 1,
  //   headerClassName: 'grid-header',
  // },
  {
    field: 'col14',
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
          <button onClick={handleView}>
            <ViewActionSVG />
          </button>

          <button onClick={handleEdit}>
            <Print />
          </button>
        </div>
      )
    },
  },
]

// FIXME: Temp data (should be replaced with real data)
const agencyOveriewData = [
  {
    amount: 55102430,
    label: 'Paysure Settlement',
  },
  {
    amount: 1350,
    label: 'Super Agent Settlement',
  },
  {
    amount: 10,
    label: 'Agent Settlement',
  },
]

const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:(text-[32px])`

export default TransacitonsDashboard
