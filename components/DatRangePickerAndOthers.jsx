import tw from 'twin.macro'
import React, { useState } from 'react'
import DateAdapter from '@mui/lab/AdapterMoment'
import { DateRangePicker, LocalizationProvider } from '@mui/lab'
import { Box, Button, InputAdornment, TextField } from '@mui/material'

import { Calendar } from './SVGIcons'

const DatRangePickerAndOthers = () => {
  // UseState hook
  const [value, setValue] = useState([null, null])
  return (
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
                    '& .css-1480iag-MuiInputBase-root-MuiInput-root:before ': {
                      content: 'none',
                    },
                    '& .css-1480iag-MuiInputBase-root-MuiInput-root:after': {
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
                    '& .css-1480iag-MuiInputBase-root-MuiInput-root:before ': {
                      content: 'none',
                    },
                    '& .css-1480iag-MuiInputBase-root-MuiInput-root:after': {
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
  )
}

// Tailwind Styles
const MUIButton = tw(
  Button,
)`normal-case text-paysure-100 bg-paysure-10 px-5 py-3 text-sm tracking-[-0.025em]`
const Span = tw.span`text-[13px] text-[#10101266]`

export default DatRangePickerAndOthers
