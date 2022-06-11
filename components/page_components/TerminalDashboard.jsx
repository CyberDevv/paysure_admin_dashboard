import React from 'react'
import moment from 'moment'
import tw from 'twin.macro'
import { Button, IconButton, Chip, Menu, MenuItem } from '@mui/material'

import { DataGridViewTemp, HomeDisplayCard } from '..'
import numberFormatter from '../../utils/numberFormatter'
import Layout from '../layouts/main_layout/index.main_layout'
import { UserProfileSVG, Print, EllipsisSVG, ViewActionSVG } from '../SVGIcons'

const TerminalDashboard = ({ terminalStats = [] }) => {
  const { TerminalTransactionsStats = [] } = terminalStats

  const [anchorEl, setAnchorEl] = React.useState(null)

  // functions
  const open = Boolean(anchorEl)

  const handleBtnMenuShown = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handSetIsSuspendModalOpened = () => setIsSuspendAccountModalOpened(true)

  const handleSetNote = e => {
    setNote(e.target.value)
  }

  /* A constant that holds the user details. */
  const userDetails = {
    agent: terminalStats.agentName,
    superAgent: terminalStats.none,
    serialNumber: terminalStats.serialNumber,
    plan: terminalStats.plan,
    bank: terminalStats.none,
    merchant: terminalStats.merchantName,
    nibbsRank: `${terminalStats.nibssRate}%`,
    lastTransaction: terminalStats.lastTransaction
      ? moment(terminalStats.lastTransaction).format('MMM DD, YYYY HH:mm')
      : '-',
  }

  /* A constant that holds the data for the overview card. */
  const overviewDataArray = [
    {
      amount: numberFormatter(TerminalTransactionsStats.transCount),
      title: 'Total Number of Transactions',
    },
    {
      amount: numberFormatter(TerminalTransactionsStats.successfulCount),
      title: 'Total Number of Successful Transactions',
    },
    {
      amount: numberFormatter(TerminalTransactionsStats.failedCount),
      title: 'Total Number of Failed Transactions',
    },
    {
      amount: numberFormatter(TerminalTransactionsStats.reversedCount),
      title: 'Total Number of Reversed Transactions',
    },
  ]

  return (
    <Layout goBack>
      <Header>
        <div tw="flex justify-between items-center w-full xl:w-[inherit]">
          {/* Avatar */}
          <AvatarWrapper>
            <Avatar>
              <UserProfileSVG />
            </Avatar>

            <AvatarDetails>
              <UserName className="font-bold">TID - U8329</UserName>
              <LastSeen>
                Jaja Wakachu
                <Chip
                  sx={tw`text-paysure-success-100 uppercase ml-2.5 bg-[#E9FBF9] h-auto p-1 rounded text-[10px] leading-[12px]`}
                  label="Active"
                />{' '}
              </LastSeen>
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
                <button onClick={handSetIsSuspendModalOpened}>
                  Suspend Terminal
                </button>
              </MenuItem>
            </Menu>
          </div>
        </div>

        {/* Action Buttons */}
        <ButtonWrapper>
          <MUIButton>Suspend Terminal</MUIButton>
        </ButtonWrapper>
      </Header>

      {/* User information */}
      <UserInfoWrapper>
        <Title className="font-500">Terminal Information</Title>

        {/* User details */}
        <UserGrid>
          <Label>
            Agent
            <LabelAns>{userDetails.agent}</LabelAns>
          </Label>

          <Label>
            Super Agent
            <LabelAns>{userDetails.superAgent}</LabelAns>
          </Label>

          <Label>
            Serial Number
            <LabelAns>{userDetails.serialNumber}</LabelAns>
          </Label>

          <Label>
            Plan
            <LabelAns>{userDetails.plan}</LabelAns>
          </Label>

          <Label>
            Bank
            <LabelAns>{userDetails.bank}</LabelAns>
          </Label>

          <Label>
            Merchant
            <LabelAns>{userDetails.merchant}</LabelAns>
          </Label>

          <Label>
            Nibbs Rate
            <LabelAns>{userDetails.nibbsRank}</LabelAns>
          </Label>

          <Label>
            Last Transaction
            <LabelAns>{userDetails.lastTransaction}</LabelAns>
          </Label>
        </UserGrid>
      </UserInfoWrapper>

      <HomeDisplayCard data={overviewDataArray} />

      {/* DataGrid */}
      <DataGridViewTemp
        limited
        link="/users/1/transaction_list"
        title={`Transaction History`}
        rows={rows}
        columns={columns}
        dropdownData={dropdownData}
        // hasExportBtn
      />
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
    headerName: 'Type',
    minWidth: 227,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Transaction Ref.',
    minWidth: 236,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Amount',
    minWidth: 103,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col5',
    headerName: 'RRR',
    minWidth: 176,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col6',
    headerName: 'Status Code',
    minWidth: 150,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col7',
    headerName: 'Notification Time',
    minWidth: 144,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col8',
    headerName: 'Status',
    minWidth: 153,
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
    headerName: 'Date Added',
    minWidth: 163,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col10',
    headerName: 'Action.',
    minWidth: 130,
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

        // Router.push(`/terminals/${thisRow.col1}`)
      }

      return (
        <div tw="space-x-1">
          <button onClick={handleEdit}>
            <ViewActionSVG />
          </button>

          <button onClick={handleView}>
            <Print />
          </button>
        </div>
      )
    },
  },
]

// Tailwind styles
const Header = tw.div`flex flex-col space-y-4 lg:(flex-row items-center justify-between space-y-0)`
const AvatarWrapper = tw.div`flex items-center space-x-3 lg:space-x-6`
const Avatar = tw.div``
const AvatarDetails = tw.div`space-y-1 lg:space-y-2.5`
const UserName = tw.h4`text-xl lg:(text-2xl) tracking-[-0.05em] text-paysure-text-100 leading-7`
const LastSeen = tw.p`text-xs lg:(text-sm) text-[#A6B7D4] tracking-[-0.05em]`
const ButtonWrapper = tw.div`hidden md:flex items-center space-x-3 lg:(space-x-2.5 hidden) xl:flex`
const MUIButton = tw(
  Button,
)`normal-case text-white bg-paysure-danger-100 px-3 py-[13px] rounded-lg hover:(bg-paysure-danger-100 ring-paysure-danger-100 ring-2 ring-offset-2)`
const Title = tw.h3`tracking-[-0.02em] text-gray-dark`
const UserInfoWrapper = tw.div`border-border mt-10 p-6 border rounded-lg`
const UserGrid = tw.div`grid mt-5 gap-4 lg:(grid-cols-2 mt-10 gap-8)`
const Label = tw.label`text-light-dark flex items-center tracking-[-0.02em]`
const LabelAns = tw.p`ml-2.5 text-paysure-text-100`

export default TerminalDashboard
