import tw from 'twin.macro'
import React from 'react'
import { Button } from '@mui/material'

import { Add, DeleteDataGridRecord, EditActionSVG } from './SVGIcons'
import { DataGridViewTemp } from '.'
import Modal from './layouts/modal_ayout/index.modal_layout'
import Label from './layouts/modal_ayout/LabelInput.main_layout'

const Plan_Packages = () => {
  // useState hook
  const [isaddModalOpened, setIsAddmodalOpened] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [charge, setChargeType] = React.useState('')
  const [paysureRate, setPaysureRate] = React.useState('')
  const [agentRate, setAgentRate] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [nibbs, setNibbs] = React.useState('')
  const [chargeRate, setChargeRate] = React.useState('')
  const [superAgentRate, setSuperAgentRate] = React.useState('')

  // functions
  const handSetIsAddmodalOpened = React.useCallback(() =>
    setIsAddmodalOpened(true),
  )

  return (
    <>
      <div css={[tw`flex justify-between items-center w-full`]}>
        <div>
          <Ttile className="font-500">Plan Packages</Ttile>
          <TitleSpan>Create and manage plan packages</TitleSpan>
        </div>

        <MUIButton onClick={handSetIsAddmodalOpened} startIcon={<Add />}>
          Add Packages
        </MUIButton>

        {/* Add Packages modal */}
        <Modal
          setState={setIsAddmodalOpened}
          title="Add New Plan"
          state={isaddModalOpened}
          buttonLabel="Save"
        >
          <Label
            label="Title"
            type="text"
            placeholder="Percentage Plan 1"
            value={title}
            setState={setTitle}
          />
          <Label
            combo
            menuItems={menuItems}
            label="Charge Type"
            value={charge}
            setState={setChargeType}
          />
          <Label
            label="Paysure Rate"
            type="text"
            placeholder="50"
            value={paysureRate}
            setState={setPaysureRate}
          />
          <Label
            label="Agent Rate"
            type="text"
            placeholder="0"
            value={agentRate}
            setState={setAgentRate}
          />
          <Label
            value={nibbs}
            label="Nibbs (%)"
            type="text"
            placeholder="0"
            setState={setNibbs}
          />
          <Label
            label="Address"
            type="text"
            placeholder="Address"
            value={address}
            setState={setAddress}
          />
          <Label
            label="Charge Rate (%)"
            type="text"
            placeholder="0"
            value={chargeRate}
            setState={setChargeRate}
          />
          <Label
            label="Super Agent Rate (%)"
            type="text"
            placeholder="0"
            value={superAgentRate}
            setState={setSuperAgentRate}
          />
        </Modal>
      </div>

      <DataGridViewTemp
        rows={rows}
        columns={columns}
        dropdownData={dropdownData}
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
    headerName: 'Name',
    minWidth: 227,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Charge Type',
    minWidth: 236,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Charge Rate',
    minWidth: 103,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col5',
    headerName: 'Super Agent Rate',
    minWidth: 176,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col6',
    headerName: 'Agent Rate',
    minWidth: 150,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col7',
    headerName: 'Action.',
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
            <DeleteDataGridRecord />
          </button>
        </div>
      )
    },
  },
]

const menuItems = ['All', 'Active', 'Inactive']

const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:(text-[20px])`
const TitleSpan = tw.span`block text-light-dark text-sm font-normal mt-1.5 tracking-normal lg:(mt-3 text-base)`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 pl-3.5 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`
const FlexBox = tw.div`flex items-center justify-between space-x-4`

export default Plan_Packages
