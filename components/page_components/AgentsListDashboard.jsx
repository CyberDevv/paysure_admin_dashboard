import React from 'react'
import tw from 'twin.macro'
import CurrencyFormat from 'react-currency-format'

import { EditActionSVG, ViewActionSVG } from '../SVGIcons'
import { DataGridViewTemp, SearchBar, FilterBox } from '..'
import Layout from '../layouts/main_layout/index.main_layout'
import { Tooltip } from '@mui/material'

const AgentsListDashboard = ({ agentsList = [], page, searchKey }) => {
  const { trxInfo = [], totalRecords } = agentsList

  // DataGrid rows
  let rows
  // check if trxInfo is an array
  if (Array.isArray(trxInfo)) {
    rows = trxInfo.map((item, index) => {
      return {
        id: item.tid,
        col1: index + 1,
        col2: item.fullName,
        col3: item.none,
        col4: item.AgentsTerminal,
        col5: item.none,
        col6: item.none,
        col7: item.walletBalance,
        col8: item.none,
        col9: item.dateAdded,
        col10: item.statusStr,
        col11: '',
      }
    })
  } else {
    rows = []
  }

  return (
    <Layout goBack>
      <DataGridViewTemp
        title="Agents"
        rows={rows}
        columns={columns}
        page={page}
        recordCount={agentsList.totalRecords}
        pagination={true}
        className={tw`space-y-4 w-full md:(flex items-center space-x-4 space-y-0) xl:(max-w-2xl)`}
      >
        <SearchBar />
        <FilterBox label="Showing" dropdownData={dropdownData} />
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
    headerName: 'Agent Name',
    minWidth: 227,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Parent',
    minWidth: 236,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Terminals',
    minWidth: 203,
    flex: 1,
    headerClassName: 'grid-header',
    // renderCell: params => {
    //   return (
    //     <div tw="space-x-1">
    //       {params.row.col4.slice(0, 2).map((item, index) => {
    //         return (
    //           <span
    //             key={index}
    //             css={[
    //               tw`bg-paysure-10 text-paysure-100 text-[10px] uppercase p-1 rounded`,
    //             ]}
    //           >
    //             {item}
    //           </span>
    //         )
    //       })}
    //       {params.row.col4.length > 2 && (
    //         <span tw="ml-4">+{params.row.col4.length - 2}</span>
    //       )}
    //     </div>
    //   )
    // },
  },
  {
    field: 'col5',
    headerName: 'No. of Transactions',
    minWidth: 166,
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
    headerName: 'Current Plan',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
    disableClickEventBubbling: true,
  },
  {
    field: 'col9',
    headerName: 'Date Added',
    minWidth: 123,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col10',
    headerName: 'Status',
    minWidth: 100,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <span
          css={[
            tw`uppercase text-[10px] p-1 rounded`,
            params.row.col10.toLowerCase() === 'active'
              ? tw`bg-[#E9FBF9] text-paysure-success-100 `
              : tw`bg-[#FDF6EF] text-[#EDA95A] `,
          ]}
        >
          {params.row.col10}
        </span>
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

        Router.push(`/agents/agent/${thisRow.col1}`)
      }

      return (
        <div tw="space-x-1">
          <Tooltip title="Edit Agent">
            <button onClick={handleEdit}>
              <EditActionSVG />
            </button>
          </Tooltip>

          {/* <button onClick={handleView}>
            <UserWithPositive />
          </button> */}

          <Tooltip title="View Agent">
            <button onClick={handleView}>
              <ViewActionSVG />
            </button>
          </Tooltip>
        </div>
      )
    },
  },
]

export default AgentsListDashboard
