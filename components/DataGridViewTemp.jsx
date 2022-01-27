import React from 'react'
import tw from 'twin.macro'
import Link from 'next/link'

import { DataGridView } from '.'

const DataGridViewTemp = ({
  title,
  rows,
  columns,
  children,
  dropdownData = [],
}) => {
  return (
    <div css={[tw`mt-10`]}>
      <div css={[tw`flex items-center justify-between`]}>
        <Title className="font-500">{title}</Title>

        {title && <Link href="/">
          <a css={[tw`text-paysure-100 hover:underline cursor-pointer`]}>
            View all
          </a>
        </Link>}
      </div>
      <DataGridView
        rows={rows}
        columns={columns}
        children={children}
        dropdownData={dropdownData}
      />
    </div>
  )
}

// Tailwind Styles
const Title = tw.h3`tracking-[-0.02em] text-gray-dark`

export default DataGridViewTemp
