import moment from 'moment'
import Router from 'next/router'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import tw from 'twin.macro'

import { Tooltip } from '@mui/material'
import {
  DataGridViewTemp,
  DatRangePickerAndOthers,
  FilterBox,
  SearchBar,
} from '..'
import Layout from '../layouts/main_layout/index.main_layout'
import { EditActionSVG, ViewActionSVG } from '../SVGIcons'

const OrganizationsListDashboard = ({
  organizationsList,
  page,
  searchKey,
  status,
  toDate,
  fromDate,
}) => {
  const { partnerData = [] } = organizationsList

  // useState hook
  const [value, setValue] = React.useState([
    fromDate ? fromDate : moment().subtract(30, 'days'),
    toDate ? toDate : new Date(),
  ])

  // rows
  let rows
  // check if partnerData is an array
  if (Array.isArray(partnerData)) {
    rows = partnerData.map((organization, index) => {
      return {
        id: organization.tid,
        col1: (page - 1) * 10 + (index + 1),
        col2: organization.fullName,
        col3: organization.transCount,
        col4: organization.walletBalance,
        col5: organization.transSum,
        col6: organization.charges,
        col7: organization.createdDate,
        col8: '',
        partnerCode: organization.partnerCode,
      }
    })
  } else {
    rows = []
  }

  const columns = [
    {
      field: 'partnerCode',
    },
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
      headerName: 'Name of Organisation',
      minWidth: 227,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col3',
      headerName: 'No. of Transactions',
      minWidth: 176,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col4',
      headerName: 'Wallet Balance',
      minWidth: 150,
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
      headerName: 'Transactions(N)',
      minWidth: 144,
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
      minWidth: 153,
      flex: 1,
      headerClassName: 'grid-header',
      disableClickEventBubbling: true,
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
      headerName: 'Date Added',
      minWidth: 183,
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

          Router.push(`/organizations/${thisRow.partnerCode}`)
        }

        return (
          <div tw="space-x-1">
            <Tooltip title="Edit Organization">
              <button onClick={handleEdit}>
                <EditActionSVG />
              </button>
            </Tooltip>

            <Tooltip title="View Organization">
              <button onClick={handleView}>
                <ViewActionSVG />
              </button>
            </Tooltip>
          </div>
        )
      },
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
        title="Organizations"
        rows={rows}
        columns={columns}
        page={page}
        recordCount={organizationsList.recordCount}
        pagination={true}
        columnVisibilityModel={{ partnerCode: false }}
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

export default OrganizationsListDashboard
