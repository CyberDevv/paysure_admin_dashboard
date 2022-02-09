import axios from 'axios'
import React from 'react'
import tw from 'twin.macro'
import { Button } from '@mui/material'

import { Add } from '../SVGIcons'
import Layout from '../layouts/main_layout/index.main_layout'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'
import { DataGridViewTemp, HomeDisplayCard, DatRangePickerAndOthers } from '..'
import Link from 'next/link'
import Router from 'next/router'

const UserssDashboard = () => {
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
  const handSetIsAddmodalOpened = React.useCallback(() =>
    setIsAddmodalOpened(true),
  )

  const handleSaveUser = React.useCallback(() => {
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
  })

  return (
    <Layout title="Users">
      <div css={[tw`flex justify-between items-center`]}>
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

      <HomeDisplayCard data={temporalData} />

      <DataGridViewTemp
        link="/users/users_list"
        limited
        title="Users list"
        rows={rows}
        columns={columns}
        dropdownData={dropdownData}
      >
        <DatRangePickerAndOthers />
      </DataGridViewTemp>
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
    col2: 'ETRANSACT',
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
    col2: 'KUDA',
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
    headerName: 'Wallet Balance',
    minWidth: 236,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Email',
    minWidth: 103,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col5',
    headerName: 'Phone Number',
    minWidth: 176,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col6',
    headerName: '2786111763',
    minWidth: 150,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col7',
    headerName: 'Status',
    minWidth: 144,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col8',
    headerName: 'Last Transaction',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
    disableClickEventBubbling: true,
    // renderCell: params => {
    //   return (
    //     <span css={[tw`bg-border2 text-paysure-100 p-1 rounded`]}>
    //       {params.row.col8}
    //     </span>
    //   )
    // },
  },
  {
    field: 'col9',
    headerName: 'Date Added',
    minWidth: 123,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col10',
    headerName: 'Action.',
    minWidth: 100,
    flex: 1,
    headerClassName: 'grid-header',
  },
]

// FIXME: Temp data (should be replaced with real data)
const temporalData = [
  {
    amount: '2312',
    title: 'Total',
    link: '/users/users_list',
  },
  {
    amount: '11434',
    title: 'Total Transactions',
  },
  {
    amount: '114',
    title: 'Total Pending Transactions',
  },
  {
    amount: '124',
    title: 'Total Failed Tranasctions',
  },
]

const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 pl-3.5 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`
const FlexBox = tw.div`flex items-center justify-between space-x-4`

export default UserssDashboard
