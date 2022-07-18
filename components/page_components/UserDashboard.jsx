import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { toast } from 'react-toastify'
import tw from 'twin.macro'

import { DataGridViewTemp, OverviewCardSection, SendModal } from '..'
import numberFormatter from '../../utils/numberFormatter'
import Layout from '../layouts/main_layout/index.main_layout'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import ModalLabel from '../layouts/modal_ayout/LabelInput.main_layout'
import { EllipsisSVG, Print, UserProfileSVG, ViewActionSVG } from '../SVGIcons'

const UserDashboard = ({ userStats = [] }) => {
  const { transInfo = [] } = userStats

  const router = useRouter()
  const { userName, phone, email } = router.query

  // useState hook
  const [isSuspendAccoutModalOpened, setIsSuspendAccountModalOpened] =
    React.useState(false)
  const [isSendEmailModalOpend, SetIsSendEmailModalOpend] =
    React.useState(false)
  const [isSendSMSModalOpend, SetIsSendSMSModalOpend] = React.useState(false)
  const [note, setNote] = React.useState('')
  const [reason, setReason] = React.useState('')
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  // ********************************************************************************
  // ****************************   Functions   *************************************

  /* function to open suspen user modal. */
  const handSetIsSuspendModalOpened = () => setIsSuspendAccountModalOpened(true)

  /* function to open send email modal. */
  const handSetIsSendEmailModalOpened = () => SetIsSendEmailModalOpend(true)

  /* function to open send sms modal. */
  const handSetIsSendSMSModalOpened = () => SetIsSendSMSModalOpend(true)

  // Function to set Note to target value
  const handleSetNote = e => {
    setNote(e.target.value)
  }

  const open = Boolean(anchorEl)

  // Button to handle btn menu shown
  const handleBtnMenuShown = event => {
    setAnchorEl(event.currentTarget)
  }

  // Function to handle close modal
  const handleClose = () => {
    setAnchorEl(null)
  }

  // function to suspend user account
  const handleSuspenAccount = () => {
    axios
      .post('/api/users/suspendUser', {
        phone,
        email,
      })
      .then(() => {
        setIsSuspendAccountModalOpened(false)
        toast.success('User account suspended successfully')
      })
      .catch(err => {
        console.log(err)
      })
  }

  // ********************************************************************************
  // ********************************************************************************

  // ********************************************************************************
  // ****************************   Data Arrays   ***********************************

  /* The below code is a JavaScript object that contains the user details. */
  const userDetails = {
    name: userName,
    joined: moment(userStats.createdDate).format('DD MMMM, YYYY'),
    // city: 'Ikeja',
    email: userStats.userEmail,
    // state: 'Lagos',
    phone: userStats.userMobile,
    // country: 'Nigeria',
    walletAddressNumber: userStats.userAccountNumber,
    address1: userStats.address,
    gender: userStats.gender,
    address2: userStats.address2,
    DOB: moment(userStats.dob).format('MMM DD, YYYY'),
  }

  /* The below code is a JavaScript object that contains the user transaction stats. */
  const transactionStats = [
    {
      amount: (
        <CurrencyFormat
          value={transInfo.transactionsSum}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      label: 'Total Transaction',
    },
    {
      amount: numberFormatter(transInfo.transactionsSum),
      label: 'Total Number of Completed Transactions',
    },
    {
      amount: numberFormatter(transInfo.failedCount),
      label: 'Total Number of Failed Transactions',
    },
    {
      amount: numberFormatter(transInfo.pendingCount),
      label: 'Total Number of Pending Transaction',
    },
  ]

  const handleActivate = () => {}

  // dataGrid rows
  let rows

  // check if transInfo.transData is an array
  if (Array.isArray(transInfo.transData)) {
    rows = transInfo.transData.map((item, index) => {
      return {
        id: item.tid,
        col1: index + 1,
        col2: item.initiator,
        col3: item.transType,
        col4: item.contractType,
        col5: item.amount,
        col6: item.fee,
        col7: item.benefBank,
        col8: item.status,
        col9: item.benefNO,
        col10: item.transDate,
        col11: '',
      }
    })
  } else {
    rows = []
  }

  // ********************************************************************************
  // ********************************************************************************

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
              <UserName className="font-bold">{userDetails.name}</UserName>
              <LastSeen>
                Last Active:{' '}
                {moment(userStats.lastLoginDate).format('DD MMM, YYYY')}
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
                <button onClick={handSetIsSendEmailModalOpened}>
                  Send Email
                </button>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <button onClick={handSetIsSendSMSModalOpened}>Send SMS</button>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <button onClick="">Call</button>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {userStats.userStatus?.toLowerCase() === 'active' && (
                  <button onClick={handSetIsSuspendModalOpened}>
                    Suspend Account
                  </button>
                )}

                {userStats.userStatus?.toLowerCase() !== 'active' && (
                  <button onClick={handleActivate}>Activate Account</button>
                )}
              </MenuItem>
            </Menu>
          </div>
        </div>

        {/* Action Buttons */}
        <ButtonWrapper>
          <MUIButton onClick={handSetIsSendEmailModalOpened}>
            Send Email
          </MUIButton>
          <MUIButton onClick={handSetIsSendSMSModalOpened}>Send SMS</MUIButton>
          <MUIButton tw="bg-paysure-success-100 hover:(bg-paysure-success-100 ring-paysure-success-100)">
            Call
          </MUIButton>
          {userStats.userStatus?.toLowerCase() === 'active' && (
            <MUIButton
              loading={isLoading}
              onClick={handSetIsSuspendModalOpened}
              tw="bg-paysure-danger-100 hover:(bg-paysure-danger-100 ring-paysure-danger-100)"
            >
              Suspend Account
            </MUIButton>
          )}

          {/* Button to activate provider */}
          {userStats.userStatus?.toLowerCase() !== 'active' && (
            <MUIButton
              loading={isLoading}
              onClick={handleActivate}
              tw="bg-paysure-success-100 hover:(bg-paysure-success-100 ring-paysure-success-100)"
            >
              Activate Account
            </MUIButton>
          )}
        </ButtonWrapper>

        {/* Send Email modal */}
        <SendModal
          title="Send Email"
          state={isSendEmailModalOpend}
          setState={SetIsSendEmailModalOpend}
        />

        {/* Send SMS modal */}
        <SendModal
          title="Send SMS"
          state={isSendSMSModalOpend}
          setState={SetIsSendSMSModalOpend}
        />

        {/* Suspend account modal */}
        <Modal
          title="Reasons for Suspension"
          state={isSuspendAccoutModalOpened}
          setState={setIsSuspendAccountModalOpened}
          buttonLabel="Confirm"
          onClick={handleSuspenAccount}
        >
          <div>
            <CusLabel>
              Note
              <TextArea
                cols="30"
                rows="6"
                value={note}
                onChange={handleSetNote}
              />
            </CusLabel>
          </div>

          <ModalLabel
            combo
            menuItems={menuItems}
            label="Reason of Suspension"
            value={reason}
            setState={setReason}
          />

          {/* Quick Reasons */}
          <div>
            <CusLabel>Quick Reasons</CusLabel>

            <FormGroup>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label={
                  <CheckLabel>KYC document does not match entries</CheckLabel>
                }
              />

              <FormControlLabel
                control={<Checkbox size="small" />}
                label={<CheckLabel>Your ID is not clear</CheckLabel>}
              />

              <FormControlLabel
                control={<Checkbox size="small" />}
                label={<CheckLabel>Utility bill is not recent</CheckLabel>}
              />
            </FormGroup>
          </div>
        </Modal>
      </Header>

      {/* Wallet balance */}
      <WalletWrapper className="bgSVG">
        <P className="font-500">Total Wallet Balance</P>
        <Amount className="font-500">
          <CurrencyFormat
            value={userStats.userBalance}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          />
        </Amount>
      </WalletWrapper>

      {/* Transactions */}
      <OverviewCardSection
        btnLabel="See all activities"
        link="/users/1/transactionDetails"
        title="Transactions"
        data={transactionStats}
      />

      {/* User information */}
      <UserInfoWrapper>
        <Title className="font-500">User Information</Title>

        {/* User details */}
        <UserGrid>
          <Label>
            Date Joined
            <LabelAns>{userDetails.joined}</LabelAns>
          </Label>

          <Label>
            Email
            <LabelAns>{userDetails.email}</LabelAns>
          </Label>

          <Label>
            Phone
            <LabelAns>{userDetails.phone}</LabelAns>
          </Label>

          <Label>
            Wallet Account Number
            <LabelAns>{userDetails.walletAddressNumber}</LabelAns>
          </Label>

          <Label>
            Gender
            <LabelAns>{userDetails.gender}</LabelAns>
          </Label>

          <Label>
            Date of Birth
            <LabelAns>{userDetails.DOB}</LabelAns>
          </Label>

          {/* <Label>
            City
            <LabelAns>{userDetails.city}</LabelAns>
          </Label> */}

          {/* <Label>
            State
            <LabelAns>{userDetails.state}</LabelAns>
          </Label> */}

          {/* <Label>
            Country
            <LabelAns>{userDetails.country}</LabelAns>
          </Label> */}

          <Label>
            Address 1<LabelAns>{userDetails.address1}</LabelAns>
          </Label>

          <Label>
            Address 2<LabelAns>{userDetails.address2}</LabelAns>
          </Label>
        </UserGrid>
      </UserInfoWrapper>

      {/* DataGrid */}
      <DataGridViewTemp
        limited
        link={`/users/${userName}/transaction_list?email=${email}&phone=${phone}`}
        title={`${userDetails.name}'s Transaction Records`}
        rows={rows}
        columns={columns}
      />
    </Layout>
  )
}

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
    headerName: 'Transaction Type',
    minWidth: 170,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Contract',
    minWidth: 103,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col5',
    headerName: 'Amount',
    minWidth: 130,
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
    headerName: 'Charges',
    minWidth: 100,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <CurrencyFormat
          value={params.row.col6}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      )
    },
  },
  {
    field: 'col7',
    headerName: 'Elec Board',
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
    headerName: 'Meter Number',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col10',
    headerName: 'Date',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col11',
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
          <Tooltip title="View Transaction">
            <button onClick={handleEdit}>
              <ViewActionSVG />
            </button>
          </Tooltip>

          <Tooltip title="Print Transaction">
            <button onClick={handleView}>
              <Print />
            </button>
          </Tooltip>
        </div>
      )
    },
  },
]

