import React from 'react'
import tw from 'twin.macro'
import OtpInput from 'react-otp-input'
import CurrencyFormat from 'react-currency-format'
import { Button, IconButton, Menu, MenuItem } from '@mui/material'

import Layout from '../layouts/main_layout/index.main_layout'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'
import { DataGridViewTemp, HomeDisplayCard, OverviewCardSection } from '..'
import { EllipsisSVG, Print, SuccessfulSVG, ViewActionSVG } from '../SVGIcons'

const UserDashboard = () => {
  // useState hook
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [isModalOpened, setIsModalOpened] = React.useState(false)
  const [modalState, setModalState] = React.useState('fundWallet')
  const [fundAmount, setFundAmount] = React.useState('0.00')
  const [cardNumber, setCardNumber] = React.useState('')
  const [otp, setOTP] = React.useState('')
  const [expiryDate, setExpiryDate] = React.useState('')
  const [cvv, setCVV] = React.useState('')
  const [modalTitle, setModalTitle] = React.useState([
    'Fund Wallet',
    'Continue',
  ])

  // functions
  const handleDeactivate = React.useCallback(() => clg('handleDeactivate'))

  const open = Boolean(anchorEl)

  const handleBtnMenuShown = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handSetIsModalOpened = React.useCallback(() => setIsModalOpened(true))

  const handleOTPChange = React.useCallback(otp => setOTP(otp))

  const handleModalBtnClick = React.useCallback(() => {
    // fund wallet
    if (modalState === 'fundWallet') {
      setModalState('newCard')
      setModalTitle(['New Card', 'Continue'])
    }

    // new card
    if (modalState === 'newCard') {
      setModalState('otp')
      setModalTitle(['Enter OTP', 'Complete'])
    }

    // otp
    if (modalState === 'otp') {
      setModalState('selectCard')
      setModalTitle(['Select Card', 'Proceed'])
    }

    // selectCard
    if (modalState === 'selectCard') {
      setIsModalOpened(false)

      setModalState('fundWallet')
      setModalTitle(['Fund Wallet', 'Continue'])
    }
  })

  return (
    <Layout goBack>
      <Header>
        <div tw="flex justify-between items-center w-full xl:w-[inherit]">
          {/* Avatar */}
          <AvatarWrapper>
            <AvatarDetails>
              <UserName className="font-bold">{userDetails.name}</UserName>
              <LastSeen>Data | Airtime | Transfer</LastSeen>
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
        <div>
          <P className="font-500">Total Wallet Balance</P>
          <Amount className="font-500">
            <CurrencyFormat
              value={350034}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'₦'}
            />
          </Amount>
        </div>

        <MUIButton onClick={handSetIsModalOpened}>Fund Wallet</MUIButton>

        {/* Add Users modal */}
        <Modal
          setState={setIsModalOpened}
          title={modalTitle[0]}
          state={isModalOpened}
          buttonLabel={modalTitle[1]}
          onClick={handleModalBtnClick}
        >
          {/* Fund Wallet */}
          {modalState === 'fundWallet' && (
            <div tw="my-16 flex flex-col items-center justify-center">
              <input
                tw="text-[32px] text-paysure-text-100 w-full text-center focus:outline-none"
                type="text"
                value={fundAmount}
                onChange={e => setFundAmount(e.target.value)}
              />

              <p tw="text-sm text-[#505780]">Enter Amount</p>
            </div>
          )}

          {/* New card */}
          {modalState === 'newCard' && (
            <div tw="my-8 space-y-10">
              <Label
                label="Enter Card Number"
                type="text"
                value={cardNumber}
                setState={setCardNumber}
                placeholder="0000 0000 0000 0000"
              />
              <FlexBox>
                <Label
                  label="Exp date"
                  type="text"
                  value={expiryDate}
                  setState={setExpiryDate}
                />
                <Label
                  label="CVV"
                  type="text"
                  placeholder=""
                  value={cvv}
                  setState={setCVV}
                />
              </FlexBox>
            </div>
          )}

          {/* Enter OTP */}
          {modalState === 'otp' && (
            <div tw="my-8 space-y-7">
              <p tw="text-[13px] text-[#454D54] text-center">
                A one time password was sent to you
              </p>

              <OtpInput
                value={otp}
                onChange={handleOTPChange}
                numInputs={6}
                isInputSecure
                shouldAutoFocus
                inputStyle={{
                  fontSize: '32px',
                  border: '1px solid #E3E5E8',
                  // padding: '0 20px',
                  borderRadius: '4px',
                  width: '100%',
                  margin: '0 4px',
                }}
                containerStyle={{
                  displa: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
                // separator={<span>-</span>}
              />

              <p tw="text-[13px] text-[#454D54] text-center">
                Didn't receive code?{' '}
                <a href="" tw="text-paysure-100 hover:(underline)">
                  Request again
                </a>
              </p>
            </div>
          )}

          {/* Select Card */}
          {modalState === 'selectCard' && (
            <div tw="my-8 flex flex-col items-center justify-center">
              <SuccessfulSVG />

              <h4 tw="text-[24px] mt-6" className="font-500">
                Transaction Successful
              </h4>

              <p tw="text-[#666666] text-[14px] mt-2">
                <CurrencyFormat
                  value={fundAmount}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'₦'}
                />{' '}
                has been added to your wallet
              </p>
            </div>
          )}
        </Modal>
      </WalletWrapper>
      <HomeDisplayCard data={temporalData} />
      {/* Services */}
      <OverviewCardSection title="Services" data={agencyOveriewData} />
      {/* DataGrid */}
      <DataGridViewTemp
        limited
        link="/organizations/1/transaction_list"
        title="Transaction Records"
        rows={rows}
        columns={columns}
        dropdownData={dropdownData}
        hasFilter
        hasSort
        // TODO: has additional filter action
      />
    </Layout>
  )
}

