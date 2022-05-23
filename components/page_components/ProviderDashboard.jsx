import React from 'react'
import axios from 'axios'
import moment from 'moment'
import tw from 'twin.macro'
import uid from 'generate-unique-id'
import OtpInput from 'react-otp-input'
import CurrencyFormat from 'react-currency-format'
import { usePaystackPayment } from 'react-paystack'
import { Button, IconButton, Menu, MenuItem } from '@mui/material'

import numberFormatter from '../../utils/numberFormatter'
import Layout from '../layouts/main_layout/index.main_layout'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'
import { onClose, onSuccess } from '../../utils/Paystack'
import { DataGridViewTemp, HomeDisplayCard, OverviewCardSection } from '..'
import { EllipsisSVG, Print, SuccessfulSVG, ViewActionSVG } from '../SVGIcons'

const UserDashboard = ({ providerData, providerName }) => {
  console.log(
    '🚀 ~ file: ProviderDashboard.jsx ~ line 20 ~ UserDashboard ~ providerData',
    providerData,
  )
  const config = {
    reference: new Date().getTime().toString(),
    email: 'email@gmail.com',
    amount: 500,
    publicKey: 'pk_live_fcbb491ce3cfb18d0e101a0879b21c9f04f9dad2',
    metadata: {
      custom_field: [
        {
          'First Name': 'firstName',
          'Last Name': 'lastName',
          'Transaction ID': uid({ length: 20 }),
          'Phone Number': 'phone',
          'Wallet ID': 2342424,
        },
      ],
    },
  }

  const { providerTrxData = [], tradeSummaries = [] } = providerData

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

  const initializePayment = usePaystackPayment(config)

  // functions
  const handleDeactivate = () => {
    axios
      .post('/api/providers/disable', {
        tid: providerData.tid,
      })
      .then(res => {
        console.log(res)

        // Router.push('/providers')
      })
  }

  const open = Boolean(anchorEl)

  const handleBtnMenuShown = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handSetIsModalOpened = () => setIsModalOpened(true)
  // const handSetIsModalOpened = () => initializePayment(onSuccess, onClose)

  const handleOTPChange = otp => setOTP(otp)

  const handleModalBtnClick = () => {
    // fund wallet
    if (modalState === 'fundWallet') {
      initializePayment(onSuccess, onClose)

      // setModalState('newCard')
      // setModalTitle(['New Card', 'Continue'])
    }

    // new card
    if (modalState === 'newCard') {
      initializePayment(onSuccess, onClose)

      // setModalState('otp')
      // setModalTitle(['Enter OTP', 'Complete'])
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
  }

  // Array of the provider data
  const providerDataArray = [
    {
      amount: (
        <CurrencyFormat
          value={providerData.totalTransSum}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      title: 'Total Transactions',
    },
    {
      amount: numberFormatter(providerData.completedTransCount),
      title: 'Total Number of Completed Transactions',
    },
    {
      amount: numberFormatter(providerData.failedCount),
      title: 'Total Number of Failed Transactions',
    },
    {
      amount: numberFormatter(providerData.pendingTransCount),
      title: 'Total Number of Pending Transactions',
    },
  ]

  // rows
  let rows
  // check if providerList is an array
  if (Array.isArray(providerTrxData)) {
    rows = providerTrxData.map((item, index) => {
      return {
        id: item.tid,
        col1: index + 1,
        col2: item.transType,
        col3: item.requestId,
        col4: item.amount,
        col5: item.fee,
        col6: item.transtatus,
        col7: item.transDate,
        col8: '',
      }
    })
  } else {
    rows = []
  }

  // array of trade summaries
  const trandeSummariesData = tradeSummaries.map(item => {
    return {
      amount: (
        <CurrencyFormat
          value={item.totalTransSum}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      label: item.transType,
      link: `/providers/${providerName}/${item.transType}`,
    }
  })

  return (
    <Layout goBack>
      <Header>
        <div tw="flex justify-between items-center w-full xl:w-[inherit]">
          {/* Avatar */}
          <AvatarWrapper>
            <AvatarDetails>
              <UserName className="font-bold">{providerName}</UserName>
              <LastSeen>
                {tradeSummaries.map((type, index) => {
                  return (
                    <span key={index}>
                      {type.transType} {index > 1 && <span tw="ml-1">|</span>}
                    </span>
                  )
                })}
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
              value={providerData.walletBalance}
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
                Didn&apos;t receive code?{' '}
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
      <HomeDisplayCard data={providerDataArray} />
      {/* Services */}
      <OverviewCardSection title="Services" data={trandeSummariesData} />
      {/* DataGrid */}
      <DataGridViewTemp
        limited
        link={`/providers/${providerName}/transaction_list`}
        title="Transaction Records"
        rows={rows}
        columns={columns}
      />
    </Layout>
  )
}

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
    headerName: 'Service Type',
    minWidth: 157,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Transaction ID',
    minWidth: 200,
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
          {params.row.col6}
        </span>
      )
    },
  },
  {
    field: 'col7',
    headerName: 'Date',
    minWidth: 170,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return <span>{moment(params.row.col7).format('MMM DD, YYYY HH:mm')}</span>
    },
  },
  {
    field: 'col8',
    headerName: 'Action.',
    minWidth: 100,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      const handleEdit = () => {}

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
