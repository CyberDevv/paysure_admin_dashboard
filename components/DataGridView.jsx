import tw from 'twin.macro'
import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, InputAdornment, MenuItem, TextField } from '@mui/material'

import { Search } from './SVGIcons'

const DataGridView = ({
  rows,
  columns,
  children,
  dropdownData = [],
  limited,
}) => {
  // UseState hook
  const [selectedDrop, setSelectedDrop] = useState(dropdownData[0].value)

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

        {children}
      </FuncWrappper>

      {/* Grid/ */}
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1, width: '100%' }}>
          <DataGrid
            rows={limited ? rows.slice(0, 5) : rows}
            columns={columns}
            autoHeight
            disableColumnMenu
            hideFooter
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
const FuncWrappper = tw.div`space-y-2.5 lg:(flex items-center justify-between space-x-2.5 space-y-0)`
const Span = tw.span`text-[13px] text-[#10101266]`

export default DataGridView
