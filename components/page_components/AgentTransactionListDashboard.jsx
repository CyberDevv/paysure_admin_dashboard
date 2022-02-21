import React from 'react'
import CurrencyFormat from 'react-currency-format'
import tw from 'twin.macro'

import { DataGridViewTemp } from '..'
import Layout from '../layouts/main_layout/index.main_layout'
import { Print, ViewActionSVG } from '../SVGIcons'

const AgentTransactionListDashboard = () => {
  return (
    <Layout goBack>
      <DataGridViewTemp
        title="Transaction Records"
        rows={rows}
        columns={columns}
        dropdownData={dropdownData}
        hasSearch
        hasFilter
        hasSort
        hasExportBtn
      />

      {/* TODO: add the date range picker */}
    </Layout>
  )
}

// FIXME: Temp data (should be replaced with real data)
const dropdownData = [
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
    headerName: 'Transaction Type',
    minWidth: 227,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Information',
    minWidth: 196,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Amount',
    minWidth: 103,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <CurrencyFormat
          value={params.row.col4}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      )
    },
  },
  {
    field: 'col5',
    headerName: 'Status',
    minWidth: 176,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <span css={[tw`bg-border2 text-paysure-100 p-1 rounded`]}>
          {params.row.col8}
        </span>
      )
    },
  },
  {
    field: 'col6',
    headerName: 'Date',
    minWidth: 150,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col10',
    headerName: 'Action.',
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

        Router.push(`/agents/agent/${thisRow.col1}`)
      }

      return (
        <div tw="space-x-1">
          <button onClick={handleEdit}>
            <ViewActionSVG />
          </button>

          <button onClick={handleView}>
            <Print />
          </button>
        </div>
      )
    },
  },
]

export default AgentTransactionListDashboard
