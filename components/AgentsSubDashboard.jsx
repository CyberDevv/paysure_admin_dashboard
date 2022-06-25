import React from 'react'
import moment from 'moment'
import tw from 'twin.macro'
import Router from 'next/router'
import { Button, Tooltip } from '@mui/material'
import CurrencyFormat from 'react-currency-format'

import { DataGridViewTemp, HomeDisplayCard } from '.'
import numberFormatter from '../utils/numberFormatter'
import Modal from './layouts/modal_ayout/index.modal_layout'
import { Add, EditActionSVG, ViewActionSVG } from './SVGIcons'
import Label from './layouts/modal_ayout/LabelInput.main_layout'

const AgentsSubDashboard = ({ agentData = [] }) => {
  const { transStats = [], trxInfo = [] } = agentData
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
  const handSetIsAddmodalOpened = () => setIsAddmodalOpened(true)

  const agentStats = [
    {
      amount: numberFormatter(transStats.totalTransactiionsCount),
      title: 'Total number of transactions',
    },
    {
      amount: numberFormatter(transStats.allAgentsCount),
      title: 'Total number of agents',
      link: '/agents/agents_list',
    },
    {
      amount: numberFormatter(transStats.allActiveCount),
      title: 'Total number of active Agents',
    },
    {
      amount: numberFormatter(transStats.allInactiveCount),
      title: 'Total number of inactive agents',
    },
  ]

  // DataGrid rows
  let rows
  // check if trxInfo is an array
  if (Array.isArray(trxInfo)) {
    rows = trxInfo.map((item, index) => {
      return {
        id: item.tid,
        col1: index + 1,
        col2: item.fullName,
        col3: item.none,
        col4: item.AgentsTerminal,
        col5: item.none,
        col6: item.none,
        col7: item.walletBalance,
        col8: item.none,
        col9: item.dateAdded,
        col10: item.statusStr,
        col11: '',
        email: item.emailAddress,
        phone: item.phonePri,
      }
    })
  } else {
    rows = []
  }

  // dataGrid column
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
      field: 'col4',
      headerName: 'Terminals',
      minWidth: 203,
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
      renderCell: params => {
        return (
          <span>{moment(params.row.col9).format('MMM DD, YYYY HH:mm')}</span>
        )
      },
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
              tw`uppercase text-[10px] p-1 rounded`,
              params.row.col10.toLowerCase() === 'active'
                ? tw`bg-[#E9FBF9] text-paysure-success-100 `
                : tw`bg-[#FDF6EF] text-[#EDA95A] `,
            ]}
          >
            {params.row.col10}
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

          Router.push({
            pathname: `/agents/agent/${thisRow.col2}`,
            query: { email: thisRow.email, phone: thisRow.phone },
          })
        }

        return (
          <div tw="space-x-1">
            <Tooltip title="Edit Agent">
              <button onClick={handleEdit}>
                <EditActionSVG />
              </button>
            </Tooltip>

            {/* <button onClick={handleView}>
            <UserWithPositive />
          </button> */}

            <Tooltip title="View Agent">
              <button onClick={handleView}>
                <ViewActionSVG />
              </button>
            </Tooltip>
          </div>
        )
      },
    },
    {
      field: 'email',
      minWidth: 123,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'phone',
      minWidth: 123,
      flex: 1,
      headerClassName: 'grid-header',
    },
  ]

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
        rows={rows}
        columns={columns}
        columnVisibilityModel={{ email: false, phone: false }}
      />
    </>
  )
}

const menuItems = ['All', 'Active', 'Inactive']

// Tailwind Styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 pl-3.5 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`
const FlexBox = tw.div`flex items-center justify-between space-x-4`

export default AgentsSubDashboard
