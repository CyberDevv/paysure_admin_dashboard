import tw from 'twin.macro'
import React, { useState } from 'react'
import { Button, InputAdornment, MenuItem, TextField } from '@mui/material'

import Layout from '../layouts/main_layout/index.main_layout'
import { DataGridViewTemp, HomeDisplayCard, OverviewCardSection } from '..'
import { EditActionSVG, UserWithPositive, Wallet } from '../SVGIcons'

const SettlementsDashboard = () => {
  // UseState hook
  const [selectedDrop, setSelectedDrop] = useState(dropdownData[0].value)

  // functions
  const handleDropdownSelected = React.useCallback(event => {
    setSelectedDrop(event.target.value)
  })
  
  return (
    <Layout title="Settlements">
      <div>
        <Ttile className="font-bold">Settlements</Ttile>
      </div>

      <HomeDisplayCard data={temporalData} />

      <OverviewCardSection
        title="Settlement Overview"
        data={agencyOveriewData}
      />

      <DataGridViewTemp
        limited
        link="/settlements/settlements_list"
        title="Settlement Records"
        rows={rows}
        columns={columns}
        dropdownData={dropdownData}
        hasSearch
        hasSort
        hasFilter
        hasExportBtn
      />
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

// FIXME: Temp data (should be replaced with real data)
const rows = [
  {
    id: 1,
    col1: 1,
    col2: 'Apple',
    col3: 'POS',
    col4: 1,
    col5: 4243,
    col6: '443943043',
    col7: '443943043',
    col8: '7013',
    col9: 'Dec 30, 2018 05:12',
    col10: '',
  },
  {
    id: 2,
    col1: 2,
    col2: 'Master Card',
    col3: 'POS',
    col4: 1,
    col5: 4243,
    col6: '443943043',
    col7: '443943043',
    col8: '7013',
    col9: 'Dec 30, 2018 05:12',
    col10: '',
  },
  {
    id: 3,
    col1: 3,
    col2: 'Bessie Cooper',
    col3: 'Tv Subscription',
    col4: 5000,
    col5: 39.9,
    col6: '443943043',
    col7: 'Bank Card',
    col8: 'pending',
    col9: 'Dec 30, 2018 05:12',
    col10: '',
  },
  {
    id: 4,
    col1: 4,
    col2: 'Bessie Cooper',
    col3: 'Tv Subscription',
    col4: 5000,
    col5: 39.9,
    col6: '443943043',
    col7: 'Bank Card',
    col8: 'completed',
    col9: 'Dec 30, 2018 05:12',
    col10: '',
  },
  {
    id: 5,
    col1: 5,
    col2: 'Bessie Cooper',
    col3: 'Tv Subscription',
    col4: 5000,
    col5: 39.9,
    col6: '443943043',
    col7: 'Bank Card',
    col8: 'pending',
    col9: 'Dec 30, 2018 05:12',
    col10: '',
  },
]

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
    headerName: 'Amount',
    minWidth: 227,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Type',
    minWidth: 236,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Identifier',
    minWidth: 103,
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
  },
  {
    field: 'col8',
    headerName: 'Date',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
    disableClickEventBubbling: true,
    // renderCell: params => {
    //   return (
    //     <span css={[tw`bg-border2 text-paysure-100 p-1 rounded`]}>
    //       {params.row.col8}
    //     </span>
    //   )
    // },
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
          <button onClick={handleView}>
            <EditActionSVG />
          </button>

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

// FIXME: Temp data (should be replaced with real data)
const agencyOveriewData = [
  {
    amount: 55102430,
    label: 'Paysure Settlement',
  },
  {
    amount: 1350,
    label: 'Super Agent Settlement',
  },
  {
    amount: 10,
    label: 'Agent Settlement',
  },
]

// FIXME: Temp data (should be replaced with real data)
const temporalData = [
  {
    amount: '147878787',
    title: 'Total Settlements',
    link: '/settlements/settlements_list',
  },
  {
    amount: '24',
    title: 'Total Successful Settlements',
  },
  {
    amount: '3',
    title: 'Total Failed Transactions',
  },
  {
    amount: '3',
    title: 'Total Pending',
  },
]

const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:(text-[32px])`
const Span = tw.span`text-[13px] text-[#10101266]`
const MUIButton2 = tw(
  Button,
)`normal-case text-paysure-100 bg-paysure-10 px-5 py-3 text-sm tracking-[-0.025em]`

export default SettlementsDashboard
