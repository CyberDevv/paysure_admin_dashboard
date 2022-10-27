import React from 'react'
import tw from 'twin.macro'

const WideOverViewCard = ({ label, amount, active, inactive }) => {
  return (
    <div tw="flex items-center bg-blue-light border border-border rounded-lg transition-colors p-4 pl-6 xl:(p-6 pl-8)">
      <div tw="w-1/3">
        <h1
          tw="text-2xl mt-1 sm:text-3xl lg:text-3xl xl:text-[33px] text-[#191716]"
          css={[active ? tw`mt-3` : tw`mt-8`]}
          className="font-bold"
        >
          {amount}
        </h1>
        <p tw="truncate text-sm text-paysure-50 mt-2 lg:(text-base mt-3)">
          {label}
        </p>
      </div>

      <div tw="w-2/3 bg-white flex px-6 py-7 rounded divide-x-2 divide-[#EBF2FA]">
        <h6 tw="font-semibold text-2xl tracking-[-0.05em] pr-6">
          {active}{' '}
          <span tw="text-paysure-success-100 text-sm tracking-normal leading-[24px]">
            Active
          </span>
        </h6>
        <h6 tw="font-semibold text-2xl tracking-[-0.05em] pl-6">
          {inactive}{' '}
          <span tw="text-paysure-danger-100 text-sm tracking-normal leading-[24px]">
            Active
          </span>
        </h6>
      </div>
    </div>
  )
}

export default WideOverViewCard
