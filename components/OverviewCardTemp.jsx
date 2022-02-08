import React from 'react'
import tw from 'twin.macro'
import Proptypes from 'prop-types'

const OverviewCardTemp = ({ amount, label }) => {
  return (
    <Wrapper>
      <H1 className="font-bold">{amount}</H1>
      <P>{label}</P>
    </Wrapper>
  )
}

// proptypes
OverviewCardTemp.prototype = {
  amount: Proptypes.number.isRequired,
  label: Proptypes.string.isRequired,
}

// Tailwind Styles
const Wrapper = tw.div`border border-border rounded-lg p-4 min-w-[130px] lg:(py-6 px-8 min-w-[265px])`
const H1 = tw.h1`text-dark text-xl lg:(text-[32px])`
const P = tw.p`text-paysure-50 text-sm mt-1.5 lg:(text-base mt-3)`

export default OverviewCardTemp
