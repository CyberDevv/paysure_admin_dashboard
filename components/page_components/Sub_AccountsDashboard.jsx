import tw from 'twin.macro'
import React, { useState } from 'react'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'
import { Button, InputAdornment, MenuItem, TextField, Tooltip } from '@mui/material'

import { Add, EditActionSVG, UserWithPositive, Wallet } from '../SVGIcons'
import { DataGridViewTemp } from '..'
import Layout from '../layouts/main_layout/index.main_layout'
import { SubAdminsColumn } from '../Columns'

const Sub_AccountsDashboard = ({ subAdminsData }) => {
  // UseState hook
  const [selectedDrop, setSelectedDrop] = useState(dropdownData[0].value)
  const [isaddModalOpened, setIsAddmodalOpened] = React.useState(false)
  const [providerName, setProviderName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [role, setRole] = React.useState('')

  // DataGrid rows
  let rows =
    subAdminsData.length > 0
      ? subAdminsData.map((item, index) => {
          return {
            id: index,
            col1: index + 1,
            fullNameOfAdmin: item.fullNameOfAdmin,
            role: item.role,
            email: item.email,
            dateCreated: item.dateCreated,
            actions: '',
          }
        })
      : []

  // functions
  const handleDropdownSelected = event => {
    setSelectedDrop(event.target.value)
  }

  const handSetIsAddmodalOpened = () => setIsAddmodalOpened(true)

  return (
    <Layout title="Sub Admins">
      <div css={[tw`flex items-center justify-between`]}>
        <Ttile className="font-bold">Sub-admins</Ttile>

        <MUIButton onClick={handSetIsAddmodalOpened} startIcon={<Add />}>
          Add sub-admin
        </MUIButton>

        {/* Add sub-admin modal */}
        <Modal
          title="Add admin user"
          state={isaddModalOpened}
          setState={setIsAddmodalOpened}
          buttonLabel="Next"
        >
          <Label
            label="Name of Provider"
            type="text"
            placeholder="Provider"
            value={providerName}
            setState={setProviderName}
          />

          <Label
            label="Email"
            type="email"
            placeholder="yourname@example.com"
            value={email}
            setState={setEmail}
          />

          <Label
            label="Phone"
            type="text"
            placeholder="08012345678"
            value={phone}
            setState={setPhone}
          />
          <Label
            combo
            menuItems={menuItems}
            label="Role"
            value={role}
            setState={setRole}
          />
        </Modal>
      </div>

      {/* Overview */}
      <OverviewWrapper>
        <OverviewTitle className="font-500">Overview</OverviewTitle>

        <div css={[tw`grid grid-cols-2 gap-8 lg:(flex justify-between) `]}>
          {temporalData.map(({ amount, category }, index) => (
            <div key={index}>
              <OverviewAmount className="font-500">{amount}</OverviewAmount>
              <OverviewCategory>{category}</OverviewCategory>
            </div>
          ))}
        </div>
      </OverviewWrapper>

      <DataGridViewTemp rows={rows} columns={SubAdminsColumn} hasExportBtn hasMT />
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
const temporalData = [
  {
    amount: 15,
    category: 'Sub-admins',
  },
  {
    amount: 4,
    category: 'Adminstrators',
  },
  {
    amount: 3,
    category: 'Account Admins',
  },
  {
    amount: 3,
    category: 'Account Users',
  },
]

const menuItems = ['All', 'Active', 'Inactive']

// Tailwind css
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:(text-[32px])`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 pl-3.5 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`
const Span = tw.span`text-[13px] text-[#10101266]`
const MUIButton2 = tw(
  Button,
)`normal-case text-paysure-100 bg-paysure-10 px-5 py-3 text-sm tracking-[-0.025em]`
const OverviewWrapper = tw.div`border border-border rounded-[20px] p-6 mt-[27px] space-y-4 lg:(p-8 mt-[37px] space-y-8)`
const OverviewTitle = tw.h4`text-light-dark`
const OverviewAmount = tw.h5`text-[28px] lg:(text-[32px])`
const OverviewCategory = tw.p`text-[#8F99A3] text-sm`

export default Sub_AccountsDashboard
