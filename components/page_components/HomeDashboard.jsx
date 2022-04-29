import React from 'react'
import moment from 'moment'
import tw from 'twin.macro'

import ReactToPrint from 'react-to-print'
import CurrencyFormat from 'react-currency-format'
import numberFormatter from '../../utils/numberFormatter'
import { EditActionSVG, ViewActionSVG } from '../SVGIcons'
import Layout from '../layouts/main_layout/index.main_layout'
import {
  HomeDisplayCard,
  DataGridViewTemp,
  OverviewCardSection,
  SearchBar,
  FilterBox,
  DatRangePickerAndOthers,
  Receipt,
} from '..'

const HomeDashboard = ({ homePageStats, homePageGrid }) => {
  const { transData = [] } = homePageGrid
  // console.log(transData)

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
      link: '/agents',
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
          value={homePageGrid.agentTotalCompletedTransactionsSum}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      label: 'Total Transactions',
    },
    {
      amount: numberFormatter(homePageGrid.agentTotalCompleteTransactionsCount),
      label: 'Total Number of Completed Transactions',
    },
    {
      amount: numberFormatter(homePageGrid.agentTotalFailedTransactionsCount),
      label: 'Total  Number of Failed Transactions',
    },
    {
      amount: numberFormatter(homePageGrid.agentTotalPendingTransactionsCount),
      label: 'Total Number of Pending Transactions',
    },
  ]

  // array of users stats
  const agencyOveriewData2 = [
    {
      amount: numberFormatter(homePageStats.totalSubscribers),
      label: 'Total Number of Users',
    },
    {
      amount: numberFormatter(homePageGrid.userTotalCompleteTransactionsCount),
      label: 'Total NUmber of Completed Transactions',
    },
    {
      amount: numberFormatter(homePageGrid.userTotalFailedTransactionsCount),
      label: 'Total Number of Failed Transactions',
    },
    {
      amount: numberFormatter(homePageGrid.userTotalPendingTransactionsCount),
      label: 'Total Number of Pending Transactions',
    },
  ]

  // DataGrid rows
  const rows = transData.map((item, index) => {
    return {
      id: item.tid,
      col1: index + 1,
      col2: item.none,
      col3: item.transType,
      col4: item.amount,
      col5: item.fee,
      col6: item.paymentRef,
      col7: item.paymentMethod,
      col8: item.transtatus,
      col9: item.transDate,
      col10: '',
    }
  })

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
          <span css={[tw`bg-border2 text-paysure-100 p-1 rounded`]}>
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

        // const handlePrint = e => {
        //   const api = params.api
        //   const thisRow = {}

        //   api
        //     .getAllColumns()
        //     .filter(c => c.field !== '__check__' && !!c)
        //     .forEach(
        //       c => (thisRow[c.field] = params.getValue(params.id, c.field)),
        //     )

        //   // Router.push(`/agents/super_agent/${thisRow.col1}`)
        // }

        return (
          // <div tw="space-x-1">
          //   <button onClick={handleEdit}>
          //     <EditActionSVG />
          //   </button>

          //   <button onClick={handleView}>
          //     <ViewActionSVG />
          //   </button>
          // </div>

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

      <HomeDisplayCard data={homePageData} hasIcon />

      <OverviewCardSection title="Agency Overview" data={agencyOveriewData} />

      <OverviewCardSection title="User Overview" data={agencyOveriewData2} />

      <DataGridViewTemp
        link="/transactions/transactions_list"
        limited
        title="Recent Transactions"
        rows={rows}
        columns={columns}
        hasExportBtn
        className={tw`space-y-4 md:(grid grid-cols-2) xl:(flex space-y-0 space-x-4 w-full)`}
      >
        <div tw=" space-y-4 w-full md:(flex space-x-4 space-y-0 col-span-2)">
          <SearchBar />
          <FilterBox label="Showing" dropdownData={dropdownData} />
        </div>
        <DatRangePickerAndOthers />
      </DataGridViewTemp>

      {/* Print */}
      <div>
        <div tw="hidden">
          <Receipt ref={componentRef} isTransaction />
        </div>
      </div>
    </Layout>
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

// Tailwind styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`
const TitleSpan = tw.span`block text-light-dark text-sm font-normal mt-1.5 tracking-normal lg:(text-base) xl:mt-3`

export default HomeDashboard