// FIXME: Temp data (should be replaced with real data)
const agencyOveriewData = [
  {
    amount: (
      <CurrencyFormat
        value={887655}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'₦'}
      />
    ),
    label: 'Airtime',
    link: '/providers/1/airtime_transactionRecord',
  },
  {
    amount: (
      <CurrencyFormat
        value={7655}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'₦'}
      />
    ),
    label: 'Data',
    link: '/providers/1/data_transactionRecord',
  },
  {
    amount: (
      <CurrencyFormat
        value={89787}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'₦'}
      />
    ),
    label: 'Transfer',
    link: '/providers/1/transfer_transactionRecord',
  },
]

// FIXME: Temp data (should be replaced with real data)
const userDetails = {
  name: 'ETRANSACT',
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
    headerName: 'Service Type',
    minWidth: 157,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Transaction ID',
    minWidth: 186,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Amount',
    minWidth: 143,
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
    minWidth: 126,
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
    headerName: 'Status',
    minWidth: 150,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <span
          css={
            params.row.col8.toLowerCase() === 'pending'
              ? tw`bg-[#EBF2FA] text-[#A6B7D4] p-1 rounded capitalize`
              : tw`bg-border2 text-paysure-100 p-1 rounded capitalize`
          }
        >
          {params.row.col8}
        </span>
      )
    },
  },
  {
    field: 'col9',
    headerName: 'Date',
    minWidth: 170,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col10',
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

        // Router.push(`/users/${thisRow.col1}`)
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

// FIXME: Temp data (should be replaced with real data)
const temporalData = [
  {
    amount: (
      <CurrencyFormat
        value={89787655}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'₦'}
      />
    ),
    title: 'Total Transactions',
  },
  {
    amount: '120',
    title: 'Total Number of Completed Transactions',
  },
  {
    amount: '30',
    title: 'Total Number of Failed Transactions',
  },
  {
    amount: '72',
    title: 'Total Number of Pending Transactions',
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
const WalletWrapper = tw.div`mt-10 p-4 space-y-1 flex items-center justify-between rounded-xl lg:(py-10 px-8 space-y-4 rounded-[28px])`
const P = tw.p`leading-[19px] text-sm lg:text-base`
const Amount = tw.h4`text-4xl lg:text-[40px] leading-[48px] tracking-[-0.05em]`
const FlexBox = tw.div`flex items-center justify-between space-x-4`

export default UserDashboard
