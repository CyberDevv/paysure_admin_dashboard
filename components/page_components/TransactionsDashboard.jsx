import tw from 'twin.macro'
import React from 'react'
import moment from 'moment'
import CurrencyFormat from 'react-currency-format'

import { Print, ViewActionSVG } from '../SVGIcons'
import { printPartOfPage } from '../../utils/print'
import numberFormatter from '../../utils/numberFormatter'
import Layout from '../layouts/main_layout/index.main_layout'
import { DataGridViewTemp, HomeDisplayCard, OverviewCardSection } from '..'

const TransacitonsDashboard = ({ transactionsPageStats = [] }) => {
  const { transData = [] } = transactionsPageStats

  /* A data for the transactionStatsData component. */
  const transactionStatsData = [
    {
      amount: (
        <CurrencyFormat
          value={transactionsPageStats.totalSuccessfulTransactions}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      title: 'Total Transactions',
      link: '/transactions/transactions_list',
    },
    {
      amount: numberFormatter(
        transactionsPageStats.totalNoOfSuccessfulTransactions,
      ),
      title: 'Total number of successful transactions',
    },
    {
      amount: numberFormatter(transactionsPageStats.none),
      title: 'Total number of failed transactions',
    },
    {
      amount: numberFormatter(transactionsPageStats.none),
      title: 'Total number of pending transactions',
    },
  ]

  /* A data for the OverviewCardSection component. */
  const settlementOveriewData = [
    {
      amount: numberFormatter(transactionsPageStats.paysureSettlement),
      label: 'Paysure Settlement',
    },
    {
      amount: numberFormatter(transactionsPageStats.superAgentSettlements),
      label: 'Super Agent Settlement',
    },
    {
      amount: numberFormatter(transactionsPageStats.agentsSettlement),
      label: 'Agent Settlement',
    },
  ]

  // DataGrid rows
  let rows
  // check if transData is an array
  if (Array.isArray(transData)) {
    rows = transData.map((item, index) => {
      return {
        id: item.tid,
        col1: index + 1,
        col2: item.none,
        col3: item.terminalId,
        col4: item.servicesCount,
        col5: item.amount,
        col6: item.fee,
        col7: item.transSum,
        col8: item.rrn,
        col9: item.transType,
        col10: item.transDate,
        col11: '',
      }
    })
  } else {
    rows = []
  }

  return (
    <Layout title="Transactions">
      <div>
        <Ttile className="font-bold">Transactions</Ttile>
      </div>

      <HomeDisplayCard data={transactionStatsData} />

      <OverviewCardSection
        title="Settlement Overview"
        data={settlementOveriewData}
      />

      <DataGridViewTemp
        limited
        link="/transactions/transactions_list"
        title="Transaction Records"
        rows={rows}
        columns={columns}
      />

      <div tw="hidden" id="printData"></div>
    </Layout>
  )
}

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
    renderCell: params => {
      return <span>{params.row.col1}.</span>
    },
  },
  {
    field: 'col2',
    headerName: 'Mark Pan',
    minWidth: 167,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Terminal ID',
    minWidth: 167,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Merchant Name',
    minWidth: 203,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col5',
    headerName: 'Amount',
    minWidth: 156,
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
    headerName: 'Charge',
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
    headerName: 'Transaction Ref.',
    minWidth: 144,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col8',
    headerName: 'RRR',
    minWidth: 143,
    flex: 1,
    headerClassName: 'grid-header',
    disableClickEventBubbling: true,
  },
  {
    field: 'col9',
    headerName: 'Type',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col10',
    headerName: 'Date',
    minWidth: 173,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <span>{moment(params.row.col10).format('MMM DD, YYYY HH:mm')}</span>
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

      const handlePrint = e => {
        const api = params.api
        const thisRow = {}

        api
          .getAllColumns()
          .filter(c => c.field !== '__check__' && !!c)
          .forEach(
            c => (thisRow[c.field] = params.getValue(params.id, c.field)),
          )

        // print the row data in a table
        const printData = document.getElementById('printData')
        printData.innerHTML = `
        <div style="width: 100%; font-family: 'arial';">
          <h3 style= "text-align: center;">Transaction Details</h3>
              <div style="border: 1px solid #999; width: 100%; box-sizing: border-box; padding: 2px">
                <div style="display: grid; grid-template-columns: 1fr 1fr; background: #f6f6f6; padding: 8px 0">
                  <h4 style="padding-left: 4px;">Mark Pan</h4> 
                  <h4 style= "font-weight: 300">${thisRow.col2}</h4>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; padding: 8px 0">
                  <h4 style="padding-left: 4px;">Terminal ID</h4>
                  <h4 style= "font-weight: 300">${thisRow.col3}</h4>
                  </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; background: #f6f6f6; padding: 8px 0">
                  <h4 style="padding-left: 4px;">Merchant Name</h4>
                  <h4 style= "font-weight: 300">${thisRow.col4}</h4>
                  </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; padding: 8px 0">
                  <h4 style="padding-left: 4px;">Amount</h4>
                  <h4 style= "font-weight: 300">${thisRow.col5}</h4>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; background: #f6f6f6; padding: 8px 0">
                  <h4 style="padding-left: 4px;">Charge</h4>
                  <h4 style= "font-weight: 300">${thisRow.col6}</h4>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; padding: 8px 0">
                  <h4 style="padding-left: 4px;">Transaction Ref.</h4>
                  <h4 style= "font-weight: 300">${thisRow.col7}</h4>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; background: #f6f6f6; padding: 8px 0">
                  <h4 style="padding-left: 4px;">RRR</h4>
                  <h4 style= "font-weight: 300">${thisRow.col8}</h4>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; padding: 8px 0">
                  <h4 style="padding-left: 4px;">Type</h4>
                  <h4 style= "font-weight: 300">${thisRow.col9}</h4>
                </div>
              </div>
        </div>
        `
        printPartOfPage('printData')
      }

      return (
        <div tw="space-x-1">
          <button onClick={handleView}>
            <ViewActionSVG />
          </button>

          <button onClick={handlePrint}>
            <Print />
          </button>
        </div>
      )
    },
  },
]

// Tailwind Styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:(text-[32px])`

export default TransacitonsDashboard
