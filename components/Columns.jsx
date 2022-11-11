import { Tooltip } from '@mui/material'
import CurrencyFormat from 'react-currency-format'
import { EditActionSVG, Print, ViewActionSVG } from './SVGIcons'
import moment from 'moment'
import tw from 'twin.macro'
import Router from 'next/router'

export const UsersListColumn = [
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
    field: 'name',
    headerName: 'Name',
    minWidth: 250,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'walletBalance',
    headerName: 'Wallet Balance',
    minWidth: 220,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <CurrencyFormat
          value={params.row.walletBalance}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      )
    },
  },
  {
    field: 'email',
    headerName: 'Email',
    minWidth: 270,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    minWidth: 180,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'acctNumber',
    headerName: 'Account Number',
    minWidth: 180,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
    disableClickEventBubbling: true,
    renderCell: params => {
      return (
        <span
          css={[
            tw`uppercase text-[10px] p-1 rounded`,
            params.row.status.toLowerCase() === 'active'
              ? tw`bg-[#E9FBF9] text-paysure-success-100 `
              : tw`bg-[#FDF6EF] text-[#EDA95A] `,
          ]}
        >
          {params.row.status}
        </span>
      )
    },
  },
  {
    field: 'lastTransaction',
    headerName: 'Last Transaction',
    minWidth: 174,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <span>
          {params.row.lastTransaction
            ? moment(params.row.lastTransaction).format('MMM DD, YYYY HH:mm')
            : '-'}
        </span>
      )
    },
  },
  {
    field: 'dateJoined',
    headerName: 'Date Joined',
    minWidth: 173,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <span>
          {moment(params.row.dateJoined).format('MMM DD, YYYY HH:mm')}
        </span>
      )
    },
  },
  {
    field: 'action',
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

        Router.push({
          pathname: `/users/${thisRow.name}`,
          query: { username: thisRow.email },
        })
      }

      return (
        <div tw="space-x-1">
          <Tooltip title="Edit User">
            <button onClick={handleEdit}>
              <EditActionSVG />
            </button>
          </Tooltip>

          <Tooltip title="View User">
            <button onClick={handleView}>
              <ViewActionSVG />
            </button>
          </Tooltip>
        </div>
      )
    },
  },
]

export const UserTransColumn = [
  {
    field: 'col1',
    headerName: 'S/N',
    minWidth: 71,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'initiator',
    headerName: 'Initiator',
    minWidth: 227,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'type',
    headerName: 'Transaction Type',
    minWidth: 170,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'transactionRef',
    headerName: 'Transaction Ref',
    minWidth: 170,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'paymentMethod',
    headerName: 'Payment Method',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'amount',
    headerName: 'Amount',
    minWidth: 130,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <CurrencyFormat
          value={params.row.amount}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      )
    },
  },
  {
    field: 'charge',
    headerName: 'Charges',
    minWidth: 100,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <CurrencyFormat
          value={params.row.charge}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      )
    },
  },
  {
    field: 'rrn',
    headerName: 'RRN',
    minWidth: 144,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'markPan',
    headerName: 'Mark Pan',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
    disableClickEventBubbling: true,
    renderCell: params => {
      return (
        <span
          css={
            params.row.status.toLowerCase() === 'pending'
              ? tw`bg-[#EBF2FA] text-[#A6B7D4] p-1 rounded capitalize`
              : tw`p-1 capitalize rounded bg-border2 text-paysure-100`
          }
        >
          {params.row.status}
        </span>
      )
    },
  },
  {
    field: 'date',
    headerName: 'Date',
    minWidth: 203,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col11',
    headerName: 'Action.',
    minWidth: 100,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      const handleEdit = () => {}

      const handleView = e => {
        const api = params.api
        const thisRow = {}

        api
          .getAllColumns()
          .filter(c => c.field !== '__check__' && !!c)
          .forEach(
            c => (thisRow[c.field] = params.getValue(params.id, c.field)),
          )

        // Router.push(`/users/${thisRow.col1}`)
      }

      return (
        <div tw="space-x-1">
          <Tooltip title="View Transaction">
            <button onClick={handleEdit}>
              <ViewActionSVG />
            </button>
          </Tooltip>

          <Tooltip title="Print Transaction">
            <button onClick={handleView}>
              <Print />
            </button>
          </Tooltip>
        </div>
      )
    },
  },
]
