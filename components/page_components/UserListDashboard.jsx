import moment from 'moment'
import React from 'react'
import tw from 'twin.macro'

import {
  DataGridViewTemp,
  DatRangePickerAndOthers,
  FilterBox,
  SearchBar,
} from '..'
import { UsersListColumn } from '../Columns'
import Layout from '../layouts/main_layout/index.main_layout'

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

  return (
    <Layout goBack>
      <DataGridViewTemp
        title="Users List"
        rows={rows}
        columns={UsersListColumn}
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
