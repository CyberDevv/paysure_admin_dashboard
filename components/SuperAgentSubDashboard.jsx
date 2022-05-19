import React from 'react'
import tw from 'twin.macro'
import Router from 'next/router'
import { Button } from '@mui/material'

import { Add, EditActionSVG, ViewActionSVG } from './SVGIcons'
import { DataGridViewTemp, HomeDisplayCard } from '.'
import Modal from './layouts/modal_ayout/index.modal_layout'
import Label from './layouts/modal_ayout/LabelInput.main_layout'
import CurrencyFormat from 'react-currency-format'

const SuperAgentsSubDashboard = ({ superAgentData = [] }) => {
  const { transStats = [], trxInfo = [] } = superAgentData

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
  const handSetIsAddmodalOpened = () =>
    setIsAddmodalOpened(true)

  // Data array of super agents stats
  const superAgentStats = [
    {
      amount: transStats.totalSuperAgentsCount,
      title: 'Total number of super agents',
      link: '/agents/super_agents_list',
    },
    {
      amount: transStats.activeSuperAgentsCount,
      title: 'Total number of active agents',
    },
    {
      amount: transStats.inActiveSuperAgentsCount,
      title: 'Total number of inactive agents',
    },
  ]

  // DataGrid rows
  let rows
  // check if trxInfo is an array
  if (Array.isArray(trxInfo)) {
    rows = trxInfo.map((superAgent, index) => {
      return {
        id: superAgent.tid,
        col1: index + 1,
        col2: superAgent.fullName,
        col3: superAgent.none,
        col4: superAgent.none,
        col5: superAgent.none,
        col6: superAgent.none,
        col7: superAgent.none,
        col8: superAgent.none,
        col9: superAgent.statusStr,
        col10: '',
      }
    })
  } else {
    rows = []
  }

  return (
    <>
      <div css={[tw`flex justify-between items-center`]}>
        <Ttile className="font-bold">Super Agents</Ttile>
        <MUIButton onClick={handSetIsAddmodalOpened} startIcon={<Add />}>
          Add super agents
        </MUIButton>

        {/* Add Users modal */}
        <Modal
          setState={setIsAddmodalOpened}
          title="Add Super Agent"
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

      <HomeDisplayCard data={superAgentStats} />

      <DataGridViewTemp
        limited
        link="/agents/super_agents_list"
        title="Super Agents list"
        rows={rows}
        columns={columns}
        // hasExportBtn
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
    headerName: 'Super Agent Name',
    minWidth: 227,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'No. of Agents',
    minWidth: 236,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Terminals',
    minWidth: 193,
    flex: 1,
    headerClassName: 'grid-header',
    // renderCell: params => {
    //   return (
    //     <div tw="space-x-1">
    //       {params.row.col4.slice(0, 2).map((item, index) => {
    //         return (
    //           <span
    //             key={index}
    //             css={[
    //               tw`bg-paysure-10 text-paysure-100 text-[10px] uppercase p-1 rounded`,
    //             ]}
    //           >
    //             {item}
    //           </span>
    //         )
    //       })}
    //       {params.row.col4.length > 2 && (
    //         <span tw="ml-4">+{params.row.col4.length - 2}</span>
    //       )}
    //     </div>
    //   )
    // },
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
          value={params.row.col7}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      )
    },
  },
  {
    field: 'col8',
    headerName: 'Date Added',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col9',
    headerName: 'Status',
    minWidth: 140,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <span
          css={
            params.row.col9.toLowerCase() !== 'active'
              ? tw`bg-[#FDF6EF] text-paysure-danger-100 text-[10px] uppercase p-1 rounded`
              : tw`bg-[#E9FBF9] text-paysure-success-100 text-[10px] uppercase p-1 rounded`
          }
        >
          {params.row.col9}
        </span>
      )
    },
  },
  {
    field: 'col10',
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
          <button onClick={handleEdit}>
            <EditActionSVG />
          </button>

          <button onClick={handleView}>
            <ViewActionSVG />
          </button>
        </div>
      )
    },
  },
]

const menuItems = ['All', 'Active', 'Inactive']

// Tailwind Styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 pl-3.5 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`
const FlexBox = tw.div`flex items-center justify-between space-x-4`

export default SuperAgentsSubDashboard
