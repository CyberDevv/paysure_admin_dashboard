import React from 'react'
import tw from 'twin.macro'
import moment from 'moment'
import CurrencyFormat from 'react-currency-format'

import numberFormatter from '../../utils/numberFormatter'
import Layout from '../layouts/main_layout/index.main_layout'
import { EditActionSVG, UserWithPositive, Wallet } from '../SVGIcons'
import { DataGridViewTemp, HomeDisplayCard, OverviewCardSection } from '..'

const SettlementsDashboard = ({ settlementData = [] }) => {
  const { transData = [] } = settlementData

  // Settlement data metric array
  const settlementDataArray = [
    {
      amount: (
        <CurrencyFormat
          value={settlementData.totalSettlements}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      title: 'Total Settlements',
      link: '/settlements/settlements_list',
    },
    {
      amount: numberFormatter(settlementData.totalNoOfSuccessfulSettlements),
      title: 'Total Number of Successful Settlements',
    },
    {
      amount: numberFormatter(settlementData.totalFailedSettlementsCount),
      title: 'Total Number of Failed Settlements',
    },
    {
      amount: numberFormatter(settlementData.totalPendingSettlementsCount),
      title: 'Total Number of Pending Settlements',
    },
  ]

  const agencyOveriewData = [
    {
      amount: numberFormatter(settlementData.paysureSettlement),
      label: 'Paysure Settlement',
    },
    {
      amount: numberFormatter(settlementData.superAgentSettlements),
      label: 'Super Agent Settlement',
    },
    {
      amount: numberFormatter(settlementData.agentsSettlement),
      label: 'Agent Settlement',
    },
  ]

  // DataGrid rows
  let rows
  // check if providerList is an array
  if (Array.isArray(transData)) {
    rows = transData.map((item, index) => {
      return {
        id: item.tid,
        col1: index + 1,
        col2: item.amount,
        col3: item.transType,
        col4: item.none,
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

  return (
    <Layout title="Settlements">
      <div>
        <Ttile className="font-bold">Settlements</Ttile>
      </div>

      <HomeDisplayCard data={settlementDataArray} />

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
      />
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
    renderCell: params => {
      return <span>{params.row.col1}.</span>
    },
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
        <span
          css={[
            tw`uppercase text-[10px] p-1 rounded`,
            params.row.col7.toLowerCase() === 'accepted'
              ? tw`bg-[#E9FBF9] text-paysure-success-100 `
              : tw`bg-[#FDF6EF] text-[#EDA95A] `,
          ]}
        >
          {params.row.col7}
        </span>
      )
    },
  },
  {
    field: 'col8',
    headerName: 'Date',
    minWidth: 183,
    flex: 1,
    headerClassName: 'grid-header',
    disableClickEventBubbling: true,
    renderCell: params => {
      return <span>{moment(params.row.col8).format('MMM DD, YYYY HH:mm')}</span>
    },
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

// Tailwind Styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:(text-[32px])`

export default SettlementsDashboard