const menuItems = ['All', 'Active', 'Inactive']

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
)`normal-case text-white bg-paysure-100 px-3 py-[13px] rounded-lg hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`
const Title = tw.h3`tracking-[-0.02em] text-gray-dark`
const UserInfoWrapper = tw.div`border-border mt-10 p-6 border rounded-lg`
const UserGrid = tw.div`grid mt-5 gap-4 lg:(grid-cols-2 mt-10 gap-8)`
const Label = tw.label`text-light-dark flex items-center tracking-[-0.02em]`
const LabelAns = tw.p`ml-2.5 text-paysure-text-100`
const WalletWrapper = tw.div`mt-10 p-4 space-y-1 rounded-xl lg:(py-10 px-8 space-y-4 rounded-[28px])`
const P = tw.p`leading-[19px] text-sm lg:text-base`
const Amount = tw.h4`text-4xl lg:text-[40px] leading-[48px] tracking-[-0.05em]`
UserGrid
const CusLabel = tw.label`text-[13px] text-[#454D54]`
const TextArea = tw.textarea`text-[13px] border border-[#E3E5E8] text-[#454D54] p-2.5 rounded w-full mt-1.5 focus:(outline-none ring-1 ring-border)`
const CheckLabel = tw.p`text-[13px] leading-[16px]`

export default UserDashboard
