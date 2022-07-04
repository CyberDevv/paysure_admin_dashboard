import { Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { toast } from 'react-toastify'
import tw from 'twin.macro'
import { EllipsisSVG, Print, ViewActionSVG } from '../SVGIcons'

import axios from 'axios'
import moment from 'moment'
import { DataGridViewTemp, HomeDisplayCard, OverviewCardSection } from '..'
import numberFormatter from '../../utils/numberFormatter'
import Layout from '../layouts/main_layout/index.main_layout'

const OrganizationDashboard = ({ organizationStats = [], organizationId }) => {
  const { partnerTrx = {} } = organizationStats

  // useState hook
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  // functions
  const handleDeactivate = () => {
    setIsLoading(true)

    axios
      .post('/api/organizatons/deactivate', {
        organizationId,
      })
      .then(() => {
        mutate(`/api/organizatons/${organizationId}`)
        toast.success('Organization deactivated successfully')
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
        console.log('Error =====> ', err)
        toast.error('Error deactivating organization, please try again.')
      })
  }

  const handleActivate = () => {
    // disable-partner   tid in json body  /  enable-partner  tid in json body

    setIsLoading(true)

    axios
      .post('/api/organizatons/activate', {
        organizationId,
      })
      .then(() => {
        mutate(`/api/organizatons/${organizationId}`)
        toast.success('Organization activated successfully')
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
        console.log('Error =====> ', err)
        toast.error('Error activating organization, please try again.')
      })
  }

  const open = Boolean(anchorEl)

  const handleBtnMenuShown = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // rows
  let rows
  // check if partnerTrx.transData is an array
  if (Array.isArray(partnerTrx.transData)) {
    rows = partnerTrx.transData.map((item, index) => {
      return {
        id: item.tid,
        col1: index + 1,
        col2: item.transType,
        col3: item.requestId,
        col4: item.amount,
        col5: item.fee,
        col6: item.status,
        col7: item.transDate,
        col8: '',
      }
    })
  } else {
    rows = []
  }

  const servicesData = [
    {
      amount: numberFormatter(55102430),
      label: 'POS Withdrawal',
    },
    {
      amount: numberFormatter(1350),
      label: 'Transfer',
    },
    {
      amount: numberFormatter(10),
      label: 'BVN',
    },
  ]

  // overview data
  const organizationData = [
    {
      amount: (
        <CurrencyFormat
          value={organizationStats.transSum}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      title: 'Total Transactions (N)',
    },
    {
      amount: numberFormatter(partnerTrx.approvedTransactions),
      title: 'Total Completed Transactions',
    },
    {
      amount: numberFormatter(partnerTrx.failedTransactions),
      title: 'Total Failed Transactions',
    },
    {
      amount: numberFormatter(partnerTrx.none),
      title: 'Total Pending Transactions',
    },
  ]

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
      headerName: 'Service Type',
      minWidth: 157,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col3',
      headerName: 'Transaction ID',
      minWidth: 200,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col4',
      headerName: 'Amount',
      minWidth: 143,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <CurrencyFormat
            value={params.row.col4}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          />
        )
      },
    },
    {
      field: 'col5',
      headerName: 'Charge',
      minWidth: 126,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <CurrencyFormat
            value={params.row.col5}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          />
        )
      },
    },
    {
      field: 'col6',
      headerName: 'Status',
      minWidth: 150,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span
            css={
              params.row.col6?.toLowerCase() !== 'accepted'
                ? tw`bg-[#EBF2FA] text-[#A6B7D4] p-1 rounded capitalize`
                : tw`bg-border2 text-paysure-100 p-1 rounded capitalize`
            }
          >
            {params.row.col6}
          </span>
        )
      },
    },
    {
      field: 'col7',
      headerName: 'Date',
      minWidth: 170,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span>{moment(params.row.col7).format('MMM DD, YYYY HH:mm')}</span>
        )
      },
    },
    {
      field: 'col8',
      headerName: 'Action.',
      minWidth: 100,
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

  return (
    <Layout goBack>
      <Header>
        <div tw="flex justify-between items-center w-full xl:w-[inherit]">
          {/* Avatar */}
          <AvatarWrapper>
            <AvatarDetails>
              <UserName className="font-bold">
                {organizationStats.partnerName}
              </UserName>
              <LastSeen>POS Withdrawal | Transfer | BVN</LastSeen>
            </AvatarDetails>
          </AvatarWrapper>

          {/* buttons  */}
          <div>
            <IconButton
              id="basic-button"
              aria-controls={open ? 'Btnmenu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleBtnMenuShown}
              tw="md:hidden lg:block xl:hidden"
            >
              <EllipsisSVG />
            </IconButton>

            <Menu
              id="Btnmenu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>
                {organizationStats.partnerStatus?.toLowerCase() ===
                  'active' && (
                  <button onClick={handleDeactivate}>Deactivate</button>
                )}

                {organizationStats.partnerStatus?.toLowerCase() !==
                  'active' && (
                  <button onClick={handleActivate}>Activate</button>
                )}
              </MenuItem>
            </Menu>
          </div>
        </div>

        {/* Action Buttons */}
        <ButtonWrapper>
          {/* Button to deactivate organization */}
          {organizationStats.partnerStatus?.toLowerCase() === 'active' && (
            <MUIButton
              loading={isLoading}
              onClick={handleDeactivate}
              tw="bg-paysure-danger-100 hover:(bg-paysure-danger-100 ring-paysure-danger-100)"
            >
              Deactivate
            </MUIButton>
          )}

          {/* Button to activate organization */}
          {organizationStats.partnerStatus?.toLowerCase() !== 'active' && (
            <MUIButton
              loading={isLoading}
              onClick={handleActivate}
              tw="bg-paysure-success-100 hover:(bg-paysure-success-100 ring-paysure-success-100)"
            >
              Activate
            </MUIButton>
          )}
        </ButtonWrapper>
      </Header>

      {/* Wallet balance */}
      <WalletWrapper className="bgSVG">
        <P className="font-500">Total Wallet Balance</P>
        <Amount className="font-500">
          <CurrencyFormat
            value={organizationStats.walletBalance}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          />
        </Amount>
      </WalletWrapper>

      <HomeDisplayCard data={organizationData} />

      {/* Services */}
      <OverviewCardSection
        title="Services"
        data={servicesData}
        onClick="/organizations/1/service/1"
      />

      {/* DataGrid */}
      <DataGridViewTemp
        limited
        link="/organizations/1/transaction_list"
        title="Transaction Records"
        rows={rows}
        columns={columns}
      />
    </Layout>
  )
}

// Tailwind styles
const Header = tw.div`flex flex-col space-y-4 lg:(flex-row items-center justify-between space-y-0)`
const AvatarWrapper = tw.div`flex items-center space-x-3 lg:space-x-6`
const AvatarDetails = tw.div`space-y-1 lg:space-y-2.5`
const UserName = tw.h4`text-xl lg:(text-2xl) tracking-[-0.05em] text-paysure-text-100 leading-7`
const LastSeen = tw.p`text-xs lg:(text-sm) text-[#A6B7D4] tracking-[-0.05em]`
const ButtonWrapper = tw.div`hidden md:flex items-center space-x-3 lg:(space-x-2.5 hidden) xl:flex`
const MUIButton = tw(
  Button,
)`normal-case text-white bg-paysure-100 px-3 py-[13px] rounded-lg hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`
const UserGrid = tw.div`mt-5 space-y-4 lg:(mt-10 space-y-6)`
const WalletWrapper = tw.div`mt-10 p-4 space-y-1 rounded-xl lg:(py-10 px-8 space-y-4 rounded-[28px])`
const P = tw.p`leading-[19px] text-sm lg:text-base`
const Amount = tw.h4`text-4xl lg:text-[40px] leading-[48px] tracking-[-0.05em]`
UserGrid

export default OrganizationDashboard
