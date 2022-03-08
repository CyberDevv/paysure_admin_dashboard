import tw from 'twin.macro'
import React from 'react'

import Layout from '../layouts/main_layout/index.main_layout'
import {
  HomeDisplayCard,
  DataGridViewTemp,
  OverviewCardSection,
  DatRangePickerAndOthers,
} from '..'
import { EditActionSVG, ViewActionSVG } from '../SVGIcons'
import CurrencyFormat from 'react-currency-format'

const HomeDashboard = ({ homePageStats }) => {
  console.log(homePageStats)

  // array of home page stats
  const homePageData = [
    {
      amount: homePageStats.totalProviders,
      title: 'Total Number of Providers',
      link: '/providers',
    },
    {
      amount: homePageStats.totalProviderServices,
      title: 'Total Services Provided',
    },
    {
      amount: homePageStats.totalSuperAgents,
      title: 'Total Number of Super Agent',
      link: '/agents',
    },
    {
      amount: homePageStats.totalAgents,
      title: 'Total Number of Agents',
      link: '/agents_list',
    },
    {
      amount: homePageStats.totalSubscribers,
      title: 'Total Number of Users',
      link: '/users',
    },
    {
      amount: homePageStats.totalBusinesses,
      title: 'Total Number of Businesses',
      link: '/organizations',
    },
    {
      amount: homePageStats.totalAdmins,
      title: 'Total Number of Admins',
      link: '/sub_accounts',
    },
  ]

  // array of agent stats
  const agencyOveriewData = [
    {
      amount: (
        <CurrencyFormat
          value={homePageStats.totalSuccessfulTransactionsSum}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      label: 'Total Transactions',
    },
    {
      amount: homePageStats.totalSuccessfulTransactionsCount,
      label: 'Total Number of Completed Transactions',
    },
    {
      amount: homePageStats.totalFailedTransactionsCount,
      label: 'Total  Number of Failed Transactions',
    },
    {
      amount: '20(dummy)',
      label: 'Total Number of Pending Transactions',
    },
  ]

  return (
    <Layout title="Home">
      <Ttile className="font-bold">
        Welcome to Paysure
        <TitleSpan>
          Manage all transactions and data on the Paysure service
        </TitleSpan>
      </Ttile>

      <HomeDisplayCard data={homePageData} hasIcon />

      <OverviewCardSection title="Agency Overview" data={agencyOveriewData} />

      <OverviewCardSection title="User Overview" data={agencyOveriewData2} />

      <DataGridViewTemp
        link="/transactions/transactions_list"
        limited
        title="Recent Transactions"
        rows={rows}
        columns={columns}
        dropdownData={dropdownData}
        hasSearch
        hasFilter
        hasSort
        hasExportBtn
      />
    </Layout>
  )
}

// FIXME: Temp data (should be replaced with real data)
const dropdownData = [
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
    id: 2,
    col1: 2,
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
  },
  {
    field: 'col5',
    headerName: 'Charge',
    minWidth: 101,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col6',
    headerName: 'Transaction Ref.',
    minWidth: 139,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col7',
    headerName: 'Payment Method',
    minWidth: 144,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col8',
    headerName: 'Status',
    minWidth: 101,
    flex: 1,
    headerClassName: 'grid-header',
    disableClickEventBubbling: true,
    renderCell: params => {
      return (
        <span css={[tw`bg-border2 text-paysure-100 p-1 rounded`]}>
          {params.row.col8}
        </span>
      )
    },
  },
  {
    field: 'col9',
    headerName: 'Notification Time',
    minWidth: 185,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col10',
    headerName: 'Action',
    minWidth: 100,
    flex: 1,
    sortable: false,
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
          <button onClick={handleEdit}>
            <EditActionSVG />
          </button>

          <button onClick={handleView}>
            <ViewActionSVG />
          </button>
        </div>
      )
    },
  },
]

// FIXME: Temp data (should be replaced with real data)
const agencyOveriewData2 = [
  {
    amount: 102430,
    label: 'Total Number of Users',
  },
  {
    amount: 322321350,
    label: 'Total NUmber of Completed Transactions',
  },
  {
    amount: 10,
    label: 'Total Number of Failed Transactions',
  },
  {
    amount: 20,
    label: 'Total Number of Pending Transactions',
  },
]

// Tailwind styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`
const TitleSpan = tw.span`block text-light-dark text-sm font-normal mt-1.5 tracking-normal lg:(text-base) xl:mt-3`

export default HomeDashboard
