import React from 'react'
import tw from 'twin.macro'

import { OverViewCard } from '.'

const OverviewCardSection = ({ title, data }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>

      <div
        className="scrollHidden"
        css={[tw`overflow-x-scroll lg:(overflow-x-hidden)`]}
      >
        <Div>
          {data.map(({ amount, label }, index) => {
            return <OverViewCard key={index} amount={amount} label={label} />
          })}
        </Div>
      </div>
    </Wrapper>
  )
}

// Tailwind Styles
const Wrapper = tw.div`mt-10`
const Title = tw.h3`tracking-[-0.02em] text-gray-dark`
const Div = tw.div`grid grid-cols-4 gap-2.5 mt-5 min-w-[720px] rounded-lg overflow-hidden lg:(gap-5)`

export default OverviewCardSection
