import axios from 'axios'
import tw from 'twin.macro'
import Router from 'next/router'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import { Button, InputAdornment, MenuItem, TextField } from '@mui/material'

import { Add, EditActionSVG, UserWithNegative, Wallet } from '../SVGIcons'
import { DataGridViewTemp, HomeDisplayCard } from '..'
import Layout from '../layouts/main_layout/index.main_layout'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'

const TerminalsDashboard = () => {
  // UseState hook
  const [selectedDrop, setSelectedDrop] = useState(dropdownData[0].value)
  const [isaddModalOpened, setIsAddmodalOpened] = React.useState(false)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [logoURL, setLogoURL] = React.useState('')
  const [bankId, setBankId] = React.useState('')
  const [terminalBrand, setTerminalBrand] = React.useState('')
  const [terminalSerialNo, setTerminalSerialNo] = React.useState('')

  // functions
  const handleDropdownSelected = event => {
    setSelectedDrop(event.target.value)
  }

  const handSetIsAddmodalOpened = () =>
    setIsAddmodalOpened(true)

  // creates termial
  const handleCreateTerminal = () => {
    axios
      .post('/api/terminals/addTerminal', {
        terminalId: 124,
        terminalBrand,
        terminalSerialNo,
        bankId,
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
        toast.error(err.response.data.data)
      })
  }

  return (
    <Layout title="Terminals">
      <div>
        <div css={[tw`flex justify-between items-center`]}>
          <Ttile className="font-bold">Terminals</Ttile>

          <MUIButton onClick={handSetIsAddmodalOpened} startIcon={<Add />}>
            Add Terminal
          </MUIButton>

          {/* Add organization modal */}
          <Modal
            onClick={handleCreateTerminal}
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
              setState={setName}
            />
            <Label
              label="Serial No."
              type="text"
              placeholder="Serial No."
              value={terminalSerialNo}
              setState={setTerminalSerialNo}
            />
            <Label
              label="Transaction Limit"
              type="text"
              placeholder="Transaction Limit"
              value={email}
              setState={setEmail}
            />
            <Label
              combo
              menuItems={menuItems}
              label="Bank"
              value={bankId}
              setState={setBankId}
            />
            <Label
              combo
              menuItems={menuItems}
              label="Terminal Type"
              value={terminalBrand}
              setState={setTerminalBrand}
            />
            <Label
              label="Nibbs Rate"
              type="text"
              placeholder="Nibbs Rate"
              value={logoURL}
              setState={setLogoURL}
            />
          </Modal>
        </div>
      </div>

      <HomeDisplayCard data={temporalData} />

      <DataGridViewTemp
        limited
        link="/terminals/terminals_list"
        title="Terminals"
        rows={rows}
        columns={columns}
        dropdownData={dropdownData}
        hasFilter
        hasSearch
        hasExportBtn
        // TODO: has additional filter
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
    minWidth: 157,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Serial No.',
    minWidth: 156,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Bank',
    minWidth: 193,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col5',
    headerName: 'Transactions',
    minWidth: 156,
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
    minWidth: 194,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col8',
    headerName: 'Merchant',
    minWidth: 180,
    flex: 1,
    headerClassName: 'grid-header',
    disableClickEventBubbling: true,
  },
  {
    field: 'col9',
    headerName: 'Status',
    minWidth: 123,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <span
          css={
            params.row.col8.toLowerCase() === 'active'
              ? tw`bg-[#E9FBF9] text-paysure-success-100 text-[10px] uppercase p-1 rounded`
              : tw`text-[#EDA95A] bg-[#FDF6EF] text-[10px] uppercase p-1 rounded`
          }
        >
          {params.row.col8}
        </span>
      )
    },
  },

  {
    field: 'col10',
    headerName: 'Last Transaction',
    minWidth: 193,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col11',
    headerName: 'Action',
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

        Router.push(`/terminals/${thisRow.col1}`)
      }

      return (
        <div tw="space-x-1">
          <button onClick={handleEdit}>
            <EditActionSVG />
          </button>

          <button onClick={handleView}>
            <UserWithNegative />
          </button>

          <button onClick={handleView}>
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
    amount: '14',
    title: 'Total Number of Terminals',
    link: '/terminals/terminals_list',
  },
  {
    amount: '24',
    title: 'Total Number of Active Terminals',
  },
  {
    amount: '3',
    title: 'Total Number of Inactive Terminals',
  },
]

const menuItems = ['All', 'Active', 'Inactive']

// Tailwind styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 pl-3.5 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`
const Span = tw.span`text-[13px] text-[#10101266]`
const MUIButton2 = tw(
  Button,
)`normal-case text-paysure-100 bg-paysure-10 px-5 py-3 text-sm tracking-[-0.025em]`

export default TerminalsDashboard
