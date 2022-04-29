import Router from 'next/router'
import React from 'react'
import tw from 'twin.macro'

import { DataGridViewTemp, HomeDisplayCard, DatRangePickerAndOthers } from '.'
import { Print, ViewActionSVG } from './SVGIcons'

const SuperAgentSignupsDashboard = () => {
  return (
    <>
      <Ttile className="font-bold">Super Agents</Ttile>

      <HomeDisplayCard data={temporalData} />

      <DataGridViewTemp
        limited
        link="/agents/super_agents_list"
        title="Super Agents list"
        rows={rows}
        columns={columns}
        dropdownData={dropdownData}
        hasSearch
        hasFilter
        hasSort
        hasExportBtn
        // TODO: has another filtering button
      />
    </>
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
    col2: 'ETRANSACT',
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
    col2: 'KUDA',
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
    headerName: 'Full Name',
    minWidth: 227,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Email',
    minWidth: 236,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: '(219) 555-0114',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col5',
    headerName: 'BVN',
    minWidth: 176,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col6',
    headerName: 'Business Name',
    minWidth: 200,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col7',
    headerName: 'Business Address',
    minWidth: 220,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col9',
    headerName: 'Date Added',
    minWidth: 160,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col10',
    headerName: 'Status',
    minWidth: 120,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <span
          css={[
            tw`bg-[#F1F1F5] text-[#A6B7D4] uppercase text-[10px] p-1 rounded`,
          ]}
        >
          {params.row.col8}
        </span>
      )
    },
  },
  {
    field: 'col11',
    headerName: 'Actions',
    minWidth: 120,
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

        Router.push(`/signups/${thisRow.col1}`)
      }

      return (
        <div tw="space-x-1">
          <button onClick={handleView}>
            <ViewActionSVG />
          </button>

          <button onClick={handleEdit}>
            <Print />
          </button>
        </div>
      )
    },
  },
]
// FIXME: Temp data (should be replaced with real data)
const temporalData = [
  {
    amount: '32213',
    title: 'New',
  },
  {
    amount: '1324',
    title: 'Approved',
  },
  {
    amount: '10',
    title: 'Rejected',
  },
  {
    amount: '3',
    title: 'Pending',
  },
]

// Tailwind Styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`

export default SuperAgentSignupsDashboard
