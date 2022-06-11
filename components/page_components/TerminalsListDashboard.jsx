import React from 'react'
import axios from 'axios'
import moment from 'moment'
import tw from 'twin.macro'
import Router from 'next/router'
import { toast } from 'react-toastify'
import CurrencyFormat from 'react-currency-format'

import { Add, EditActionSVG, UserWithNegative, Wallet } from '../SVGIcons'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import Layout from '../layouts/main_layout/index.main_layout'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'
import {
  DataGridViewTemp,
  SearchBar,
  FilterBox,
  DatRangePickerAndOthers,
} from '..'

const TerminalsListDashboard = ({
  terminalsList = [],
  page,
  searchKey,
  status,
  toDate,
  fromDate,
}) => {
  const { TerminalData = [] } = terminalsList

  // useState hook
  const [value, setValue] = React.useState([
    fromDate ? fromDate : moment().subtract(400, 'days'),
    toDate ? toDate : new Date(),
  ])

  // rows
  let rows
  // check if TerminalData is an array
  if (Array.isArray(TerminalData)) {
    rows = TerminalData.map((item, index) => {
      return {
        id: item.tid,
        col1: index + 1,
        col2: item.terminalId,
        col3: item.terminalSerialNo,
        col4: item.none,
        col5: item.transCount,
        col6: item.nibssRate,
        col7: item.none,
        col8: item.merchantName,
        col9: item.statusStr,
        col10: item.lastTransactionDate,
        col11: '',
      }
    })
  } else {
    rows = []
  }

  // dataGrid columns
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
      headerName: 'Terminal ID',
      minWidth: 157,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col3',
      headerName: 'Serial No.',
      minWidth: 156,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col4',
      headerName: 'Bank',
      minWidth: 193,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col5',
      headerName: 'Transactions',
      minWidth: 156,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col6',
      headerName: 'Nibble Rate (%)',
      minWidth: 150,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col7',
      headerName: 'Super Agent',
      minWidth: 194,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col8',
      headerName: 'Merchant',
      minWidth: 180,
      flex: 1,
      headerClassName: 'grid-header',
      disableClickEventBubbling: true,
    },
    {
      field: 'col9',
      headerName: 'Status',
      minWidth: 123,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span
            css={
              params.row.col9.toLowerCase() === 'active'
                ? tw`bg-[#E9FBF9] text-paysure-success-100 text-[10px] uppercase p-1 rounded`
                : tw`text-[#EDA95A] bg-[#FDF6EF] text-[10px] uppercase p-1 rounded`
            }
          >
            {params.row.col9}
          </span>
        )
      },
    },
    {
      field: 'col10',
      headerName: 'Last Transaction',
      minWidth: 193,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span>
            {params.row.col10
              ? moment(params.row.col10).format('MMM DD, YYYY HH:mm')
              : '-'}
          </span>
        )
      },
    },
    {
      field: 'col11',
      headerName: 'Action',
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

          // Router.push(`/terminals/${thisRow.col1}`)
        }

        return (
          <div tw="space-x-1">
            <button onClick={handleEdit}>
              <EditActionSVG />
            </button>

            <button onClick={handleView}>
              <UserWithNegative />
            </button>

            <button onClick={handleView}>
              <Wallet />
            </button>
          </div>
        )
      },
    },
  ]

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

  return (
    <Layout goBack>
      <DataGridViewTemp
        title="Terminals"
        rows={rows}
        columns={columns}
        page={page}
        recordCount={terminalsList.totalRecords}
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

export default TerminalsListDashboard
