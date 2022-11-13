import moment from 'moment'
import Router from 'next/router'
import tw from 'twin.macro'

import { Tooltip } from '@mui/material'
import Head from 'next/head'
import { DataGridViewTemp, HomeMetricCard } from '.'
import numberFormatter from '../utils/numberFormatter'
import { Print, ViewActionSVG } from './SVGIcons'

const SuperAgentSignupsDashboard = ({ signupsList = [] }) => {
  const { agentsData = [] } = signupsList
  // data overview array
  const overviewData = [
    {
      amount: numberFormatter(signupsList[0].newlyAdded),
      title: 'New',
    },
    {
      amount: numberFormatter(signupsList[0].approved),
      title: 'Approved',
    },
    {
      amount: numberFormatter(signupsList[0].rejected),
      title: 'Rejected',
    },
    {
      amount: numberFormatter(signupsList[0].pending),
      title: 'Pending',
    },
  ]

  // DataGrid rows
  let rows
  // check if agentsData is an array
  if (Array.isArray(agentsData.agentsInfo)) {
    rows = agentsData.agentsInfo.map((item, index) => {
      return {
        id: item.tid,
        col1: index + 1,
        col2: [item.lastName, item.firstName],
        col3: item.emailAddress,
        col4: item.phonePri,
        col5: item.bvn,
        col6: item.fullName,
        col7: item.address1,
        col8: item.dateAdded,
        col9: item.statusStr,
        col10: '',
      }
    })
  } else {
    rows = []
  }

  return (
    <>
      <Head>
        <title>New Aggregators | Paysure</title>
      </Head>

      <Ttile className="font-bold">Aggregators</Ttile>

      <div tw="grid mt-10 grid-cols-2 gap-3 md:grid-cols-3 lg:(grid-cols-4 gap-5)">
        {overviewData.map((item, index) => (
          <HomeMetricCard.PlainCard
            key={index}
            amount={item.amount}
            title={item.title}
          />
        ))}
      </div>

      <DataGridViewTemp
        limited
        link="/agents/agents_list"
        title="List of New signups"
        rows={rows}
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
    renderCell: params => {
      return (
        <div tw="space-x-1">
          {params.row.col2.map((item, index) => {
            return <span key={index}>{item}</span>
          })}
        </div>
      )
    },
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
          <Tooltip title="View Super Agent">
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
