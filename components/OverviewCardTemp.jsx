import React from 'react'
import tw from 'twin.macro'

const OverviewCardTemp = ({ amount, label }) => {
  return (
    <Wrapper>
      <H1 className="font-bold">{amount}</H1>
      <P>{label}</P>
    </Wrapper>
  )
}

// Tailwind Styles
const Wrapper = tw.div`border border-border rounded-lg p-4 lg:(py-6 px-8)`
const H1 = tw.h1`text-dark text-2xl lg:(text-[32px])`
const P = tw.p`text-paysure-50 text-sm mt-1.5 lg:(text-base mt-3)`

export default OverviewCardTemp
