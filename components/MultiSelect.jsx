import {
  Box,
  Chip,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'
import * as React from 'react'
import tw from 'twin.macro'

export default function MultipleSelectChip({
  menuItems,
  label,
  value,
  setState,
}) {
  const handleChange = event => {
    const {
      target: { value },
    } = event
    setState(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <div>
      <label tw="text-[13px] text-[#454D54]">
        {label}
        <FormControl tw="mt-2" fullWidth>
          <Select
            multiple
            value={value}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selected.map(value => (
                  <Chip
                    key={value}
                    label={value}
                    tw="px-2 py-1 text-[#425D8A] text-sm leading-[14.32] tracking-[-0.02em] rounded"
                  />
                ))}
              </Box>
            )}
            sx={{
              '&  .MuiOutlinedInput-input': {
                padding: '10px',
                fontSize: '13px',
                color: '#454D54',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E3E5E8',
              },
            }}
          >
            {menuItems.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </label>
    </div>
  )
}
