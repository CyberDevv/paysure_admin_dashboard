import { LoadingButton } from '@mui/lab'
import { Button, Tooltip } from '@mui/material'
import axios from 'axios'
import Router from 'next/router'
import React from 'react'
import { toast } from 'react-toastify'
import { useSWRConfig } from 'swr'
import tw from 'twin.macro'

import { DataGridViewTemp, HomeMetricCard } from '..'
import numberFormatter from '../../utils/numberFormatter'
import Layout from '../layouts/main_layout/index.main_layout'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'
import {
  Add,
  EditActionSVG,
  UserWithNegative,
  UserWithPositive,
  Wallet,
} from '../SVGIcons'

const TerminalsDashboard = ({ terminalData = [] }) => {
  const { mutate } = useSWRConfig()

  // UseState hook
  const [isaddModalOpened, setIsAddmodalOpened] = React.useState(false)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [logoURL, setLogoURL] = React.useState('')
  const [bankId, setBankId] = React.useState('')
  const [terminalBrand, setTerminalBrand] = React.useState('')
  const [terminalSerialNo, setTerminalSerialNo] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

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

  // DataGrid rows
  const rows = terminalData[1].map((item, index) => {
    return {
      id: index,
      col1: index + 1,
      tid: item.tid,
      serialNo: item.serialNo,
      bank: item.bank,
      transactions: item.transactions,
      nibbsRate: item.nibbsRate,
      clm: item.null,
      aggregator: item.null,
      agent: item.agentFullName,
      status: item.status,
      actions: '',
    }
  })

  // DataGrid rows for banks
  const bankRows = terminalData[3].map((item, index) => {
    return {
      id: index,
      col1: index + 1,
      bank: item.bank,
      terminals: item.noOfTerminals,
      actions: '',
    }
  })

  // DataGrid rows for agents
  const agentsRows = terminalData[2].map((item, index) => {
    return {
      id: index,
      col1: index + 1,
      agent: item.agent,
      terminals: item.noOfTerminals,
      actions: '',
    }
  })

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
      field: 'tid',
      headerName: 'Terminal ID',
      minWidth: 157,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'serialNo',
      headerName: 'Serial No.',
      minWidth: 156,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'bank',
      headerName: 'Bank',
      minWidth: 193,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'transactions',
      headerName: 'Transactions',
      minWidth: 156,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'nibbsRate',
      headerName: 'Nibble Rate (%)',
      minWidth: 150,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'clm',
      headerName: 'Cluster Manager',
      minWidth: 194,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'aggregator',
      headerName: 'Aggregator',
      minWidth: 180,
      flex: 1,
      headerClassName: 'grid-header',
      disableClickEventBubbling: true,
    },
    {
      field: 'agent',
      headerName: 'Agent',
      minWidth: 180,
      flex: 1,
      headerClassName: 'grid-header',
      disableClickEventBubbling: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 123,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span
            css={
              params.row.status.toLowerCase() === 'active'
                ? tw`bg-[#E9FBF9] text-paysure-success-100 text-[10px] uppercase p-1 rounded`
                : tw`text-[#EDA95A] bg-[#FDF6EF] text-[10px] uppercase p-1 rounded`
            }
          >
            {params.row.status}
          </span>
        )
      },
    },
    {
      field: 'actions',
      headerName: 'Action',
      minWidth: 100,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        // handle edit terminal
        const handleEdit = () => {}

        // handle view terminal
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

        // handle deactivate terminal
        const handleDeactivateTerminl = () => {
          setIsLoading(true)

          axios
            .post('/api/terminals/deactivateTerminal', {
              terminalId: params.row.col2,
            })
            .then(() => {
              mutate(`/api/terminals/terminalStats`)
              setIsLoading(false)
              toast.success('Terminal deactivated successfully')
            })
            .catch(err => {
              setIsLoading(false)
              console.log('Error =====> ', err)
              toast.error('Error deactivating terminal, please try again.')
            })
        }

        // handle activate terminal
        const handleActivateTerminl = () => {
          setIsLoading(true)

          axios
            .post('/api/terminals/activateTerminal', {
              terminalId: params.row.col2,
            })
            .then(() => {
              mutate(`/api/terminals/terminalStats`)
              setIsLoading(false)
              toast.success('Terminal activated successfully')
            })
            .catch(err => {
              setIsLoading(false)
              console.log('Error =====> ', err)
              toast.error('Error activating terminal')
            })
        }

        return (
          <div tw="space-x-1">
            <Tooltip title="Edit Terminal">
              <button onClick={handleEdit}>
                <EditActionSVG />
              </button>
            </Tooltip>

            {params.row.status.toLowerCase() === 'active' ? (
              <Tooltip title="Deactivate Terminal">
                <LoadingButton
                  loading={isLoading}
                  onClick={handleDeactivateTerminl}
                  tw="p-0 m-0 min-w-[initial]"
                >
                  <UserWithPositive />
                </LoadingButton>
              </Tooltip>
            ) : (
              <Tooltip title="Activate Terminal">
                <LoadingButton
                  loading={isLoading}
                  onClick={handleActivateTerminl}
                  tw="p-0 m-0 min-w-[initial]"
                >
                  <UserWithNegative />
                </LoadingButton>
              </Tooltip>
            )}

            <Tooltip title="View Terminal">
              <button onClick={handleView}>
                <Wallet />
              </button>
            </Tooltip>
          </div>
        )
      },
    },
  ]

  // dataGrid columns
  const banksColumns = [
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
      field: 'bank',
      headerName: 'Bank',
      minWidth: 193,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'terminals',
      headerName: 'Terminals',
      minWidth: 193,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'actions',
      headerName: 'Action',
      minWidth: 100,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        // handle view terminal
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

        return <Button>View</Button>
      },
    },
  ]

  // dataGrid columns
  const agentsColumns = [
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
      field: 'agent',
      headerName: 'Agents',
      minWidth: 193,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'terminals',
      headerName: 'Terminals',
      minWidth: 193,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'actions',
      headerName: 'Action',
      minWidth: 100,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        // handle view terminal
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

        return <Button>View</Button>
      },
    },
  ]

  /* An array of objects that is passed to the HomeDisplayCard component as a prop. */
  const overviewDataArray = [
    {
      amount: numberFormatter(terminalData[0].totalTerminals),
      title: 'Total Number of Terminals',
      link: '/terminals/terminals_list',
    },
    {
      amount: numberFormatter(terminalData[0].totalActiveTerminals),
      title: 'Total Number of Active Terminals',
    },
    {
      amount: numberFormatter(terminalData[0].totalInactiveTerminals),
      title: 'Total Number of Inactive Terminals',
    },
  ]

  return (
    <Layout title="Terminals">
      <div>
        <div css={[tw`flex items-center justify-between`]}>
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

      <div tw="grid mt-10 grid-cols-2 gap-3 md:grid-cols-3 lg:(gap-5)">
        {overviewDataArray.map((item, index) => (
          <HomeMetricCard.PlainCard
            key={index}
            amount={item.amount}
            title={item.title}
          />
        ))}
      </div>

      <DataGridViewTemp
        limited
        link="/terminals/terminals_list"
        title="Terminals"
        rows={rows}
        columns={columns}
      />

      <div tw="grid lg:grid-cols-2 gap-6">
        <DataGridViewTemp
          limited
          link="/terminals/terminals_list"
          title="Terminals Per Bank"
          rows={bankRows}
          columns={banksColumns}
        />
        <DataGridViewTemp
          limited
          link="/terminals/terminals_list"
          title="Terminals Per Agents"
          rows={agentsRows}
          columns={agentsColumns}
        />
      </div>
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
