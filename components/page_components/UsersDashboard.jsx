import { Button } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import { useSWRConfig } from 'swr'
import tw from 'twin.macro'

import { DataGridViewTemp, HomeMetricCard } from '..'
import numberFormatter from '../../utils/numberFormatter'
import { UsersListColumn } from '../Columns'
import Layout from '../layouts/main_layout/index.main_layout'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'
import { Add } from '../SVGIcons'

const UserssDashboard = ({ usersStats, tableData }) => {
  const { mutate } = useSWRConfig()
  
  // useState hook
  const [isaddModalOpened, setIsAddmodalOpened] = React.useState(false)
  const [firstName, setFirstName] = React.useState('Test')
  const [lastName, setLastName] = React.useState('User')
  const [emailAddress, setEmailAdress] = React.useState('testUser@gmail.com')
  const [phonePri, setPhonePri] = React.useState('08012345678')
  const [address1, setAddress1] = React.useState(
    'String String String String String',
  )
  const [DOB, setDOB] = React.useState('11/12/2008')
  const [state, setState] = React.useState('String State')
  const [city, setCity] = React.useState('String City')
  const [loading, setLoading] = React.useState(false)

  // functions
  const handSetIsAddmodalOpened = () => setIsAddmodalOpened(true)

  // Function to save user data
  const handleSaveUser = () => {
    setLoading(true)

    axios
      .post('/api/users/addUser', {
        firstName,
        lastName,
        emailAddress,
        phonePri,
        address1,
        DOB,
        state,
        city,
      })
      .then(res => {
        toast.success('User added successfully')

        setLoading(false)

        setFirstName('')
        setLastName('')
        setEmailAdress('')
        setPhonePri('')
        setAddress1('')
        setDOB('')
        setState('')
        setCity('')
        
        setIsAddmodalOpened(false)

        // Fresh information from the server
        mutate('/api/users/usersStats')
        mutate('/api/users/usersList')
      })
      .catch(err => {
        setLoading(false)
        toast.error(err.response.data.message)
        console.log('err >>>>', err.response.data)
      })
  }

  // Array of data to be displayed in the cards
  const metricData = [
    {
      amount: numberFormatter(
        usersStats.transactionsAnalytics?.totalTransactions || 0,
      ),
      title: 'Total Number of Transactions',
    },
    {
      amount: numberFormatter(
        usersStats.transactionsAnalytics?.totalCompletedTransactions || 0,
      ),
      title: 'Total Number of Completed Transactions',
    },
    {
      amount: numberFormatter(
        usersStats.transactionsAnalytics?.totalFailedTransactions || 0,
      ),
      title: 'Total Number of  Pending Transactions',
    },
    {
      amount: numberFormatter(
        usersStats.transactionsAnalytics?.totalPendingTransactions || 0,
      ),
      title: 'Total Number of  Failed Tranasctions',
    },
  ]

  // DataGrid rows
  const rows =
    tableData.length > 0
      ? tableData.map((item, index) => {
          return {
            id: index,
            col1: index + 1,
            name: item.fullName,
            walletBalance: item.walletBalance,
            email: item.userEmail,
            phoneNumber: item.phoneNumber,
            acctNumber: item.accountNumber,
            status: item.status,
            lastTransaction: item.lastTransaction,
            dateJoined: item.createOn,
            actions: '',
          }
        })
      : []

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
          loading={loading}
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

      <div tw="lg:(overflow-x-auto) w-full" className="scrollHidden">
        <div tw="mt-10 grid grid-cols-2 gap-3 w-full md:grid-cols-3 lg:(flex gap-5)">
          <HomeMetricCard.CardWithActiveInActiveNoIcon
            title={`Total Number of Users`}
            active={numberFormatter(
              usersStats.userAnalytics?.totalActiveUsers || 0,
            )}
            inactive={numberFormatter(
              usersStats.userAnalytics?.totalInactiveUsers || 0,
            )}
            amount={numberFormatter(usersStats.userAnalytics?.totalUsers || 0)}
          />
          {metricData.map(({ amount, title }, index) => {
            return (
              <HomeMetricCard.PlainCard
                key={index}
                title={title}
                amount={amount}
              />
            )
          })}
        </div>
      </div>

      <DataGridViewTemp
        link="/users/users_list"
        limited
        title="Users list"
        rows={rows}
        columns={UsersListColumn}
        // className={tw`space-y-4 md:(grid grid-cols-2) xl:(flex space-y-0 space-x-4 w-full)`}
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
