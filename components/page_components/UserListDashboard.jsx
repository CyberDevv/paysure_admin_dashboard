import React from 'react'
import moment from 'moment'
import tw from 'twin.macro'
import Router from 'next/router'
import CurrencyFormat from 'react-currency-format'

import {
  DataGridViewTemp,
  SearchBar,
  FilterBox,
  DatRangePickerAndOthers,
} from '..'
import { EditActionSVG, ViewActionSVG } from '../SVGIcons'
import Layout from '../layouts/main_layout/index.main_layout'
import { Tooltip } from '@mui/material'

const UsersListDashboard = ({
  tableData = [],
  page,
  toDate,
  fromDate,
  searchKey,
}) => {
  const [value, setValue] = React.useState([
    fromDate ? fromDate : moment().subtract(30, 'days'),
    toDate ? toDate : new Date(),
  ])

  // DataGrid rows
  const rows = tableData
    ? tableData.map((item, index) => {
        return {
          id: index,
          col1: index + 1,
          name: item.fullName,
          walletBalance: item.walletBalance,
          email: item.userEmail,
          phoneNumber: item.phoneNumber,
          acctNumber: item.accountNumber,
          status: item.status,
          lastTransaction: item.lastTransaction,
          dateJoined: item.createOn,
          actions: '',
        }
      })
    : []

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
      field: 'name',
      headerName: 'Name',
      minWidth: 250,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'walletBalance',
      headerName: 'Wallet Balance',
      minWidth: 220,
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
      field: 'email',
      headerName: 'Email',
      minWidth: 270,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      minWidth: 180,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'acctNumber',
      headerName: 'Account Number',
      minWidth: 180,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 153,
      flex: 1,
      headerClassName: 'grid-header',
      disableClickEventBubbling: true,
      // renderCell: params => {
      //   return (
      //     <span
      //       css={[
      //         tw`uppercase text-[10px] p-1 rounded`,
      //         params.row.status.toLowerCase() === 'active'
      //           ? tw`bg-[#E9FBF9] text-paysure-success-100 `
      //           : tw`bg-[#FDF6EF] text-[#EDA95A] `,
      //       ]}
      //     >
      //       {params.row.status}
      //     </span>
      //   )
      // },
    },
    {
      field: 'lastTransaction',
      headerName: 'Last Transaction',
      minWidth: 174,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span>
            {params.row.lastTransaction
              ? moment(params.row.lastTransaction).format('MMM DD, YYYY HH:mm')
              : '-'}
          </span>
        )
      },
    },
    {
      field: 'dateJoined',
      headerName: 'Date Joined',
      minWidth: 173,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span>
            {moment(params.row.dateJoined).format('MMM DD, YYYY HH:mm')}
          </span>
        )
      },
    },
    {
      field: 'action',
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

          Router.push({
            pathname: `/users/${thisRow.name}`,
            // query: { email: thisRow.col4, phone: thisRow.col5 },
          })
        }

        return (
          <div tw="space-x-1">
            <Tooltip title="Edit User">
              <button onClick={handleEdit}>
                <EditActionSVG />
              </button>
            </Tooltip>

            <Tooltip title="View User">
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
    <Layout goBack>
      <DataGridViewTemp
        title="Users List"
        rows={rows}
        columns={columns}
        page={page}
        recordCount={tableData.recordCount}
        pagination={true}
        className={tw`space-y-4 md:(grid grid-cols-2) xl:(flex space-y-0 space-x-4 w-full)`}
      >
        <div tw=" space-y-4 w-full md:(flex space-x-4 space-y-0 col-span-2)">
          <SearchBar value={searchKey} />
          <FilterBox label="Showing" dropdownData={dropdownData} />
        </div>
        <DatRangePickerAndOthers value={value} setValue={setValue} />
      </DataGridViewTemp>
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

export default UsersListDashboard
