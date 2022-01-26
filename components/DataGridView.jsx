import tw from 'twin.macro'
import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import DateAdapter from '@mui/lab/AdapterMoment'
import { DateRangePicker, LocalizationProvider } from '@mui/lab'
import { Box, Button, InputAdornment, MenuItem, TextField } from '@mui/material'

import { Search, Calendar } from './SVGIcons'

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

const columns = [
  {
    field: 'col1',
    headerName: 'S/N',
    width: 71,
    headerClassName: 'grid-header',
  },
  {
    field: 'col2',
    headerName: 'Initiator',
    width: 227,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Type',
    width: 140,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'Amount',
    width: 126,
    headerClassName: 'grid-header',
  },
  {
    field: 'col5',
    headerName: 'Charge',
    width: 101,
    headerClassName: 'grid-header',
  },
  {
    field: 'col6',
    headerName: 'Transaction Ref.',
    width: 139,
    headerClassName: 'grid-header',
  },
  {
    field: 'col7',
    headerName: 'Payment Method.',
    width: 144,
    headerClassName: 'grid-header',
  },
  {
    field: 'col8',
    headerName: 'Status.',
    width: 101,
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
    headerName: 'Notification Time.',
    width: 185,
    headerClassName: 'grid-header',
  },
  {
    field: 'col10',
    headerName: 'Action.',
    width: 79,
    headerClassName: 'grid-header',
  },
]

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

const DataGridView = () => {
  // UseState hook
  const [selectedDrop, setSelectedDrop] = useState('user')
  const [value, setValue] = useState([null, null])

  // functions
  const handleDropdownSelected = event => {
    setSelectedDrop(event.target.value)
  }
  return (
    <Wrapper>
      {/* Functionalitiies */}
      <FuncWrappper>
        <div css={[tw`flex items-center space-x-2.5`]}>
          {/* Search */}
          <TextField
            id="outlined-start-adornment"
            size="small"
            sx={{
              fontSize: '13px',
              minWidth: '256px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#EBF2FA',
                },
                '&:hover fieldset': {
                  borderColor: '#c6c7c9',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Span>Search</Span>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button sx={{ minWidth: 0 }}>
                    <Search />
                  </Button>
                </InputAdornment>
              ),
            }}
          />

          {/* Checkbox */}
          <TextField
            select
            value={selectedDrop}
            onChange={handleDropdownSelected}
            size="small"
            sx={{
              fontSize: '13px',
              minWidth: '157px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#EBF2FA',
                },
                '&:hover fieldset': {
                  borderColor: '#c6c7c9',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Span>Showing:</Span>
                </InputAdornment>
              ),
            }}
          >
            {dropdownData.map(option => (
              <MenuItem
                sx={{ fontSize: '13px' }}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

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
      </FuncWrappper>

      {/* Grid/ */}
      <div style={{ display: 'flex', height: '420px' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableColumnMenu
            hideFooter={true}
            rowHeight={70}
            sx={{
              border: 'none',
              '& .grid-header': {
                backgroundColor: '#F3F7FC',
                fontSize: '13px',
                paddingX: '15px',
                color: '#000',
              },
              '& .MuiDataGrid-row': {
                borderBottom: '1px solid #EBF2FA',
                fontSize: '13px',
                color: '#16192C',
              },
              '& .MuiDataGrid-cell': {
                paddingX: '20px',
                // marginY: '58px',
              },
            }}
          />
        </div>
      </div>
    </Wrapper>
  )
}

// Tailwind styles
const Wrapper = tw.div`my-4 space-y-6`
const Span = tw.span`text-[13px] text-[#10101266]`
const FuncWrappper = tw.div`space-y-2.5 lg:(flex items-center justify-between space-x-2.5 space-y-0)`
const MUIButton = tw(
  Button,
)`normal-case text-paysure-100 bg-paysure-10 px-5 py-3 text-sm tracking-[-0.025em] hover:()`

export default DataGridView
