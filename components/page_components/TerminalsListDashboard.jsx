import React from 'react'
import axios from 'axios'
import moment from 'moment'
import tw from 'twin.macro'
import Router from 'next/router'
import { useSWRConfig } from 'swr'
import { toast } from 'react-toastify'
import { Tooltip } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import CurrencyFormat from 'react-currency-format'

import Modal from '../layouts/modal_ayout/index.modal_layout'
import Layout from '../layouts/main_layout/index.main_layout'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'
import {
  EditActionSVG,
  UserWithNegative,
  Wallet,
  UserWithPositive,
} from '../SVGIcons'
import {
  DataGridViewTemp,
  SearchBar,
  FilterBox,
  DatRangePickerAndOthers,
} from '..'

const TerminalsListDashboard = ({
  terminalsList = [],
  page,
  searchKey,
  status,
  pageSize,
  toDate,
  fromDate,
}) => {
  const { mutate } = useSWRConfig()
  
  const { TerminalData = [] } = terminalsList

  // useState hook
  const [value, setValue] = React.useState([
    // TODO: change this to the correct amount of days
    fromDate ? fromDate : moment().subtract(400, 'days'),
    toDate ? toDate : new Date(),
  ])
  const [isLoading, setIsLoading] = React.useState(false)

  // rows
  let rows
  // check if TerminalData is an array
  if (Array.isArray(TerminalData)) {
    rows = TerminalData.map((item, index) => {
      return {
        id: item.tid,
        col1: (page - 1) * 10 + (index + 1),
        col2: item.terminalId,
        col3: item.terminalSerialNo,
        col4: item.bankStr,
        col5: item.transCount,
        col6: item.nibssRate,
        col7: item.partnerName,
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
              mutate(`/api/terminals/terminalsListLists?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}&searchKey=${searchKey}&status=${status}`)
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
              mutate(`/api/terminals/terminalsListLists?fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}&searchKey=${searchKey}&status=${status}`)
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

            {params.row.col9.toLowerCase() === 'active' ? (
              <Tooltip title="Deactivate Terminal">
                <LoadingButton
                  loading={isLoading}
                  onClick={handleDeactivateTerminl}
                  tw="p-0 m-0 min-w-[initial]"
                >
                  <UserWithNegative />
                </LoadingButton>
              </Tooltip>
            ) : (
              <Tooltip title="Activate Terminal">
                <LoadingButton
                  loading={isLoading}
                  onClick={handleActivateTerminl}
                  tw="p-0 m-0 min-w-[initial]"
                >
                  <UserWithPositive />
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

  const statusDataArray = [
    {
      value: '0',
      label: 'All',
    },
    {
      value: '1',
      label: 'Active',
    },
    {
      value: '2',
      label: 'Inactive',
    },
  ]

  return (
    <Layout goBack>
      <DataGridViewTemp
        title="Terminals"
        rows={rows}
        columns={columns}
        page={page}
        recordCount={terminalsList.recordCount ? terminalsList.recordCount : 0}
        pagination={true}
        className={tw`grid grid-auto-columns[auto] gap-4 w-full xl:(flex items-center space-y-0 space-x-4)`}
        hasExportBtn
      >
        <div tw="space-y-4 sm:(flex space-x-4 space-y-0) w-full col-span-2">
          <SearchBar value={searchKey} />
          <FilterBox
            label="Showing"
            dropdownData={statusDataArray}
            statusValue={status}
          />
        </div>
        <DatRangePickerAndOthers value={value} setValue={setValue} />
      </DataGridViewTemp>
    </Layout>
  )
}

export default TerminalsListDashboard
