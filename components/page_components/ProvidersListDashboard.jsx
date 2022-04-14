import React from 'react'
import tw from 'twin.macro'
import CurrencyFormat from 'react-currency-format'

import { DataGridViewTemp, SearchBar, FilterBox } from '..'
import Layout from '../layouts/main_layout/index.main_layout'
import { Add, EditActionSVG, ViewActionSVG } from '../SVGIcons'

const ProvidersListDashboard = ({ providersList }) => {
  const rows = providersList.map((provider, index) => {
    return {
      id: provider.tid,
      col1: index + 1,
      col2: provider.providerName,
      col3: provider.servicesDesc,
      col4: provider.servicesCount,
      col5: provider.noOfTransactions,
      col6: provider.walletBalance,
      col7: provider.none,
      col8: provider.none,
      col9: provider.none,
      col10: '',
    }
  })

  return (
    <Layout goBack>
      <DataGridViewTemp
        title="Providers"
        rows={rows}
        columns={columns}
        pageSize={10}
        pagination={true}
        className={tw`space-y-4 md:(flex space-y-0 space-x-4) xl:max-w-xl`}
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
    headerName: 'Name of Provider',
    minWidth: 227,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Services',
    minWidth: 236,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'No. of Services',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
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
    headerName: 'Wallet Balance',
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
    headerName: 'Transactions(N)',
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
    headerName: 'Charges',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
    disableClickEventBubbling: true,
    renderCell: params => {
      return (
        <CurrencyFormat
          value={params.row.col8}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      )
    },
  },
  {
    field: 'col9',
    headerName: 'Date Added',
    minWidth: 183,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col10',
    headerName: 'Action',
    minWidth: 100,
    flex: 1,
    sortable: false,
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

        Router.push(`/providers/${thisRow.col1}`)
      }

      return (
        <div tw="space-x-1">
          <button onClick={handleEdit}>
            <EditActionSVG />
          </button>

          <button onClick={handleView}>
            <ViewActionSVG />
          </button>
        </div>
      )
    },
  },
]

export default ProvidersListDashboard
