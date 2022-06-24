import tw from 'twin.macro'
import React from 'react'
import moment from 'moment'
import CurrencyFormat from 'react-currency-format'

import { Print, ViewActionSVG } from '../SVGIcons'
import Layout from '../layouts/main_layout/index.main_layout'
import {
  DataGridViewTemp,
  SearchBar,
  FilterBox,
  DatRangePickerAndOthers,
} from '..'
import { Tooltip } from '@mui/material'

const TerminalTransactionListDashboard = ({
  terminalList = [],
  page,
  searchKey,
  status,
  toDate,
  fromDate,
}) => {
  const { transData = [] } = terminalList

  // useState hook
  const [value, setValue] = React.useState([
    // TODO: change this to the correct amount of days
    fromDate ? fromDate : moment().subtract(400, 'days'),
    toDate ? toDate : new Date(),
  ])

  // rows
  let rows
  // check if transData is an array
  if (Array.isArray(transData)) {
    rows = transData.map((item, index) => {
      return {
        id: item.tid,
        col1: (page - 1) * 10 + (index + 1),
        col2: item.transType,
        col3: item.paymentRef,
        col4: item.amount,
        col5: item.rrn,
        col6: item.none,
        col7: item.transDate,
        col8: item.status,
        col9: '',
      }
    })
  } else {
    rows = []
  }

  const statusDataArray = [
    {
      value: '0',
      label: 'All',
    },
    {
      value: '1',
      label: 'Active',
    },
    {
      value: '2',
      label: 'Inactive',
    },
  ]

  // columns
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
      headerName: 'Type',
      minWidth: 227,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col3',
      headerName: 'Transaction Ref.',
      minWidth: 236,
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
      headerName: 'RRN',
      minWidth: 176,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col6',
      headerName: 'Status Code',
      minWidth: 150,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col7',
      headerName: 'Notification Time',
      minWidth: 144,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span>{moment(params.row.col7).format('MMM DD, YYYY HH:mm')}</span>
        )
      },
    },
    {
      field: 'col8',
      headerName: 'Status',
      minWidth: 153,
      flex: 1,
      headerClassName: 'grid-header',
      disableClickEventBubbling: true,
      renderCell: params => {
        return (
          <span css={[tw`bg-border2 text-paysure-100 p-1 rounded`]}>
            {params.row.col8}
          </span>
        )
      },
    },
    {
      field: 'col9',
      headerName: 'Action.',
      minWidth: 130,
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

          // Router.push(`/terminals/${thisRow.col1}`)
        }

        return (
          <div tw="space-x-1">
            <Tooltip title="view Transaction">
              <button onClick={handleEdit}>
                <ViewActionSVG />
              </button>
            </Tooltip>

            <Tooltip title="Print Transaction">
              <button onClick={handleView}>
                <Print />
              </button>
            </Tooltip>
          </div>
        )
      },
    },
  ]

  return (
    <Layout goBack>
      <DataGridViewTemp
        title="Transaction History"
        rows={rows}
        columns={columns}
        page={page}
        recordCount={terminalList.recordsCount ? terminalList.recordsCount : 0}
        pagination={true}
        className={tw`grid grid-auto-columns[auto] gap-4 w-full xl:(flex items-center space-y-0 space-x-4)`}
        hasExportBtn
      >
        <div tw="space-y-4 sm:(flex space-x-4 space-y-0) w-full col-span-2">
          <SearchBar value={searchKey} />
          <FilterBox
            label="Showing"
            dropdownData={statusDataArray}
            statusValue={status}
          />
        </div>
        <DatRangePickerAndOthers value={value} setValue={setValue} />
      </DataGridViewTemp>
    </Layout>
  )
}

export default TerminalTransactionListDashboard
