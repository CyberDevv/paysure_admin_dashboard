import React from 'react'
import tw from 'twin.macro'
import CurrencyFormat from 'react-currency-format'
import { useDispatch, useSelector } from 'react-redux'
import { fetchtransTypes } from '../../features/transTypes'

import {
  DataGridViewTemp,
  SearchBar,
  FilterBox,
  DatRangePickerAndOthers,
} from '..'
import Layout from '../layouts/main_layout/index.main_layout'
import { EditActionSVG, UserWithPositive, Wallet } from '../SVGIcons'
import { Tooltip } from '@mui/material'

const SettlementListDashboard = ({
  settlementsList = [],
  page,
  searchKey,
  status,
  fromDate,
  toDate,
}) => {
  const { transData } = settlementsList

  const [isLoading, setIsLoading] = React.useState(false)
  const [value, setValue] = React.useState([
    fromDate ? fromDate : moment().subtract(30, 'days'),
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
        col2: item.amount,
        col3: item.transType,
        col4: item.requestId,
        col5: item.initiator,
        col6: item.percentage,
        col7: item.transtatus,
        col8: item.transDate,
        col9: '',
      }
    })
  } else {
    rows = []
  }

  // useSelector
  const { transTypes: transTypesList = [] } = useSelector(
    state => state.transTypes,
  )

  const dispatch = useDispatch()

  React.useEffect(() => {
    // dispatch fetchtransTypes
    dispatch(fetchtransTypes())
  }, [dispatch])

  /* A ternary operator that checks if the transTypesList is empty. If it is empty, it returns an empty
  array. If it is not empty, it returns an array of objects with the value and label properties. */
  let typeDataArray
  transTypesList.length === 0
    ? (typeDataArray = [])
    : (typeDataArray = transTypesList.data.map(item => {
        return {
          value: item,
          label: item,
        }
      }))

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
  const benefactorDataArray = [
    {
      value: 'Super Agent',
      label: 'Super Agent',
    },
    {
      value: 'Agent',
      label: 'Agent',
    },
    {
      value: 'Users',
      label: 'Users',
    },
  ]

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
          <FilterBox
            label="Type"
            dropdownData={typeDataArray}
            statusValue={status}
          />

          <FilterBox
            label="Status"
            dropdownData={statusDataArray}
            statusValue={status}
          />
          <FilterBox
            label="Benefactor"
            dropdownData={benefactorDataArray}
            statusValue={status}
          />
        </div>
        <DatRangePickerAndOthers value={value} setValue={setValue} />
      </DataGridViewTemp>
    </Layout>
  )
}

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
