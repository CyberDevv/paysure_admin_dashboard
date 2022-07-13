import moment from 'moment'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import tw from 'twin.macro'

import { Tooltip } from '@mui/material'
import {
  DataGridViewTemp,
  DatRangePickerAndOthers,
  FilterBox,
  SearchBar
} from '..'
import { printPartOfPage } from '../../utils/print'
import Layout from '../layouts/main_layout/index.main_layout'
import { Print, ViewActionSVG } from '../SVGIcons'

const TransactionsListDashboard = ({
  transactionsList = [],
  page,
  searchKey,
  status,
  fromDate,
  toDate,
}) => {
  const { transData = [] } = transactionsList

  const [isLoading, setIsLoading] = React.useState(false)
  const [value, setValue] = React.useState([
    fromDate ? fromDate : moment().subtract(30, 'days'),
    toDate ? toDate : new Date(),
  ])

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

  // DataGrid rows
  let rows
  // check if transData is an array
  if (Array.isArray(transData)) {
    rows = transData.map((item, index) => {
      return {
        id: item.tid,
        col1: index + 1,
        col2: item.none,
        col3: item.terminalId,
        col4: item.servicesCount,
        col5: item.amount,
        col6: item.fee,
        col7: item.transSum,
        col8: item.rrn,
        col9: item.transType,
        col10: item.transDate,
        col11: '',
      }
    })
  } else {
    rows = []
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
      headerName: 'RRN',
      minWidth: 143,
      flex: 1,
      headerClassName: 'grid-header',
      disableClickEventBubbling: true,
    },
    {
      field: 'col9',
      headerName: 'Type',
      minWidth: 153,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col10',
      headerName: 'Date',
      minWidth: 173,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span>{moment(params.row.col10).format('MMM DD, YYYY HH:mm')}</span>
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

        const handlePrint = e => {
          const api = params.api
          const thisRow = {}

          api
            .getAllColumns()
            .filter(c => c.field !== '__check__' && !!c)
            .forEach(
              c => (thisRow[c.field] = params.getValue(params.id, c.field)),
            )

          // print the row data in a table
          const printData = document.getElementById('printData')
          printData.innerHTML = `
        <div style="width: 100%; font-family: 'arial';">
          <h3 style= "text-align: center;">Transaction Details</h3>
              <div style="border: 1px solid #999; width: 100%; box-sizing: border-box; padding: 2px">
                <div style="display: grid; grid-template-columns: 1fr 1fr; background: #f6f6f6; padding: 8px 0">
                  <h4 style="padding-left: 4px;">Mark Pan</h4> 
                  <h4 style= "font-weight: 300">${thisRow.col2}</h4>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; padding: 8px 0">
                  <h4 style="padding-left: 4px;">Terminal ID</h4>
                  <h4 style= "font-weight: 300">${thisRow.col3}</h4>
                  </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; background: #f6f6f6; padding: 8px 0">
                  <h4 style="padding-left: 4px;">Merchant Name</h4>
                  <h4 style= "font-weight: 300">${thisRow.col4}</h4>
                  </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; padding: 8px 0">
                  <h4 style="padding-left: 4px;">Amount</h4>
                  <h4 style= "font-weight: 300">${thisRow.col5}</h4>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; background: #f6f6f6; padding: 8px 0">
                  <h4 style="padding-left: 4px;">Charge</h4>
                  <h4 style= "font-weight: 300">${thisRow.col6}</h4>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; padding: 8px 0">
                  <h4 style="padding-left: 4px;">Transaction Ref.</h4>
                  <h4 style= "font-weight: 300">${thisRow.col7}</h4>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; background: #f6f6f6; padding: 8px 0">
                  <h4 style="padding-left: 4px;">RRR</h4>
                  <h4 style= "font-weight: 300">${thisRow.col8}</h4>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; padding: 8px 0">
                  <h4 style="padding-left: 4px;">Type</h4>
                  <h4 style= "font-weight: 300">${thisRow.col9}</h4>
                </div>
              </div>
        </div>
        `
          printPartOfPage('printData')
        }

        return (
          <div tw="space-x-1">
            <Tooltip title="View Transaction">
              <button onClick={handleView}>
                <ViewActionSVG />
              </button>
            </Tooltip>

            <Tooltip title="Print Transaction">
              <button onClick={handlePrint}>
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
        title="Transaction Records"
        rows={rows}
        columns={columns}
        page={page}
        // recordCount={providersList.totalRecords}
        pagination={true}
        className={tw`space-y-4 md:(grid grid-cols-2) xl:(flex space-y-0 space-x-4 w-full)`}
      >
        <div tw=" space-y-4 w-full md:(flex space-x-4 space-y-0 col-span-2)">
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

export default TransactionsListDashboard
