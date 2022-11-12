import moment from 'moment'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import ReactToPrint from 'react-to-print'
import tw from 'twin.macro'

import {
  DataGridViewTemp,
  HomeMetricCard,
  OverviewCardSection,
  Receipt,
} from '..'
import numberFormatter from '../../utils/numberFormatter'
import Chart from '../Chart'
import { HomeRecentTransColumn } from '../Columns'
import Layout from '../layouts/main_layout/index.main_layout'

const HomeDashboard = ({ homePageStats = [] }) => {
  // array of home page stats
  const homePageData = [
    {
      amount: numberFormatter(homePageStats[0].totalProviders),
      title: 'Total Number of Providers',
      link: '/providers',
    },
    {
      amount: numberFormatter(
        homePageStats[0].clusterManagerAnalytics.totalCLM,
      ),
      title: 'Total Number of Cluster Manager',
      link: '/agents',
    },
    {
      amount: numberFormatter(
        homePageStats[0].aggregatorAnalytics.totalAggregator,
      ),
      title: 'Total Number of Aggregators',
      link: '/agents',
    },
    {
      amount: numberFormatter(homePageStats[0].userAnalytics.totalUsers),
      title: 'Total Number of Users',
      link: '/users',
      active: numberFormatter(homePageStats[0].userAnalytics.totalActiveUsers),
      inactive: numberFormatter(
        homePageStats[0].userAnalytics.totalInactiveUsers,
      ),
    },
    {
      amount: numberFormatter(
        homePageStats[0].terminalAnalytics.totalTerminals,
      ),
      title: 'Total Number of Terminals',
      link: '/terminals',
      active: numberFormatter(
        homePageStats[0].terminalAnalytics.totalActiveTerminals,
      ),
      inactive: numberFormatter(
        homePageStats[0].terminalAnalytics.totalInactiveTerminals,
      ),
    },
    {
      amount: numberFormatter(homePageStats[0].agentAnalytics.totalAgents),
      title: 'Total Number of Agents',
      link: '/agents',
      active: numberFormatter(
        homePageStats[0].agentAnalytics.totalActiveAgents,
      ),
      inactive: numberFormatter(
        homePageStats[0].agentAnalytics.totalInactiveAgents,
      ),
    },
  ]

  // array of agent stats
  const agencyOveriewData = [
    {
      amount: (
        <CurrencyFormat
          value={homePageStats[0].agencyOverview.totalTransactions}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      label: 'Total Transactions',
    },
    {
      amount: numberFormatter(
        homePageStats[0].agencyOverview.totalCompletedTransactions,
      ),
      label: 'Total Number of Completed Transactions',
    },
    {
      amount: numberFormatter(
        homePageStats[0].agencyOverview.totalFailedTransactions,
      ),
      label: 'Total  Number of Failed Transactions',
    },
    {
      amount: numberFormatter(
        homePageStats[0].agencyOverview.totalPendingTransactions,
      ),
      label: 'Total Number of Pending Transactions',
    },
  ]

  // array of users stats
  const agencyOveriewData2 = [
    {
      amount: numberFormatter(homePageStats[0].userOverview.totalUsers),
      label: 'Total Number of Users',
    },
    {
      amount: numberFormatter(
        homePageStats[0].userOverview.totalCompletedTransactions,
      ),
      label: 'Total NUmber of Completed Transactions',
    },
    {
      amount: numberFormatter(
        homePageStats[0].userOverview.totalFailedTransactions,
      ),
      label: 'Total Number of Failed Transactions',
    },
    {
      amount: numberFormatter(
        homePageStats[0].userOverview.totalPendingTransactions,
      ),
      label: 'Total Number of Pending Transactions',
    },
  ]

  // DataGrid rows
  let rows =
    homePageStats[3].length > 0
      ? homePageStats[3].map((item, index) => {
          return {
            id: index,
            col1: index + 1,
            initiator: item.initiator,
            type: item.type,
            amount: item.amount,
            charge: item.charge,
            transactionRef: item.transactionRef,
            paymentMethod: item.paymentMethod,
            status: item.status,
            date: item.date,
            actions: '',
          }
        })
      : []

  const componentRef = React.useRef()

  return (
    <Layout title="Home">
      <Ttile className="font-bold">
        Welcome to Paysure
        <TitleSpan>
          Manage all transactions and data on the Paysure service
        </TitleSpan>
      </Ttile>

      <div tw="grid grid-cols-2 gap-3 md:grid-cols-3 xl:(gap-5) mt-10">
        {homePageData.map(
          ({ amount, active, inactive, link, title }, index) => {
            return (
              <HomeMetricCard.CardWithActiveInActive
                key={index}
                title={title}
                link={link}
                amount={amount}
                active={active || null}
                inactive={inactive || null}
              />
            )
          },
        )}
      </div>

      <OverviewCardSection title="Agency Overview" data={agencyOveriewData} />

      <OverviewCardSection title="User Overview" data={agencyOveriewData2} />

      {/* Chart */}
      <div tw="grid mt-10 gap-5 lg:(grid-cols-2)">
        <Chart data={homePageStats[2]} title="Income for Agency Banking" />
        <Chart title="Income for Users" data={homePageStats[1]} />
      </div>

      <DataGridViewTemp
        link="/transactions/transactions_list"
        limited
        title="Recent Transactions"
        rows={rows}
        columns={HomeRecentTransColumn}
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
