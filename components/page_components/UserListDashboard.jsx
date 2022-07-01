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
  usersList = [],
  page,
  toDate,
  fromDate,
  searchKey,
}) => {
  const { usersInfo = [] } = usersList

  const [value, setValue] = React.useState([
    fromDate ? fromDate : moment().subtract(30, 'days'),
    toDate ? toDate : new Date(),
  ])

  // ddataGrid rows
  let rows

  // check if usersInfo is an array
  if (Array.isArray(usersInfo)) {
    rows = usersInfo.map((user, index) => {
      return {
        id: user.tid,
        col1: (page - 1) * 10 + (index + 1),
        col2: user.fullName,
        col3: user.walletBalance,
        col4: user.emailAddress,
        col5: user.phonePri,
        col6: user.accountNumber,
        col7: user.statusStr,
        col8: user.lastTransactionDate,
        col9: user.dateAdded,
        col10: '',
      }
    })
  } else {
    rows = []
  }

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
      headerName: 'Name',
      minWidth: 250,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col3',
      headerName: 'Wallet Balance',
      minWidth: 220,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <CurrencyFormat
            value={params.row.col3}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          />
        )
      },
    },
    {
      field: 'col4',
      headerName: 'Email',
      minWidth: 220,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col5',
      headerName: 'Phone Number',
      minWidth: 180,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col6',
      headerName: 'Account Number',
      minWidth: 180,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col7',
      headerName: 'Status',
      minWidth: 153,
      flex: 1,
      headerClassName: 'grid-header',
      disableClickEventBubbling: true,
      renderCell: params => {
        return (
          <span
            css={[
              tw`uppercase text-[10px] p-1 rounded`,
              params.row.col7.toLowerCase() === 'active'
                ? tw`bg-[#E9FBF9] text-paysure-success-100 `
                : tw`bg-[#FDF6EF] text-[#EDA95A] `,
            ]}
          >
            {params.row.col7}
          </span>
        )
      },
    },
    {
      field: 'col8',
      headerName: 'Last Transaction',
      minWidth: 144,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span>
            {params.row.col8
              ? moment(params.row.col8).format('MMM DD, YYYY HH:mm')
              : '-'}
          </span>
        )
      },
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
            pathname: `/users/${thisRow.col2}`,
            query: { email: thisRow.col4, phone: thisRow.col5 },
          })
        }

        return (
          <div tw="space-x-1">
            <Tooltip title="Edit User">
              <button onClick={handleEdit}>
                <EditActionSVG />
              </button>
            </Tooltip>

            <Tooltip title= "View User">
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
        recordCount={usersList.totalRecords}
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
