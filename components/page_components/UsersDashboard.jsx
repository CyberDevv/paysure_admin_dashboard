import tw from 'twin.macro'
import React, { useState } from 'react'
import DateAdapter from '@mui/lab/AdapterMoment'
import { DateRangePicker, LocalizationProvider } from '@mui/lab'
import { Box, Button, InputAdornment, TextField } from '@mui/material'

import { Add, Calendar } from '../SVGIcons'
import { DataGridViewTemp, HomeDisplayCard } from '..'
import Layout from '../layouts/main_layout/index.main_layout'

const UserssDashboard = () => {
  // UseState hook
  const [value, setValue] = useState([null, null])

  return (
    <Layout title="Users">
      <div css={[tw`flex justify-between items-center`]}>
        <Ttile className="font-bold">Users</Ttile>

        <MUIButton startIcon={<Add />}>Add User</MUIButton>
      </div>

      <HomeDisplayCard data={temporalData} />

      <DataGridViewTemp
        title="Users list"
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

const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:(text-[32px])`
const TitleSpan = tw.span`block text-light-dark text-sm font-normal mt-1.5 tracking-normal lg:(mt-3 text-base)`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 pl-3.5 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`
const Span = tw.span`text-[13px] text-[#10101266]`

export default UserssDashboard
