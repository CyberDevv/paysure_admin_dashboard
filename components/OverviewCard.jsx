import React from 'react'
import tw from 'twin.macro'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

import { OverViewCard } from '.'

const OverviewCardSection = ({ title, data, btnLabel }) => {
  return (
    <Wrapper>
      <div tw="flex items-center justify-between">
        <Title className="font-500">{title}</Title>

        {btnLabel && (
          <Button tw="normal-case text-paysure-100 text-base tracking-[-0.02em]">
            {btnLabel}
          </Button>
        )}
      </div>

      <div>
        <Div>
          {data.map(({ amount, label }, index) => {
            return <OverViewCard key={index} amount={amount} label={label} />
          })}
        </Div>
      </div>
    </Wrapper>
  )
}

OverviewCardSection.prototype = {
  tilte: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  btnLabel: PropTypes.string,
}

// Tailwind Styles
const Wrapper = tw.div`mt-10`
const Title = tw.h3`tracking-[-0.02em] text-gray-dark`
const Div = tw.div`grid grid-cols-2 gap-3 mt-5 rounded-lg lg:(gap-5 grid-cols-4)`

export default OverviewCardSection
