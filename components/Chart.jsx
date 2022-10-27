import { MenuItem, Select } from '@mui/material'
import React from 'react'
import tw from 'twin.macro'
import Graph from './LineGraph'

const Chart = ({ title }) => {
  const [duration, setDuration] = React.useState('Last Year')

  const handleChange = event => {
    setDuration(event.target.value)
  }

  return (
    <div tw="border border-[#EBF2FA] rounded-lg p-4 lg:(p-6 rounded-xl)">
      <div tw="flex">
        <div tw="w-full">
          <h6 tw="text-[#A2A2B9] text-sm leading-[21px] tracking-[-0.03em]">
            {title}
          </h6>
          <h4 tw="font-semibold text-2xl tracking-[-0.06em] mt-1.5">
            N342k
            <span tw="text-sm text-[#A2A2B9] ml-3 tracking-normal leading-[24px]">
              <span tw="text-paysure-success-100">73%</span> vs Last year
            </span>
          </h4>
        </div>

        <Select
          value={duration}
          onChange={handleChange}
          size="small"
          sx={{
            color: '#425D8A',
            bgcolor: '#EBF2FA',
            '& .MuiOutlinedInput-notchedOutline': {
              border: '0px',
            },
            '& .MuiSelect-select': {
              paddingX: '12px',
              paddingY: '8px',
            },
          }}
        >
          <MenuItem value={'Last Year'}>Last Year</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </div>

      <Graph label= {title} />
    </div>
  )
}

export default Chart
