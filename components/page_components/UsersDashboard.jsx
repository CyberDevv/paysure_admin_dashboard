import axios from 'axios'
import React from 'react'
import moment from 'moment'
import tw from 'twin.macro'
import Router from 'next/router'
import { Button, Tooltip } from '@mui/material'
import CurrencyFormat from 'react-currency-format'

import { DataGridViewTemp, HomeDisplayCard } from '..'
import numberFormatter from '../../utils/numberFormatter'
import Layout from '../layouts/main_layout/index.main_layout'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import { Add, EditActionSVG, ViewActionSVG } from '../SVGIcons'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'

const UserssDashboard = ({ usersStats = [] }) => {
  const { usersInfo = [] } = usersStats

  // useState hook
  const [isaddModalOpened, setIsAddmodalOpened] = React.useState(false)
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [emailAddress, setEmailAdress] = React.useState('')
  const [phonePri, setPhonePri] = React.useState('')
  const [address1, setAddress1] = React.useState('')
  const [DOB, setDOB] = React.useState('')
  const [state, setState] = React.useState('')
  const [city, setCity] = React.useState('')

  // functions
  const handSetIsAddmodalOpened = () => setIsAddmodalOpened(true)

  // Function to save user data
  const handleSaveUser = () => {
    const res = axios.post('/api/users/add_user', {
      firstName,
      lastName,
      emailAddress,
      phonePri,
      address1,
      DOB,
      state,
      city,
    })
  }

  // Array of data to be displayed in the cards
  const metricData = [
    {
      amount: numberFormatter(2123),
      title: 'Total Number of Users',
      link: '/users/users_list',
      active: '121',
      inactive: '200',
    },
    {
      amount: numberFormatter(2123),
      title: 'Total Number of Completed Transactions',
    },
    {
      amount: numberFormatter(2123),
      title: 'Total Number of  Pending Transactions',
    },
    {
      amount: numberFormatter(2123),
      title: 'Total Number of  Failed Tranasctions',
    },
  ]

  // DataGrid rows
  let rows
  // check if providerList is an array
  if (Array.isArray(usersInfo)) {
    rows = usersInfo.map((item, index) => {
      return {
        id: item.tid,
        col1: index + 1,
        col2: item.fullName,
        col3: item.walletBalance,
        col4: item.emailAddress,
        col5: item.phonePri,
        col6: item.accountNumber,
        col7: item.statusStr,
        col8: item.lastTransactionDate,
        col9: item.dateAdded,
        col10: '',
      }
    })
  } else {
    rows = []
  }

  // DataGrid columns
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
      headerName: 'Name',
      minWidth: 250,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col3',
      headerName: 'Wallet Balance',
      minWidth: 220,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <CurrencyFormat
            value={params.row.col3}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          />
        )
      },
    },
    {
      field: 'col4',
      headerName: 'Email',
      minWidth: 220,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col5',
      headerName: 'Phone Number',
      minWidth: 180,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col6',
      headerName: 'Account Number',
      minWidth: 180,
      flex: 1,
      headerClassName: 'grid-header',
    },
    {
      field: 'col7',
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
              params.row.col7.toLowerCase() === 'active'
                ? tw`bg-[#E9FBF9] text-paysure-success-100 `
                : tw`bg-[#FDF6EF] text-[#EDA95A] `,
            ]}
          >
            {params.row.col7}
          </span>
        )
      },
    },
    {
      field: 'col8',
      headerName: 'Last Transaction',
      minWidth: 144,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return (
          <span>
            {params.row.col8
              ? moment(params.row.col8).format('MMM DD, YYYY HH:mm')
              : '-'}
          </span>
        )
      },
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
            pathname: `/users/${thisRow.col2}`,
            query: { email: thisRow.col4, phone: thisRow.col5 },
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

  return (
    <Layout title="Users">
      <div css={[tw`flex items-center justify-between`]}>
        <Ttile className="font-bold">Users</Ttile>

        <MUIButton onClick={handSetIsAddmodalOpened} startIcon={<Add />}>
          Add Users
        </MUIButton>

        {/* Add Users modal */}
        <Modal
          setState={setIsAddmodalOpened}
          title="Add New User"
          state={isaddModalOpened}
          buttonLabel="Next"
          onClick={handleSaveUser}
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
              value={lastName}
              setState={setLastName}
            />
          </FlexBox>
          <Label
            label="Email"
            type="emailAddress"
            placeholder="yourname@example.com"
            value={emailAddress}
            setState={setEmailAdress}
          />
          <FlexBox>
            <Label
              label="Phone Number"
              type="tel"
              placeholder="08012345678"
              value={phonePri}
              setState={setPhonePri}
            />
            <Label
              value={DOB}
              label="Date of Birth"
              type="date"
              setState={setDOB}
            />
          </FlexBox>
          <Label
            label="Address"
            type="text"
            placeholder="Address"
            value={address1}
            setState={setAddress1}
          />
          <FlexBox>
            <Label
              label="State"
              type="text"
              placeholder="State"
              value={state}
              setState={setState}
            />
            <Label
              label="City"
              type="text"
              placeholder="City"
              value={city}
              setState={setCity}
            />
          </FlexBox>
        </Modal>
      </div>

      <HomeDisplayCard data={metricData} />

      <DataGridViewTemp
        link="/users/users_list"
        limited
        title="Users list"
        rows={rows}
        columns={columns}
        className={tw`space-y-4 md:(grid grid-cols-2) xl:(flex space-y-0 space-x-4 w-full)`}
      />
    </Layout>
  )
}

// Tailwind Styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 pl-3.5 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`
const FlexBox = tw.div`flex items-center justify-between space-x-4`

export default UserssDashboard
