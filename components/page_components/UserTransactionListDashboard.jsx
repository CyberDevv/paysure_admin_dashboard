import tw from 'twin.macro'
import React from 'react'
import CurrencyFormat from 'react-currency-format'

import {
  DataGridViewTemp,
  DatRangePickerAndOthers,
  FilterBox,
  SearchBar,
} from '..'
import Layout from '../layouts/main_layout/index.main_layout'
import { fetchtransTypes } from '../../features/transTypes'
import { useDispatch, useSelector } from 'react-redux'
import { Print, ViewActionSVG } from '../SVGIcons'
import { Tooltip } from '@mui/material'

const UserTransactionListDashboard = ({
  transactionData,
  userName,
  toDate,
  fromDate,
  page,
  status,
  searchKey,
}) => {
  const { transInfo = [] } = transactionData

  const [value, setValue] = React.useState([
    fromDate ? fromDate : moment().subtract(30, 'days'),
    toDate ? toDate : new Date(),
  ])

  // useSelector
  const { transTypes: transTypesList = [] } = useSelector(
    state => state.transTypes,
  )

  const dispatch = useDispatch()

  React.useEffect(() => {
    // dispatch fetchtransTypes
    dispatch(fetchtransTypes())
  }, [dispatch])

  // dataGrid rows
  let rows

  // check if transInfo.transData is an array
  if (Array.isArray(transInfo.transData)) {
    rows = transInfo.transData.map((item, index) => {
      return {
        id: item.tid,
        col1: index + 1,
        col2: item.initiator,
        col3: item.transType,
        col4: item.contractType,
        col5: item.amount,
        col6: item.fee,
        col7: item.benefBank,
        col8: item.status,
        col9: item.benefNO,
        col10: item.transDate,
        col11: '',
      }
    })
  } else {
    rows = []
  }

  /* A ternary operator that checks if the transTypesList is empty. If it is empty, it returns an empty
  array. If it is not empty, it returns an array of objects with the value and label properties. */
  let showingDataArray
  transTypesList.length === 0
    ? (showingDataArray = [])
    : (showingDataArray = transTypesList.data.map(item => {
        return {
          value: item,
          label: item,
        }
      }))

  return (
    <Layout goBack>
      <DataGridViewTemp
        title={`${userName}'s Transaction Records`}
        rows={rows}
        columns={columns}
        pageSize={10}
        pagination
        page={page}
        // recordCount={providerData.recordCount}
        className={tw`space-y-4 md:(grid grid-cols-2) xl:(flex space-y-0 space-x-4 w-full)`}
      >
        <div tw=" space-y-4 w-full md:(flex space-x-4 space-y-0 col-span-2)">
          <SearchBar value={searchKey} />
          <FilterBox
            label="Showing"
            dropdownData={showingDataArray}
            statusValue={status}
          />
        </div>
        <DatRangePickerAndOthers value={value} setValue={setValue} />
      </DataGridViewTemp>
      {/* TODO: add the date range picker */}
    </Layout>
  )
}

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
    headerName: 'Initiator',
    minWidth: 227,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Transaction Type',
    minWidth: 170,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Contract',
    minWidth: 103,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col5',
    headerName: 'Amount',
    minWidth: 130,
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
    headerName: 'Charges',
    minWidth: 100,
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
    headerName: 'Elec Board',
    minWidth: 144,
    flex: 1,
    headerClassName: 'grid-header',
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
        <span
          css={
            params.row.col8.toLowerCase() === 'pending'
              ? tw`bg-[#EBF2FA] text-[#A6B7D4] p-1 rounded capitalize`
              : tw`bg-border2 text-paysure-100 p-1 rounded capitalize`
          }
        >
          {params.row.col8}
        </span>
      )
    },
  },
  {
    field: 'col9',
    headerName: 'Meter Number',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col10',
    headerName: 'Date',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col11',
    headerName: 'Action.',
    minWidth: 100,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      const handleEdit = () => {}

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
          <Tooltip title="View Transaction">
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

export default UserTransactionListDashboard
