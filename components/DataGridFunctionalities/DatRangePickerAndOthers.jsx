import tw from 'twin.macro'
import moment from 'moment'
import React from 'react'
import DateAdapter from '@mui/lab/AdapterMoment'
import { DateRangePicker, LocalizationProvider } from '@mui/lab'
import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import { useRouter } from 'next/router'

import { Calendar, Search } from '../SVGIcons'

const DatRangePickerAndOthers = ({ value, setValue }) => {
  const router = useRouter()

  // UseState hook
  // const [value, setValue] = useState([moment().subtract(30, 'days'), new Date()])

  const handleDateFilter = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        fromDate: moment(value[0]).format('YYYY-MM-DD hh:mm:ss'),
        toDate: moment(value[1]).format('YYYY-MM-DD hh:mm:ss'),
      },
    })
  }

  // components
  const handleRenderInput = React.useCallback((startProps, endProps) => {
    return (
      <>
        <TextField
          {...startProps}
          variant="standard"
          fullWidth
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
          fullWidth
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
        <IconButton onClick={handleDateFilter} sx={{ marginLeft: '4px' }}>
          <Search />
        </IconButton>
      </>
    )
  })

  // functions
  const handleSetValue = React.useCallback(newValue => {
    setValue(newValue)
  })

  return (
    <div
      css={[
        tw`border border-[#EBF2FA] w-full hover:(border-[#c6c7c9]) lg:(min-w-[289px]) 2xl:() px-4 py-1.5 rounded`,
      ]}
    >
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DateRangePicker
          mask="___ __, ____"
          startText=""
          inputFormat="MMM DD, YYYY"
          endText=""
          disableFuture
          value={value}
          onChange={handleSetValue}
          renderInput={handleRenderInput}
        />
      </LocalizationProvider>
    </div>
  )
}

// Tailwind Styles
const Span = tw.span`text-[13px] text-[#10101266]`

export default DatRangePickerAndOthers
