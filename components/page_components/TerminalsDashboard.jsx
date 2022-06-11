import React from 'react'
import axios from 'axios'
import moment from 'moment'
import tw from 'twin.macro'
import Router from 'next/router'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'

import { DataGridViewTemp, HomeDisplayCard } from '..'
import numberFormatter from '../../utils/numberFormatter'
import Layout from '../layouts/main_layout/index.main_layout'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'
import { Add, EditActionSVG, UserWithNegative, Wallet } from '../SVGIcons'

const TerminalsDashboard = ({ terminalStats = [] }) => {
  const { TerminalData = [] } = terminalStats

  // UseState hook
  const [isaddModalOpened, setIsAddmodalOpened] = React.useState(false)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [logoURL, setLogoURL] = React.useState('')
  const [bankId, setBankId] = React.useState('')
  const [terminalBrand, setTerminalBrand] = React.useState('')
  const [terminalSerialNo, setTerminalSerialNo] = React.useState('')

  // functions
  const handSetIsAddmodalOpened = () => setIsAddmodalOpened(true)

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

  // rows
  let rows
  // check if TerminalData is an array
  if (Array.isArray(TerminalData)) {
    rows = TerminalData.map((item, index) => {
      return {
        id: item.tid,
        col1: index + 1,
        col2: item.terminalId,
        col3: item.terminalSerialNo,
        col4: item.none,
        col5: item.transCount,
        col6: item.nibssRate,
        col7: item.none,
        col8: item.merchantName,
        col9: item.statusStr,
        col10: item.lastTransactionDate,
        col11: '',
      }
    })
  } else {
    rows = []
  }

  // dataGrid columns
  const columns = [
    {
      field: 'col1',
      headerName: 'S/N',
      minWidth: 71,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return <span>{params.row.col1}.</span>
      },
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
              params.row.col9.toLowerCase() === 'active'
                ? tw`bg-[#E9FBF9] text-paysure-success-100 text-[10px] uppercase p-1 rounded`
                : tw`text-[#EDA95A] bg-[#FDF6EF] text-[10px] uppercase p-1 rounded`
            }
          >
            {params.row.col9}
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
      renderCell: params => {
        return (
          <span>
            {params.row.col10
              ? moment(params.row.col10).format('MMM DD, YYYY HH:mm')
              : '-'}
          </span>
        )
      },
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

          Router.push(`/terminals/${thisRow.col2}`)
        }

        return (
          <div tw="space-x-1">
            <button onClick={handleEdit}>
              <EditActionSVG />
            </button>

            <button onClick={handleEdit}>
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

  /* An array of objects that is passed to the HomeDisplayCard component as a prop. */
  const overviewDataArray = [
    {
      amount: numberFormatter(terminalStats.terminalsCount),
      title: 'Total Number of Terminals',
      link: '/terminals/terminals_list',
    },
    {
      amount: numberFormatter(terminalStats.activeTerminals),
      title: 'Total Number of Active Terminals',
    },
    {
      amount: numberFormatter(terminalStats.inActiveTerminals),
      title: 'Total Number of Inactive Terminals',
    },
  ]

  return (
    <Layout title="Terminals">
      <div>
        <div css={[tw`flex justify-between items-center`]}>
          <Ttile className="font-bold">Terminals</Ttile>

          <MUIButton onClick={handSetIsAddmodalOpened} startIcon={<Add />}>
            Add Terminal
          </MUIButton>

          {/* Add terminal modal */}
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

      <HomeDisplayCard data={overviewDataArray} />

      <DataGridViewTemp
        limited
        link="/terminals/terminals_list"
        title="Terminals"
        rows={rows}
        columns={columns}
      />
    </Layout>
  )
}

const menuItems = ['All', 'Active', 'Inactive']

// Tailwind styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 pl-3.5 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`
const Span = tw.span`text-[13px] text-[#10101266]`

export default TerminalsDashboard
