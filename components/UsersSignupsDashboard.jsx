import Router from 'next/router'
import React from 'react'
import tw from 'twin.macro'

import { Print, ViewActionSVG } from './SVGIcons'
import { DataGridViewTemp, HomeDisplayCard } from '.'
import numberFormatter from '../utils/numberFormatter'
import { Tooltip } from '@mui/material'

const SuperAgentSignupsDashboard = ({ signupsList = [] }) => {
  const overviewDataArray = [
    {
      amount: numberFormatter(signupsList.newUsers),
      title: 'New',
    },
    {
      amount: numberFormatter(signupsList.approvedusers),
      title: 'Approved',
    },
    {
      amount: numberFormatter(signupsList.rejectedUsers),
      title: 'Rejected',
    },
    {
      amount: numberFormatter(signupsList.pendingUsers),
      title: 'Pending',
    },
  ]

  return (
    <>
      <Ttile className="font-bold">Users</Ttile>

      <HomeDisplayCard data={overviewDataArray} />

      <DataGridViewTemp
        limited
        link="/users/users_list"
        title="Users list"
        rows={[]}
        columns={columns}
      />
    </>
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
    renderCell: params => {
      return <span>{params.row.col1}.</span>
    },
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
    headerName: 'Phone Number',
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
    field: 'col8',
    headerName: 'Date Added',
    minWidth: 160,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return <span>{moment(params.row.col8).format('MMM DD, YYYY HH:mm')}</span>
    },
  },
  {
    field: 'col9',
    headerName: 'Status',
    minWidth: 120,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <span
          css={[
            tw`uppercase text-[10px] p-1 rounded`,
            params.row.col9.toLowerCase() === 'active'
              ? tw`bg-[#E9FBF9] text-paysure-success-100 `
              : tw`bg-[#FDF6EF] text-[#EDA95A] `,
          ]}
        >
          {params.row.col9}
        </span>
      )
    },
  },
  {
    field: 'col10',
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
          <Tooltip title= "View Users">
            <button onClick={handleView}>
              <ViewActionSVG />
            </button>
          </Tooltip>

          <Tooltip title="Print Document">
            <button onClick={handleEdit}>
              <Print />
            </button>
          </Tooltip>
        </div>
      )
    },
  },
]

// Tailwind Styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`

export default SuperAgentSignupsDashboard
