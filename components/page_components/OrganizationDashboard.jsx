import React from 'react'
import tw from 'twin.macro'
import CurrencyFormat from 'react-currency-format'
import { Button, IconButton, Menu, MenuItem } from '@mui/material'

import { EllipsisSVG } from '../SVGIcons'
import numberFormatter from '../../utils/numberFormatter'
import Layout from '../layouts/main_layout/index.main_layout'
import { DataGridViewTemp, HomeDisplayCard, OverviewCardSection } from '..'

const UserDashboard = ({ organizationStats = [], organizationName }) => {
  console.log(
    '🚀 ~ file: OrganizationDashboard.jsx ~ line 12 ~ UserDashboard ~ organizationStats',
    organizationStats,
  )
  // useState hook
  const [anchorEl, setAnchorEl] = React.useState(null)

  // functions
  const handleDeactivate = () => clg('handleDeactivate')

  const open = Boolean(anchorEl)

  const handleBtnMenuShown = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // overview data
  const organizationData = [
    {
      amount: (
        <CurrencyFormat
          value={organizationStats.transSum}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      title: 'Total Transactions (N)',
    },
    {
      amount: numberFormatter('120'),
      title: 'Total Completed Transactions',
    },
    {
      amount: numberFormatter('30'),
      title: 'Total Failed Transactions',
    },
    {
      amount: numberFormatter('72'),
      title: 'Total Pending Transactions',
    },
  ]

  return (
    <Layout goBack>
      <Header>
        <div tw="flex justify-between items-center w-full xl:w-[inherit]">
          {/* Avatar */}
          <AvatarWrapper>
            <AvatarDetails>
              <UserName className="font-bold">{organizationName}</UserName>
              <LastSeen>POS Withdrawal | Transfer | BVN</LastSeen>
            </AvatarDetails>
          </AvatarWrapper>

          {/* buttons  */}
          <div>
            <IconButton
              id="basic-button"
              aria-controls={open ? 'Btnmenu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleBtnMenuShown}
              tw="md:hidden lg:block xl:hidden"
            >
              <EllipsisSVG />
            </IconButton>

            <Menu
              id="Btnmenu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>
                <button onClick={handleDeactivate}>Deactivate</button>
              </MenuItem>
            </Menu>
          </div>
        </div>

        {/* Action Buttons */}
        <ButtonWrapper>
          <MUIButton
            onClick={handleDeactivate}
            tw="bg-paysure-danger-100 hover:(bg-paysure-danger-100 ring-paysure-danger-100)"
          >
            Deactivate
          </MUIButton>
        </ButtonWrapper>
      </Header>

      {/* Wallet balance */}
      <WalletWrapper className="bgSVG">
        <P className="font-500">Total Wallet Balance</P>
        <Amount className="font-500">
          <CurrencyFormat
            value={organizationStats.walletBalance}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          />
        </Amount>
      </WalletWrapper>

      <HomeDisplayCard data={organizationData} />

      {/* Services */}
      <OverviewCardSection
        title="Services"
        data={servicesData}
        onClick="/organizations/1/service/1"
      />

      {/* DataGrid */}
      <DataGridViewTemp
        limited
        link="/organizations/1/transaction_list"
        title="Transaction Records"
        rows={rows}
        columns={columns}
      />
    </Layout>
  )
}

// FIXME: Temp data (should be replaced with real data)
const servicesData = [
  {
    amount: numberFormatter(55102430),
    label: 'POS Withdrawal',
  },
  {
    amount: numberFormatter(1350),
    label: 'Transfer',
  },
  {
    amount: numberFormatter(10),
    label: 'BVN',
  },
]

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
  },
  {
    field: 'col2',
    headerName: 'Name of Organisation',
    minWidth: 227,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Services',
    minWidth: 236,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Services',
    minWidth: 103,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col5',
    headerName: 'No. of Transactions',
    minWidth: 176,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col6',
    headerName: 'Wallet Balance',
    minWidth: 150,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col7',
    headerName: 'Transactions{N}',
    minWidth: 144,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col8',
    headerName: 'Charges',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
    disableClickEventBubbling: true,
    // renderCell: params => {
    //   return (
    //     <span css={[tw`bg-border2 text-paysure-100 p-1 rounded`]}>
    //       {params.row.col8}
    //     </span>
    //   )
    // },
  },
  {
    field: 'col9',
    headerName: 'Date Added',
    minWidth: 123,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col10',
    headerName: 'Action.',
    minWidth: 100,
    flex: 1,
    headerClassName: 'grid-header',
  },
]

// Tailwind styles
const Header = tw.div`flex flex-col space-y-4 lg:(flex-row items-center justify-between space-y-0)`
const AvatarWrapper = tw.div`flex items-center space-x-3 lg:space-x-6`
const AvatarDetails = tw.div`space-y-1 lg:space-y-2.5`
const UserName = tw.h4`text-xl lg:(text-2xl) tracking-[-0.05em] text-paysure-text-100 leading-7`
const LastSeen = tw.p`text-xs lg:(text-sm) text-[#A6B7D4] tracking-[-0.05em]`
const ButtonWrapper = tw.div`hidden md:flex items-center space-x-3 lg:(space-x-2.5 hidden) xl:flex`
const MUIButton = tw(
  Button,
)`normal-case text-white bg-paysure-100 px-3 py-[13px] rounded-lg hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`
const UserGrid = tw.div`mt-5 space-y-4 lg:(mt-10 space-y-6)`
const WalletWrapper = tw.div`mt-10 p-4 space-y-1 rounded-xl lg:(py-10 px-8 space-y-4 rounded-[28px])`
const P = tw.p`leading-[19px] text-sm lg:text-base`
const Amount = tw.h4`text-4xl lg:text-[40px] leading-[48px] tracking-[-0.05em]`
UserGrid

export default UserDashboard
