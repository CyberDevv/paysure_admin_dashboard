import React from 'react'
import tw from 'twin.macro'
import CurrencyFormat from 'react-currency-format'

import {
  DataGridViewTemp,
  SearchBar,
  FilterBox,
  DatRangePickerAndOthers,
} from '..'
import Layout from '../layouts/main_layout/index.main_layout'
import { EditActionSVG, UserWithPositive, Wallet } from '../SVGIcons'
import { Tooltip } from '@mui/material'

const SettlementListDashboard = ({ settlementListData }) => {
  // console.log("🚀 ~ file: SettlementsListDashboard.jsx ~ line 15 ~ SettlementListDashboard ~ settlementListData", settlementListData)
  const { transData } = settlementListData

  // DataGrid rows
  const rows = transData.map((item, index) => {
    return {
      id: item.tid,
      col1: index + 1,
      col2: item.amount,
      col3: item.transType,
      col4: item.none,
      col5: item.none,
      col6: item.percentage,
      col7: item.transtatus,
      col8: item.transDate,
      col9: '',
    }
  })

  return (
    <Layout goBack>
      <DataGridViewTemp
        title="Settlements"
        rows={rows}
        columns={columns}
        hasExportBtn
        className={tw`grid sm:grid-template-columns[auto] gap-4 w-full xl:(grid-cols-2)`}
      >
        <div tw="col-span-2 grid sm:grid-cols-2 gap-4 xl:(grid-cols-4)">
          <SearchBar />
          <FilterBox label="Type" dropdownData={typedropdownData} />
          <FilterBox label="Status" dropdownData={StatusdropdownData} />
          <FilterBox label="Benefactor" dropdownData={dropdownData} />
        </div>
        <DatRangePickerAndOthers />
      </DataGridViewTemp>
    </Layout>
  )
}

const typedropdownData = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'failed',
    label: 'Failed',
  },
  {
    value: 'deposit transfer',
    label: 'Deposit Transfer',
  },
  {
    value: 'unknown/pending',
    label: 'Unknown/Pending',
  },
  {
    value: 'income settlements',
    label: 'Income Settlements',
  },
]

const StatusdropdownData = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'failed',
    label: 'Failed',
  },
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'successful',
    label: 'Successful',
  },
]

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
    headerName: 'Amount',
    minWidth: 167,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <CurrencyFormat
          value={params.row.col2}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      )
    },
  },
  {
    field: 'col3',
    headerName: 'Type',
    minWidth: 136,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Identifier',
    minWidth: 143,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col5',
    headerName: 'Initiator',
    minWidth: 176,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col6',
    headerName: 'Percentage',
    minWidth: 150,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col7',
    headerName: 'Status',
    minWidth: 144,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <span css={[tw`bg-border2 text-paysure-100 p-1 rounded`]}>
          {params.row.col7}
        </span>
      )
    },
  },
  {
    field: 'col8',
    headerName: 'Date',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
    disableClickEventBubbling: true,
  },
  {
    field: 'col9',
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
          <Tooltip title="Edit Settlement">
            <button onClick={handleView}>
              <EditActionSVG />
            </button>
          </Tooltip>

          <button onClick={handleEdit}>
            <UserWithPositive />
          </button>

          <button onClick={handleEdit}>
            <Wallet />
          </button>
        </div>
      )
    },
  },
]

export default SettlementListDashboard
