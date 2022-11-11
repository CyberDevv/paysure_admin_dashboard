import moment from 'moment'
import React from 'react'
import tw from 'twin.macro'

import { useDispatch } from 'react-redux'
import { DataGridViewTemp, DatRangePickerAndOthers } from '..'
import { fetchtransTypes } from '../../features/transTypes'
import { UserTransColumn } from '../Columns'
import Layout from '../layouts/main_layout/index.main_layout'

const UserTransactionListDashboard = ({
  tableData,
  page,
  username,
  toDate,
  fromDate,
}) => {
  const [value, setValue] = React.useState([
    fromDate ? fromDate : moment().subtract(30, 'days'),
    toDate ? toDate : new Date(),
  ])

  const dispatch = useDispatch()

  React.useEffect(() => {
    // dispatch fetchtransTypes
    dispatch(fetchtransTypes())
  }, [dispatch])

  // dataGrid rows
  let rows =
    tableData.length > 0
      ? tableData.map((item, index) => {
          return {
            id: index,
            col1: index + 1,
            initiator: item.initiator,
            type: item.type,
            amount: item.amount,
            charge: item.charge,
            status: item.status,
            markPan: item.markPan,
            transactionRef: item.transactionRef,
            paymentMethod: item.paymentMethod,
            rrn: item.rrn,
            date: item.date,
            actions: '',
          }
        })
      : []

  return (
    <Layout goBack>
      <DataGridViewTemp
        title={`${username}'s Transaction Records`}
        rows={rows}
        columns={UserTransColumn}
        pageSize={10}
        pagination
        page={page}
        hasExportBtn
        // recordCount={providerData.recordCount}
        className={tw`space-y-4 md:(grid grid-cols-2) xl:(flex space-y-0 space-x-4 w-full)`}
      >
        <div tw=" space-y-4 w-full md:(flex space-x-4 space-y-0 col-span-2)">
          {/* <FilterBox
            label="Showing"
            dropdownData={showingDataArray}
            statusValue={status}
          /> */}
        </div>
        <DatRangePickerAndOthers value={value} setValue={setValue} />
      </DataGridViewTemp>
      {/* TODO: add the date range picker */}
    </Layout>
  )
}

export default UserTransactionListDashboard
