import { Button } from '@mui/material'
import React from 'react'
import tw from 'twin.macro'

import { DataGridViewTemp, HomeMetricCard } from '..'
import numberFormatter from '../../utils/numberFormatter'
import { UsersListColumn } from '../Columns'
import Layout from '../layouts/main_layout/index.main_layout'

const UserssDashboard = ({ usersStats, tableData }) => {
  // Array of data to be displayed in the cards
  const metricData = [
    {
      amount: numberFormatter(
        usersStats.transactionsAnalytics?.totalTransactions || 0,
      ),
      title: 'Total Number of Transactions',
    },
    {
      amount: numberFormatter(
        usersStats.transactionsAnalytics?.totalCompletedTransactions || 0,
      ),
      title: 'Total Number of Completed Transactions',
    },
    {
      amount: numberFormatter(
        usersStats.transactionsAnalytics?.totalFailedTransactions || 0,
      ),
      title: 'Total Number of  Pending Transactions',
    },
    {
      amount: numberFormatter(
        usersStats.transactionsAnalytics?.totalPendingTransactions || 0,
      ),
      title: 'Total Number of  Failed Tranasctions',
    },
  ]

  // DataGrid rows
  const rows =
    tableData.length > 0
      ? tableData.map((item, index) => {
          return {
            id: index,
            col1: index + 1,
            name: item.fullName,
            walletBalance: item.walletBalance,
            email: item.userEmail,
            phoneNumber: item.phoneNumber,
            acctNumber: item.accountNumber,
            status: item.status,
            lastTransaction: item.lastTransaction,
            dateJoined: item.createOn,
            actions: '',
          }
        })
      : []

  return (
    <Layout title="Users">
      <div css={[tw`flex items-center justify-between`]}>
        <Ttile className="font-bold">Users</Ttile>
      </div>

      <div tw="lg:(overflow-x-auto) w-full" className="scrollHidden">
        <div tw="mt-10 grid grid-cols-2 gap-3 w-full md:grid-cols-3 lg:(flex gap-5)">
          <HomeMetricCard.CardWithActiveInActiveNoIcon
            title={`Total Number of Users`}
            active={numberFormatter(
              usersStats.userAnalytics?.totalActiveUsers || 0,
            )}
            inactive={numberFormatter(
              usersStats.userAnalytics?.totalInactiveUsers || 0,
            )}
            amount={numberFormatter(usersStats.userAnalytics?.totalUsers || 0)}
          />
          {metricData.map(({ amount, title }, index) => {
            return (
              <HomeMetricCard.PlainCard
                key={index}
                title={title}
                amount={amount}
              />
            )
          })}
        </div>
      </div>

      <DataGridViewTemp
        link="/users/users_list"
        limited
        title="Users list"
        rows={rows}
        columns={UsersListColumn}
        className={tw`space-y-4 md:(grid grid-cols-2) xl:(flex space-y-0 space-x-4 w-full)`}
      />
    </Layout>
  )
}

// Tailwind Styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 pl-3.5 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`
const FlexBox = tw.div`flex items-center justify-between space-x-4`

export default UserssDashboard
