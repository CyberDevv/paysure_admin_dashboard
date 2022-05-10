import React from 'react'
import moment from 'moment'
import tw from 'twin.macro'
import CurrencyFormat from 'react-currency-format'
import { Button, IconButton, Menu, MenuItem } from '@mui/material'

import numberFormatter from '../../utils/numberFormatter'
import Layout from '../layouts/main_layout/index.main_layout'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'
import { DataGridViewTemp, FilterBox, DatRangePickerAndOthers } from '..'
import { EllipsisSVG, Print, SuccessfulSVG, ViewActionSVG } from '../SVGIcons'

const ProviderTransactionListDashboard = ({
  providerData,
  providerName,
  toDate,
  fromDate,
}) => {
  const { providerTrxData = [] } = providerData

  // useState hook
  const [value, setValue] = React.useState([
    fromDate ? fromDate : moment().subtract(30, 'days'),
    toDate ? toDate : new Date(),
  ])

  // DataGrid columns
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
      headerName: 'Service Type',
      minWidth: 157,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col3',
      headerName: 'Transaction ID',
      minWidth: 200,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col4',
      headerName: 'Amount',
      minWidth: 143,
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
      headerName: 'Charge',
      minWidth: 126,
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
      headerName: 'Status',
      minWidth: 150,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span
            css={
              params.row.col6.toLowerCase() !== 'accepted'
                ? tw`bg-[#EBF2FA] text-[#A6B7D4] p-1 rounded normal-case`
                : tw`bg-border2 text-paysure-100 p-1 rounded normal-case`
            }
          >
            {params.row.col6}
          </span>
        )
      },
    },
    {
      field: 'col7',
      headerName: 'Date',
      minWidth: 170,
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

          // Router.push(`/users/${thisRow.col1}`)
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

  // DataGrid rows
  let rows
  // check if providerList is an array
  if (Array.isArray(providerTrxData)) {
    rows = providerTrxData.map((item, index) => {
      return {
        id: item.tid,
        col1: index + 1,
        col2: item.transType,
        col3: item.requestId,
        col4: item.amount,
        col5: item.fee,
        col6: item.transtatus,
        col7: item.transDate,
        col8: '',
      }
    })
  } else {
    rows = []
  }

  return (
    <Layout goBack>
      <DataGridViewTemp
        title="Transaction Records"
        rows={rows}
        columns={columns}
        hasFilter
        hasSort
        className={tw`space-y-4 md:(grid grid-cols-2) xl:(flex space-y-0 space-x-4 w-full)`}
      >
        <div tw=" space-y-4 w-full md:(flex space-x-4 space-y-0 col-span-2)">
          <FilterBox label="Status" dropdownData={status} />
          <FilterBox label="Services" dropdownData={dropdownData} />
        </div>
        <DatRangePickerAndOthers value={value} setValue={setValue} />
      </DataGridViewTemp>

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
const status = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'accepted',
    label: 'Accepted',
  },
  {
    value: 'pending',
    label: 'Pending',
  },
]

export default ProviderTransactionListDashboard
