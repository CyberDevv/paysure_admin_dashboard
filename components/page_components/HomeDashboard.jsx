import tw from 'twin.macro'
import React, { useState } from 'react'
import DateAdapter from '@mui/lab/AdapterMoment'
import { DateRangePicker, LocalizationProvider } from '@mui/lab'
import { Box, Button, InputAdornment, TextField } from '@mui/material'

import { Calendar } from '../SVGIcons'
import Layout from '../layouts/main_layout/index.main_layout'
import { DataGridViewTemp, HomeDisplayCard, OverviewCardSection } from '..'

const HomeDashboard = () => {
  // UseState hook
  const [value, setValue] = useState([null, null])

  return (
    <Layout title="Home">
      <Ttile className="font-bold">
        Welcome to Paysure
        <TitleSpan>
          Manage all transactions and data on the Paysure service
        </TitleSpan>
      </Ttile>

      <HomeDisplayCard data={temporalData} hasIcon />

      <OverviewCardSection title="Agency Overview" data={agencyOveriewData} />

      <OverviewCardSection title="User Overview" data={agencyOveriewData2} />

      <DataGridViewTemp
        title="Recent Transactions"
        rows={rows}
        columns={columns}
        dropdownData={dropdownData}
      >
        <div css={[tw`flex items-center justify-between w-full`]}>
          {/* Date picker */}
          <div
            css={[
              tw`w-[300px] border border-[#EBF2FA] hover:(border-[#c6c7c9]) lg:min-w-[289px] px-4 py-1.5 rounded`,
            ]}
          >
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DateRangePicker
                startText=""
                inputFormat="DD MMMM"
                endText=""
                value={value}
                onChange={newValue => {
                  setValue(newValue)
                }}
                renderInput={(startProps, endProps) => (
                  <>
                    <TextField
                      {...startProps}
                      variant="standard"
                      sx={{
                        '& .MuiInput-root': {
                          fontSize: '13px',
                        },
                        '& .css-1480iag-MuiInputBase-root-MuiInput-root:before ':
                          {
                            content: 'none',
                          },
                        '& .css-1480iag-MuiInputBase-root-MuiInput-root:after':
                          {
                            conntent: 'none',
                            border: 'none',
                          },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Span>From:</Span>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Calendar />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box sx={{ mx: '8px', color: '#979797' }}> | </Box>
                    <TextField
                      variant="standard"
                      sx={{
                        '& .MuiInput-root': {
                          fontSize: '13px',
                        },
                        '& .css-1480iag-MuiInputBase-root-MuiInput-root:before ':
                          {
                            content: 'none',
                          },
                        '& .css-1480iag-MuiInputBase-root-MuiInput-root:after':
                          {
                            conntent: 'none',
                            border: 'none',
                          },
                      }}
                      {...endProps}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Span>To:</Span>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Calendar />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </>
                )}
              />
            </LocalizationProvider>
          </div>

          <MUIButton>Export data</MUIButton>
        </div>
      </DataGridViewTemp>
    </Layout>
  )
}

// FIXME: Temp data (should be replaced with real data)
const dropdownData = [
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
    id: 2,
    col1: 2,
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
    headerName: 'Initiator',
    minWidth: 227,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Type',
    minWidth: 140,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Amount',
    minWidth: 126,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col5',
    headerName: 'Charge',
    minWidth: 101,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col6',
    headerName: 'Transaction Ref.',
    minWidth: 139,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col7',
    headerName: 'Payment Method',
    minWidth: 144,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col8',
    headerName: 'Status',
    minWidth: 101,
    flex: 1,
    headerClassName: 'grid-header',
    disableClickEventBubbling: true,
    renderCell: params => {
      return (
        <span css={[tw`bg-border2 text-paysure-100 p-1 rounded`]}>
          {params.row.col8}
        </span>
      )
    },
  },
  {
    field: 'col9',
    headerName: 'Notification Time',
    minWidth: 185,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col10',
    headerName: 'Action',
    minWidth: 100,
    flex: 1,
    headerClassName: 'grid-header',
  },
]

// FIXME: Temp data (should be replaced with real data)
const temporalData = [
  {
    amount: '240',
    title: 'Total Providers',
  },
  {
    amount: '120',
    title: 'Total Services',
  },
  {
    amount: '30',
    title: 'Total Super Agent',
  },
  {
    amount: '72',
    title: 'Total Agents',
  },
  {
    amount: '534',
    title: 'Total Users',
  },
  {
    amount: '10',
    title: 'Total Organizations',
  },
  {
    amount: '10',
    title: 'Total Admins',
  },
  {
    amount: '32429',
    title: 'Total Paysure Users',
  },
]

// FIXME: Temp data (should be replaced with real data)
const agencyOveriewData = [
  {
    amount: 55102430,
    label: 'Total Transaction',
  },
  {
    amount: 1350,
    label: 'Completed Transaction',
  },
  {
    amount: 10,
    label: 'Total Failed',
  },
  {
    amount: 20,
    label: 'Total Failed',
  },
]

// FIXME: Temp data (should be replaced with real data)
const agencyOveriewData2 = [
  {
    amount: 102430,
    label: 'Total Users',
  },
  {
    amount: 322321350,
    label: 'Completed Transactions',
  },
  {
    amount: 10,
    label: 'Total Failed',
  },
  {
    amount: 20,
    label: 'Total Failed',
  },
]

const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:(text-[32px])`
const TitleSpan = tw.span`block text-light-dark text-sm font-normal mt-1.5 tracking-normal lg:(mt-3 text-base)`
const MUIButton = tw(
  Button,
)`normal-case text-paysure-100 bg-paysure-10 px-5 py-3 text-sm tracking-[-0.025em] hover:()`
const Span = tw.span`text-[13px] text-[#10101266]`

export default HomeDashboard
