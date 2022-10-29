import moment from 'moment'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import ReactToPrint from 'react-to-print'
import tw from 'twin.macro'

import {
  DataGridViewTemp,
  HomeDisplayCard,
  OverviewCardSection,
  Receipt,
} from '..'
import numberFormatter from '../../utils/numberFormatter'
import Chart from '../Chart'
import Layout from '../layouts/main_layout/index.main_layout'

const HomeDashboard = ({ homePageStats = [] }) => {
  // array of home page stats
  const homePageData = [
    {
      amount: numberFormatter(homePageStats.numberFormatter || 0),
      title: 'Total Number of Providers',
      link: '/providers',
    },
    {
      amount: numberFormatter(homePageStats.clusterManagerAnalytics.totalCLM),
      title: 'Total Number of Cluster Manager',
      link: '/agents',
    },
    {
      amount: numberFormatter(
        homePageStats.aggregatorAnalytics.totalAggregator,
      ),
      title: 'Total Number of Aggregators',
      link: '/agents',
    },
    {
      amount: numberFormatter(homePageStats.userAnalytics.totalUsers),
      title: 'Total Number of Users',
      link: '/users',
      active: numberFormatter(homePageStats.userAnalytics.totalActiveUsers),
      inactive: numberFormatter(homePageStats.userAnalytics.totalInactiveUsers),
    },
    {
      amount: numberFormatter(homePageStats.terminalAnalytics.totalTerminals),
      title: 'Total Number of Terminals',
      link: '/terminals',
      active: numberFormatter(
        homePageStats.terminalAnalytics.totalActiveTerminals,
      ),
      inactive: numberFormatter(
        homePageStats.terminalAnalytics.totalInactiveTerminals,
      ),
    },
    {
      amount: numberFormatter(homePageStats.agentAnalytics.totalAgents),
      title: 'Total Number of Agents',
      link: '/agents',
      active: numberFormatter(homePageStats.agentAnalytics.totalActiveAgents),
      inactive: numberFormatter(
        homePageStats.agentAnalytics.totalInactiveAgents,
      ),
    },
  ]

  // array of agent stats
  const agencyOveriewData = [
    {
      amount: (
        <CurrencyFormat
          value={homePageStats.agencyOverview.totalTransactions}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      label: 'Total Transactions',
    },
    {
      amount: numberFormatter(
        homePageStats.agencyOverview.totalCompletedTransactions,
      ),
      label: 'Total Number of Completed Transactions',
    },
    {
      amount: numberFormatter(
        homePageStats.agencyOverview.totalFailedTransactions,
      ),
      label: 'Total  Number of Failed Transactions',
    },
    {
      amount: numberFormatter(
        homePageStats.agencyOverview.totalPendingTransactions,
      ),
      label: 'Total Number of Pending Transactions',
    },
  ]

  // array of users stats
  const agencyOveriewData2 = [
    {
      amount: numberFormatter(homePageStats.userOverview.totalUsers),
      label: 'Total Number of Users',
    },
    {
      amount: numberFormatter(
        homePageStats.userOverview.totalCompletedTransactions,
      ),
      label: 'Total NUmber of Completed Transactions',
    },
    {
      amount: numberFormatter(
        homePageStats.userOverview.totalFailedTransactions,
      ),
      label: 'Total Number of Failed Transactions',
    },
    {
      amount: numberFormatter(
        homePageStats.userOverview.totalPendingTransactions,
      ),
      label: 'Total Number of Pending Transactions',
    },
  ]

  // DataGrid rows
  let rows = []
  // check if providerList is an array
  // if (Array.isArray(transData)) {
  //   rows = transData.map((item, index) => {
  //     return {
  //       id: item.tid,
  //       col1: index + 1,
  //       col2: item.initiator,
  //       col3: item.transType,
  //       col4: item.amount,
  //       col5: item.fee,
  //       col6: item.paymentRef,
  //       col7: item.paymentMethod,
  //       col8: item.transtatus,
  //       col9: item.transDate,
  //       col10: '',
  //     }
  //   })
  // } else {
  //   rows = []
  // }

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
      headerName: 'Initiator',
      minWidth: 227,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col3',
      headerName: 'Type',
      minWidth: 140,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col4',
      headerName: 'Amount',
      minWidth: 126,
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
      headerName: 'Charge',
      minWidth: 101,
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
      headerName: 'Transaction Ref.',
      minWidth: 270,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col7',
      headerName: 'Payment Method',
      minWidth: 184,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col8',
      headerName: 'Status',
      minWidth: 131,
      flex: 1,
      headerClassName: 'grid-header',
      disableClickEventBubbling: true,
      renderCell: params => {
        return (
          <span css={[tw`p-1 rounded bg-border2 text-paysure-100`]}>
            {params.row.col8}
          </span>
        )
      },
    },
    {
      field: 'col9',
      headerName: 'Notification Time',
      minWidth: 200,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span>{moment(params.row.col9).format('MMM DD, YYYY HH:mm')}</span>
        )
      },
    },
    {
      field: 'col10',
      headerName: 'Action',
      minWidth: 100,
      flex: 1,
      sortable: false,
      headerClassName: 'grid-header',

      renderCell: params => {
        const handlePrint = () => {}

        return (
          <ReactToPrint
            trigger={() => (
              <button onClick={handlePrint} tw="normal-case text-paysure-100">
                Print
              </button>
            )}
            content={() => componentRef.current}
          />
        )
      },
    },
  ]

  const componentRef = React.useRef()

  return (
    <Layout title="Home">
      <Ttile className="font-bold">
        Welcome to Paysure
        <TitleSpan>
          Manage all transactions and data on the Paysure service
        </TitleSpan>
      </Ttile>

      <HomeDisplayCard data={homePageData} isGridThree hasIcon />

      <OverviewCardSection title="Agency Overview" data={agencyOveriewData} />

      <OverviewCardSection title="User Overview" data={agencyOveriewData2} />

      {/* Chart */}
      <div tw="grid mt-10 gap-5 lg:(grid-cols-2)">
        <Chart title="Income for Agency Banking" />
        <Chart title="Income for Users" />
      </div>

      <DataGridViewTemp
        link="/transactions/transactions_list"
        limited
        title="Recent Transactions"
        rows={rows}
        columns={columns}
      />

      {/* Print */}
      <div>
        <div tw="hidden">
          <Receipt ref={componentRef} isTransaction />
        </div>
      </div>
    </Layout>
  )
}

// Tailwind styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`
const TitleSpan = tw.span`block text-light-dark text-sm font-normal mt-1.5 tracking-normal lg:(text-base) xl:mt-3`

export default HomeDashboard
