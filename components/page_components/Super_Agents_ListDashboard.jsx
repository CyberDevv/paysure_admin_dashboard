import React from 'react'
import { Tooltip } from '@mui/material'
import moment from 'moment'
import CurrencyFormat from 'react-currency-format'
import tw from 'twin.macro'

import {
  DataGridViewTemp,
  FilterBox,
  SearchBar,
  DatRangePickerAndOthers,
} from '..'
import Layout from '../layouts/main_layout/index.main_layout'
import { EditActionSVG, ViewActionSVG } from '../SVGIcons'

const Super_Agents_ListDashboard = ({
  superAgentList = [],
  page,
  searchKey,
  status,
  fromDate,
  toDate,
}) => {
  const { transStats = [], trxInfo = [] } = superAgentList
  console.log(
    '🚀 ~ file: Super_Agents_ListDashboard.jsx ~ line 25 ~ transStats',
    superAgentList,
  )

  const [isLoading, setIsLoading] = React.useState(false)
  const [value, setValue] = React.useState([
    fromDate ? fromDate : moment().subtract(30, 'days'),
    toDate ? toDate : new Date(),
  ])
  
  // DataGrid rows
  let rows
  // check if trxInfo is an array
  if (Array.isArray(trxInfo)) {
    rows = trxInfo.map((superAgent, index) => {
      console.log(superAgent.dateAdded)

      return {
        id: superAgent.tid,
        col1: (page - 1) * 10 + (index + 1),
        col2: superAgent.fullName,
        col3: superAgent.noOfAgents,
        col4: superAgent.AgentsTerminal,
        col5: superAgent.transCount,
        col6: superAgent.transSum,
        col7: superAgent.walletBalance,
        col8: superAgent.dateAdded,
        col9: superAgent.statusStr,
        col10: '',
        email: superAgent.emailAddress,
        phone: superAgent.phonePri,
      }
    })
  } else {
    rows = []
  }

  // datagrid column
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
      headerName: 'Super Agent Name',
      minWidth: 227,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col3',
      headerName: 'No. of Agents',
      minWidth: 236,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col4',
      headerName: 'Terminals',
      minWidth: 193,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <div tw="space-x-1">
            {params.row.col4.slice(0, 2).map((item, index) => {
              return (
                <span
                  key={index}
                  css={[
                    tw`bg-paysure-10 text-paysure-100 text-[10px] uppercase p-1 rounded`,
                  ]}
                >
                  {item}
                </span>
              )
            })}
            {params.row.col4.length > 2 && (
              <span tw="ml-4">+{params.row.col4.length - 2}</span>
            )}
          </div>
        )
      },
    },
    {
      field: 'col5',
      headerName: 'No. of Transactions',
      minWidth: 176,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col6',
      headerName: 'Transactions{N}',
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
      headerName: 'Wallet Balance',
      minWidth: 144,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <CurrencyFormat
            value={params.row.col7}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          />
        )
      },
    },
    {
      field: 'col8',
      headerName: 'Date Added',
      minWidth: 153,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span>{moment(params.row.col8).format('MMM DD, YYYY HH:mm')}</span>
        )
      },
    },
    {
      field: 'col9',
      headerName: 'Status',
      minWidth: 140,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span
            css={
              params.row.col9.toLowerCase() !== 'active'
                ? tw`bg-[#FDF6EF] text-paysure-danger-100 text-[10px] uppercase p-1 rounded`
                : tw`bg-[#E9FBF9] text-paysure-success-100 text-[10px] uppercase p-1 rounded`
            }
          >
            {params.row.col9}
          </span>
        )
      },
    },
    {
      field: 'col10',
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

          Router.push({
            pathname: `/agents/super_agent/${thisRow.col2}`,
            query: { email: thisRow.email, phone: thisRow.phone },
          })
        }

        return (
          <div tw="space-x-1">
            <Tooltip title="Edit Super Agent">
              <button onClick={handleEdit}>
                <EditActionSVG />
              </button>
            </Tooltip>

            <Tooltip title="View Super Agent">
              <button onClick={handleView}>
                <ViewActionSVG />
              </button>
            </Tooltip>
          </div>
        )
      },
    },
    {
      field: 'email',
      minWidth: 123,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'phone',
      minWidth: 123,
      flex: 1,
      headerClassName: 'grid-header',
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
        title="Super Agents"
        rows={rows}
        columns={columns}
        columnVisibilityModel={{ email: false, phone: false }}
        page={page}
        recordCount={superAgentList.totalRecords}
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

export default Super_Agents_ListDashboard
