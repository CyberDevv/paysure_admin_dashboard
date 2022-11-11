import Link from 'next/link'
import Proptypes from 'prop-types'
import React from 'react'
import tw from 'twin.macro'

// Tailwind Styles
const Wrapper = tw.div`border border-border rounded-lg p-4 min-w-[130px] lg:(py-6 px-8 min-w-[235px])`
const H1 = tw.h1`text-dark text-xl sm:text-2xl lg:text-[28px] xl:(text-[32px])`
const P = tw.p`text-paysure-50 text-sm mt-1.5 lg:(text-base mt-3)`
const OverviewCardTemp = ({ amount, label, onClick, subAmount }) => {
  return (
    <>
      {onClick && (
        <Wrapper tw="hover:(bg-gray-100 transition-colors duration-300)">
          <Link href={onClick}>
            <a>
              <H1 className="font-bold">
                {amount}{' '}
                {subAmount && (
                  <span tw="lg:text-lg md:text-base sm:text-sm text-xs xl:text-xl xl:leading-[23.87px] tracking-[-0.05em] text-[#425D8A]">
                    ({subAmount})
                  </span>
                )}
              </H1>
              <P>{label}</P>
            </a>
          </Link>
        </Wrapper>
      )}

      {!onClick && (
        <Wrapper>
          <H1 className="font-bold">
            {amount}{' '}
            {subAmount && (
              <span tw="lg:text-lg md:text-base sm:text-sm text-xs xl:text-xl xl:leading-[23.87px] tracking-[-0.05em] text-[#425D8A]">
                ({subAmount})
              </span>
            )}
          </H1>
          <P>{label}</P>
        </Wrapper>
      )}
    </>
  )
}

// proptypes
OverviewCardTemp.prototype = {
  amount: Proptypes.number.isRequired,
  label: Proptypes.string.isRequired,
}

export default OverviewCardTemp
