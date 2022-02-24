import React from 'react'
import tw from 'twin.macro'
import Router from 'next/router'
import { Button } from '@mui/material'

import { DataGridViewTemp, HomeDisplayCard } from '.'
import Modal from './layouts/modal_ayout/index.modal_layout'
import Label from './layouts/modal_ayout/LabelInput.main_layout'
import {
  Add,
  EditActionSVG,
  ViewActionSVG,
} from './SVGIcons'
import CurrencyFormat from 'react-currency-format'

const AgentsSubDashboard = () => {
  // useState hook
  const [isaddModalOpened, setIsAddmodalOpened] = React.useState(false)
  const [firstName, setFirstName] = React.useState('')
  const [LastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [BVN, setBVN] = React.useState('')
  const [plan, setPlan] = React.useState('')
  const [bussinessAddress, setBussinessAddress] = React.useState('')
  const [bussinessName, setBussinessName] = React.useState('')
  const [settlementPlan, setSettlementPlan] = React.useState('')

  // functions
  const handSetIsAddmodalOpened = React.useCallback(() =>
    setIsAddmodalOpened(true),
  )

  return (
    <>
      <div css={[tw`flex justify-between items-center`]}>
        <Ttile className="font-bold">Agents</Ttile>

        <MUIButton onClick={handSetIsAddmodalOpened} startIcon={<Add />}>
          Add agents
        </MUIButton>

        {/* Add Users modal */}
        <Modal
          setState={setIsAddmodalOpened}
          title="Add Agent"
          state={isaddModalOpened}
          buttonLabel="Next"
        >
          <FlexBox>
            <Label
              label="First Name"
              type="text"
              placeholder="John"
              value={firstName}
              setState={setFirstName}
            />
            <Label
              label="Last Name"
              type="text"
              placeholder="Smith"
              value={LastName}
              setState={setLastName}
            />
          </FlexBox>
          <Label
            label="Email"
            type="email"
            placeholder="yourname@example.com"
            value={email}
            setState={setEmail}
          />
          <FlexBox>
            <Label
              label="Phone Number"
              type="tel"
              placeholder="08012345678"
              value={phone}
              setState={setPhone}
            />
            <Label
              value={BVN}
              label="BVN"
              type="text"
              placeholder="12345678911"
              setState={setBVN}
            />
          </FlexBox>
          <Label
            label="Business Name"
            type="text"
            placeholder="Business Name"
            value={bussinessName}
            setState={setBussinessName}
          />
          <Label
            label="Business Address"
            type="text"
            placeholder="Business Address"
            value={bussinessAddress}
            setState={setBussinessAddress}
          />
          <Label
            combo
            menuItems={menuItems}
            label="Plan Type"
            value={plan}
            setState={setPlan}
          />
          <Label
            combo
            menuItems={menuItems}
            label="Settlement Type"
            value={settlementPlan}
            setState={setSettlementPlan}
          />
        </Modal>
      </div>

      <HomeDisplayCard data={agentStats} />

      <DataGridViewTemp
        limited
        link="/agents/agents_list"
        title="Agents list"
        rows={agents}
        columns={columns}
        dropdownData={dropdownData}
        hasSearch
        hasFilter
        hasExportBtn
        // TODO: This has an additional sorting option
      />
    </>
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

const agents = [
  {
    id: 1,
    tid: 1,
    fullName: 'Suresh Kumar',
    firstName: 'boxi',
    lastName: 'soxi',
    middleName: 'NA',
    status: 1,
    statusStr: 'IN-ACTIVE',
    emailAddress: 'box@gmail.com',
    phonePri: '+2348032110024',
    terminals: ['TD1213', 'TD90232', 'TD3232'],
    phoneSec: '+2348032110025',
    address1: 'NA',
    address2: '01234567',
    partnerCode: 'NA',
    userRole: 11,
    userRoleStr: 'SUPER ADMINISTRATOR',
    code: 'S0000000001',
    userName: '+2348032119024',
    stateStr: 'NA',
  },
]

// FIXME: Temp data (should be replaced with real data)
const rows = [
  {
    id: 1,
    col1: 1,
    col2: 'ETRANSACT',
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
    col2: 'KUDA',
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
    field: 'tid',
    headerName: 'S/N',
    minWidth: 71,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'fullName',
    headerName: 'Agent Name',
    minWidth: 227,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Parent',
    minWidth: 236,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'terminals',
    headerName: 'Terminals',
    minWidth: 203,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <div tw="space-x-1">
          {params.row.terminals.slice(0, 2).map((item, index) => {
            return (
              <span
                key={index}
                css={[
                  tw`bg-paysure-10 text-paysure-100 text-[10px] uppercase p-1 rounded`,
                ]}
              >
                {item}
              </span>
            )
          })}
          {params.row.terminals.length > 2 && (
            <span tw="ml-4">+{params.row.terminals.length - 2}</span>
          )}
        </div>
      )
    },
  },
  {
    field: 'col5',
    headerName: 'No. of Transactions',
    minWidth: 166,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col6',
    headerName: 'Transactions{N}',
    minWidth: 150,
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
    headerName: 'Wallet Balance',
    minWidth: 144,
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
    field: 'col8',
    headerName: 'Current Plan',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
    disableClickEventBubbling: true,
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
    headerName: 'Status',
    minWidth: 100,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <span
          css={[
            tw`bg-[#E9FBF9] text-paysure-success-100 text-[10px] uppercase p-1 rounded`,
          ]}
        >
          {params.row.col8}
        </span>
      )
    },
  },
  {
    field: 'col11',
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

        Router.push(`/agents/agent/${thisRow.col1}`)
      }

      return (
        <div tw="space-x-1">
          <button onClick={handleEdit}>
            <EditActionSVG />
          </button>

          {/* <button onClick={handleView}>
            <UserWithPositive />
          </button> */}

          <button onClick={handleView}>
            <ViewActionSVG />
          </button>
        </div>
      )
    },
  },
]
// FIXME: Temp data (should be replaced with real data)
const agentStats = [
  {
    amount: '92,000',
    title: 'Total number of transactions',
  },
  {
    amount: agents.length,
    title: 'Total number of agents',
    link: '/agents/agents_list',
  },
  {
    amount: agents.filter(d => d.status === 1).length,
    title: 'Total number of active Agents',
  },
  {
    amount: agents.filter(d => d.status === 2).length,
    title: 'Total number of inactive agents',
  },
]

const menuItems = ['All', 'Active', 'Inactive']

// Tailwind Styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 pl-3.5 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`
const FlexBox = tw.div`flex items-center justify-between space-x-4`

export default AgentsSubDashboard
