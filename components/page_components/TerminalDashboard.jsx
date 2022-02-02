import React from 'react'
import tw from 'twin.macro'
import { Button, Chip } from '@mui/material'

import { UserProfileSVG } from '../SVGIcons'
import { DataGridViewTemp, HomeDisplayCard } from '..'
import Layout from '../layouts/main_layout/index.main_layout'

const TerminalDashboard = () => {
  return (
    <Layout goBack>
      <Header>
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

      <HomeDisplayCard data={temporalData} />

      {/* DataGrid */}
      <DataGridViewTemp
        limited
        link="/users/1/transaction_list"
        title={`Transaction History`}
        rows={rows}
        columns={columns}
        dropdownData={dropdownData}
      />
    </Layout>
  )
}

// FIXME: Temp data (should be replaced with real data)
const userDetails = {
  agent: 'Bolarinwa Bimbola',
  superAgent: 'Jerome Bell',
  serialNumber: 'BA93493434',
  plan: 'Percentage plan 0.4',
  bank: 'Standard Chartered',
  merchant: 'Omosade Olugbale',
  nibbsRank: '32%',
  lastTransaction: 'Dec 31, 2019 06:33',
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

// FIXME: Temp data (should be replaced with real data)
const temporalData = [
  {
    amount: '240',
    title: 'Total Transactions',
  },
  {
    amount: '120',
    title: 'Successful Transactions',
  },
  {
    amount: '30',
    title: 'Failed Transactions',
  },
  {
    amount: '72',
    title: 'Reversed Transactions',
  },
]

// Tailwind styles
const Header = tw.div`flex flex-col space-y-4 lg:(flex-row items-center justify-between space-y-0)`
const AvatarWrapper = tw.div`flex items-center space-x-3 lg:space-x-6`
const Avatar = tw.div``
const AvatarDetails = tw.div`space-y-1 lg:space-y-2.5`
const UserName = tw.h4`text-xl lg:(text-2xl) tracking-[-0.05em] text-paysure-text-100 leading-7`
const LastSeen = tw.p`text-xs lg:(text-sm) text-[#A6B7D4] tracking-[-0.05em]`
const ButtonWrapper = tw.div`flex items-center space-x-3 lg:(space-x-2.5)`
const MUIButton = tw(
  Button,
)`normal-case text-white bg-paysure-danger-100 px-3 py-[13px] rounded-lg hover:(bg-paysure-danger-100 ring-paysure-danger-100 ring-2 ring-offset-2)`
const Title = tw.h3`tracking-[-0.02em] text-gray-dark`
const UserInfoWrapper = tw.div`border-border mt-10 p-6 border rounded-lg`
const UserGrid = tw.div`grid mt-5 gap-4 lg:(grid-cols-2 mt-10 gap-8)`
const Label = tw.label`text-light-dark flex items-center tracking-[-0.02em]`
const LabelAns = tw.p`ml-2.5 text-paysure-text-100`

export default TerminalDashboard
