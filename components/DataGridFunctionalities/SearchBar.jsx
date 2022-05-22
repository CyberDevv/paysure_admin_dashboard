import tw from 'twin.macro'
import React from 'react'
import { useRouter } from 'next/router'
import { Button, InputAdornment, TextField } from '@mui/material'

import { Search } from '../SVGIcons'

const SearchBar = ({ value }) => {
  const router = useRouter()

  const [searchValue, setSearchValue] = React.useState('')

  React.useEffect(() => {
    if (value) {
      setSearchValue(value)
    }
  }, [value])

  // function to handle search
  const handleSearch = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        searchKey: searchValue,
      },
    })
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  // function to handle onchange
  const handleChange = e => {
    setSearchValue(e.target.value)
  }

  return (
    <TextField
      id="outlined-start-adornment"
      size="small"
      fullWidth
      value={searchValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      sx={{
        fontSize: '13px',
        minWidth: {
          xs: '200px',
          lg: '256px',
        },
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
            <Button sx={{ minWidth: 0 }} onClick={handleSearch}>
              <Search />
            </Button>
          </InputAdornment>
        ),
      }}
    />
  )
}

// Tailwind Styles
const Span = tw.span`text-[13px] text-[#10101266]`

export default SearchBar
