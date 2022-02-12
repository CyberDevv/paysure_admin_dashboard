import tw from 'twin.macro'
import React, { useState } from 'react'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'
import { Button, InputAdornment, MenuItem, TextField } from '@mui/material'

import { Add, EditActionSVG, UserWithPositive, Wallet } from '../SVGIcons'
import { DataGridViewTemp } from '..'
import Layout from '../layouts/main_layout/index.main_layout'

const Sub_AccountsDashboard = () => {
  // UseState hook
  const [selectedDrop, setSelectedDrop] = useState(dropdownData[0].value)
  const [isaddModalOpened, setIsAddmodalOpened] = React.useState(false)
  const [providerName, setProviderName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [role, setRole] = React.useState('')

  // functions
  const handleDropdownSelected = React.useCallback(event => {
    setSelectedDrop(event.target.value)
  })

  const handSetIsAddmodalOpened = React.useCallback(() =>
    setIsAddmodalOpened(true),
  )

  return (
    <Layout title="Sub Admins">
      <div css={[tw`flex justify-between items-center`]}>
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

      <DataGridViewTemp
        rows={rows}
        columns={columns}
        dropdownData={dropdownData}
        hasSearch
        hasFilter
        hasExportBtn
        hasSort
        hasMT
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
    col5: 'Dec 30, 2018 05:12',
    col6: '',
  },
  {
    id: 2,
    col1: 2,
    col2: 'Master Card',
    col3: 'POS',
    col4: 1,
    col5: 'Dec 30, 2018 05:12',
    col6: '',
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
    headerName: 'Name',
    minWidth: 227,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Roles',
    minWidth: 236,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Email',
    minWidth: 103,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col5',
    headerName: 'Date Joined',
    minWidth: 100,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col6',
    headerName: 'Actions',
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

        // Router.push(`/agents/super_agent/${thisRow.col1}`)
      }

      return (
        <div tw="space-x-1">
          <button onClick={handleView}>
            <EditActionSVG />
          </button>

          <button onClick={handleEdit}>
            <UserWithPositive />
          </button>

          <button onClick={handleEdit}>
            <Wallet />
          </button>
        </div>
      )
    },
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
