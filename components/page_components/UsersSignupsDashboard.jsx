import React from 'react'
import tw from 'twin.macro'
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'

import { UserProfileSVG, EllipsisSVG } from '../SVGIcons'
import Layout from '../layouts/main_layout/index.main_layout'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import ModalLabel from '../layouts/modal_ayout/LabelInput.main_layout'
import CurrencyFormat from 'react-currency-format'

const UsersSignupsDashboard = () => {
  // useState hook
  const [isSuspendAccoutModalOpened, setIsSuspendAccountModalOpened] =
    React.useState(false)
  const [note, setNote] = React.useState('')
  const [reason, setReason] = React.useState('')
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
              <LastSeen>User</LastSeen>
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
                  Suspend Account
                </button>
              </MenuItem>
            </Menu>
          </div>
        </div>

        {/* Action Buttons */}
        <ButtonWrapper>
          <MUIButton
            onClick={handSetIsSuspendModalOpened}
            tw="bg-paysure-danger-100 hover:(bg-paysure-danger-100 ring-paysure-danger-100)"
          >
            Suspend Account
          </MUIButton>
        </ButtonWrapper>

        {/* suspend accout modal */}
        <Modal
          title="Reasons for Suspension"
          state={isSuspendAccoutModalOpened}
          setState={setIsSuspendAccountModalOpened}
          buttonLabel="Confirm"
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
            value={350034}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          />
        </Amount>
      </WalletWrapper>

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
            Gender
            <LabelAns>{userDetails.gender}</LabelAns>
          </Label>

          <Label>
            Date of Birth
            <LabelAns>{userDetails.DOB}</LabelAns>
          </Label>

          <Label>
            City
            <LabelAns>{userDetails.city}</LabelAns>
          </Label>

          <Label>
            State
            <LabelAns>{userDetails.state}</LabelAns>
          </Label>

          <Label>
            Country
            <LabelAns>{userDetails.country}</LabelAns>
          </Label>

          <Label>
            Address 1<LabelAns>{userDetails.address1}</LabelAns>
          </Label>

          <Label>
            Address 2<LabelAns>{userDetails.address2}</LabelAns>
          </Label>
        </UserGrid>
      </UserInfoWrapper>
    </Layout>
  )
}

// FIXME: Temp data (should be replaced with real data)
const userDetails = {
  name: 'Bolarinwa Bimbola',
  joined: '10 October, 2021',
  city: 'Ikeja',
  email: 'ozenua@gmail.com',
  state: 'Lagos',
  Phone: '08012345678',
  country: 'Nigeria',
  walletAddressNumber: 32343344,
  address1: '3517 W. Gray St. Utica, Pennsylvania 57867',
  gender: 'Male',
  address2: '3517 W. Gray St. Utica, Pennsylvania 57867',
  DOB: 'May 5, 1983',
}

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
const WalletWrapper = tw.div`mt-10 py-5 px-4 space-y-2 rounded-xl lg:(py-10 px-8 space-y-4 rounded-[28px])`
const P = tw.p`leading-[19px] text-sm lg:text-base`
const Amount = tw.h4`text-4xl lg:text-[40px] leading-[48px] tracking-[-0.05em]`
const CusLabel = tw.label`text-[13px] text-[#454D54]`
const TextArea = tw.textarea`text-[13px] border border-[#E3E5E8] text-[#454D54] p-2.5 rounded w-full mt-1.5 focus:(outline-none ring-1 ring-border)`
const CheckLabel = tw.p`text-[13px] leading-[16px]`

export default UsersSignupsDashboard
