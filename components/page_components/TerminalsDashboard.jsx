import tw from 'twin.macro'
import React, { useState } from 'react'
import { Button, InputAdornment, MenuItem, TextField } from '@mui/material'

import { Add } from '../SVGIcons'
import Layout from '../layouts/main_layout/index.main_layout'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'
import { DataGridViewTemp, HomeDisplayCard, OverviewCardSection } from '..'

const OrganizationsDashboard = () => {
  // UseState hook
  const [selectedDrop, setSelectedDrop] = useState(dropdownData[0].value)
  const [isaddModalOpened, setIsAddmodalOpened] = React.useState(false)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [logoURL, setLogoURL] = React.useState('')
  const [plan, setPlan] = React.useState('')
  const [settlementPlan, setSettlementPlan] = React.useState('')
  const [abbreviation, setAbbreviation] = React.useState('')

  // functions
  const handleDropdownSelected = event => {
    setSelectedDrop(event.target.value)
  }
  return (
    <Layout title="Terminals">
      <div>
        <div css={[tw`flex justify-between items-center`]}>
          <Ttile className="font-bold">Terminals</Ttile>

          <MUIButton
            onClick={() => setIsAddmodalOpened(true)}
            startIcon={<Add />}
          >
            Add Terminal
          </MUIButton>

          {/* Add organization modal */}
          <Modal
            setState={setIsAddmodalOpened}
            title="Add Terminal"
            state={isaddModalOpened}
            buttonLabel="Create terminal"
          >
            <Label
              label="Terminal ID"
              type="text"
              placeholder="Terminal ID"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Label
              label="Serial No."
              type="text"
              placeholder="Serial No."
              value={abbreviation}
              onChange={e => setAbbreviation(e.target.value)}
            />
            <Label
              label="Transaction Limit"
              type="text"
              placeholder="Transaction Limit"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Label
              combo={true}
              menuItems={menuItems}
              label="Bank"
              value={plan}
              setState={setPlan}
            />
            <Label
              combo={true}
              menuItems={menuItems}
              label="Terminal Type"
              value={settlementPlan}
              setState={setSettlementPlan}
            />
            <Label
              label="Nibbs Rate"
              type="text"
              placeholder="Nibbs Rate"
              value={logoURL}
              onChange={e => setLogoURL(e.target.value)}
            />
          </Modal>
        </div>
      </div>

      <HomeDisplayCard data={temporalData} />

      <DataGridViewTemp
        limited={true}
        link="/terminals/terminals_list"
        title="Terminals"
        rows={rows}
        columns={columns}
        dropdownData={dropdownData}
      >
        <div css={[tw`flex items-center justify-between w-full`]}>
          {/* Checkbox */}
          <TextField
            select
            value={selectedDrop}
            onChange={handleDropdownSelected}
            size="small"
            sx={{
              fontSize: '13px',
              minWidth: '157px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#EBF2FA',
                },
                '&:hover fieldset': {
                  borderColor: '#c6c7c9',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Span>Filter by:</Span>
                </InputAdornment>
              ),
            }}
          >
            {dropdownData.map(option => (
              <MenuItem
                sx={{ fontSize: '13px' }}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <MUIButton2>Export data</MUIButton2>
        </div>
      </DataGridViewTemp>
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
    headerName: 'Terminal ID',
    minWidth: 227,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Serial No.',
    minWidth: 236,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Bank',
    minWidth: 103,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col5',
    headerName: 'Transactions',
    minWidth: 176,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col6',
    headerName: 'Nibble Rate (%)',
    minWidth: 150,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col7',
    headerName: 'Super Agent',
    minWidth: 144,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col8',
    headerName: 'Merchant',
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
    headerName: 'Status',
    minWidth: 123,
    flex: 1,
    headerClassName: 'grid-header',
  },

  {
    field: 'col10',
    headerName: 'Last Transaction',
    minWidth: 123,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col11',
    headerName: 'Action',
    minWidth: 100,
    flex: 1,
    headerClassName: 'grid-header',
  },
]

// FIXME: Temp data (should be replaced with real data)
const temporalData = [
  {
    amount: '14',
    title: 'Total Terminals',
    link: '/terminals/terminals_list',
  },
  {
    amount: '24',
    title: 'Total Active Terminals',
  },
  {
    amount: '3',
    title: 'Total Inactive Terminals',
  },
]

const menuItems = ['All', 'Active', 'Inactive']

const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:(text-[32px])`
const TitleSpan = tw.span`block text-light-dark text-sm font-normal mt-1.5 tracking-normal lg:(mt-3 text-base)`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 pl-3.5 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`
const Span = tw.span`text-[13px] text-[#10101266]`
const MUIButton2 = tw(
  Button,
)`normal-case text-paysure-100 bg-paysure-10 px-5 py-3 text-sm tracking-[-0.025em]`

export default OrganizationsDashboard
