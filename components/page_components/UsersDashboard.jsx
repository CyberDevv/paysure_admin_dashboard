import { Button, Tooltip } from '@mui/material'
import moment from 'moment'
import Router from 'next/router'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import tw from 'twin.macro'

import { DataGridViewTemp, HomeMetricCard } from '..'
import numberFormatter from '../../utils/numberFormatter'
import Layout from '../layouts/main_layout/index.main_layout'
import { EditActionSVG, ViewActionSVG } from '../SVGIcons'

const UserssDashboard = ({ usersStats = [], tableData = [] }) => {
  // Array of data to be displayed in the cards
  const metricData = [
    {
      amount: numberFormatter(
        usersStats.transactionsAnalytics.totalTransactions,
      ),
      title: 'Total Number of Transactions',
    },
    {
      amount: numberFormatter(
        usersStats.transactionsAnalytics.totalCompletedTransactions,
      ),
      title: 'Total Number of Completed Transactions',
    },
    {
      amount: numberFormatter(
        usersStats.transactionsAnalytics.totalFailedTransactions,
      ),
      title: 'Total Number of  Pending Transactions',
    },
    {
      amount: numberFormatter(
        usersStats.transactionsAnalytics.totalPendingTransactions,
      ),
      title: 'Total Number of  Failed Tranasctions',
    },
  ]

  // DataGrid rows
  const rows = tableData.map((item, index) => {
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

  // DataGrid columns
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
      field: 'name',
      headerName: 'Name',
      minWidth: 250,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'walletBalance',
      headerName: 'Wallet Balance',
      minWidth: 220,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <CurrencyFormat
            value={params.row.walletBalance}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          />
        )
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 270,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      minWidth: 180,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'acctNumber',
      headerName: 'Account Number',
      minWidth: 180,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 153,
      flex: 1,
      headerClassName: 'grid-header',
      disableClickEventBubbling: true,
      // renderCell: params => {
      //   return (
      //     <span
      //       css={[
      //         tw`uppercase text-[10px] p-1 rounded`,
      //         params.row.status.toLowerCase() === 'active'
      //           ? tw`bg-[#E9FBF9] text-paysure-success-100 `
      //           : tw`bg-[#FDF6EF] text-[#EDA95A] `,
      //       ]}
      //     >
      //       {params.row.status}
      //     </span>
      //   )
      // },
    },
    {
      field: 'lastTransaction',
      headerName: 'Last Transaction',
      minWidth: 174,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span>
            {params.row.lastTransaction
              ? moment(params.row.lastTransaction).format('MMM DD, YYYY HH:mm')
              : '-'}
          </span>
        )
      },
    },
    {
      field: 'dateJoined',
      headerName: 'Date Joined',
      minWidth: 173,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span>
            {moment(params.row.dateJoined).format('MMM DD, YYYY HH:mm')}
          </span>
        )
      },
    },
    {
      field: 'action',
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

          Router.push({
            pathname: `/users/${thisRow.name}`,
            // query: { email: thisRow.col4, phone: thisRow.col5 },
          })
        }

        return (
          <div tw="space-x-1">
            <Tooltip title="Edit User">
              <button onClick={handleEdit}>
                <EditActionSVG />
              </button>
            </Tooltip>

            <Tooltip title="View User">
              <button onClick={handleView}>
                <ViewActionSVG />
              </button>
            </Tooltip>
          </div>
        )
      },
    },
  ]

  return (
    <Layout title="Users">
      <div css={[tw`flex items-center justify-between`]}>
        <Ttile className="font-bold">Users</Ttile>
      </div>

      <div tw="lg:(overflow-x-auto) w-full" className="scrollHidden">
        <div tw="mt-10 grid grid-cols-2 gap-3 w-full md:grid-cols-3 lg:(flex gap-5)">
          <HomeMetricCard.CardWithActiveInActiveNoIcon
            title={`Total Number of Users`}
            active={numberFormatter(usersStats.userAnalytics.totalActiveUsers)}
            inactive={numberFormatter(
              usersStats.userAnalytics.totalInactiveUsers,
            )}
            amount={numberFormatter(usersStats.userAnalytics.totalUsers)}
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
        columns={columns}
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
