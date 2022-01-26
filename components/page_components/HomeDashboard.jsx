import Link from 'next/link'
import React from 'react'
import tw from 'twin.macro'

import { DataGridView, HomeDisplayCard, OverviewCardSection } from '..'
import Layout from '../layouts/main_layout/index.main_layout'

const HomeDashboard = () => {
  return (
    <Layout title="Home">
      <Ttile className="font-bold">
        Welcome to Paysure
        <TitleSpan>
          Manage all transactions and data on the Paysure service
        </TitleSpan>
      </Ttile>

      <HomeDisplayCard />

      <OverviewCardSection title="Agency Overview" data={agencyOveriewData} />

      <OverviewCardSection title="User Overview" data={agencyOveriewData2} />

      <div css={[tw`mt-10`]}>
        <div css={[tw`flex items-center justify-between`]}>
          <Title>Recent transactions</Title>

          <Link href="/">
            <a css={[tw`text-paysure-100 hover:underline cursor-pointer`]}>
              View all
            </a>
          </Link>
        </div>
        <DataGridView />
      </div>
    </Layout>
  )
}

// FIXME: Temp data (should be replaced with real data)
const agencyOveriewData = [
  {
    amount: 55102430,
    label: 'Total Transaction',
  },
  {
    amount: 1350,
    label: 'Completed Transaction',
  },
  {
    amount: 10,
    label: 'Total Failed',
  },
  {
    amount: 20,
    label: 'Total Failed',
  },
]

// FIXME: Temp data (should be replaced with real data)
const agencyOveriewData2 = [
  {
    amount: 102430,
    label: 'Total Users',
  },
  {
    amount: 322321350,
    label: 'Completed Transactions',
  },
  {
    amount: 10,
    label: 'Total Failed',
  },
  {
    amount: 20,
    label: 'Total Failed',
  },
]

const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:(text-[32px])`
const TitleSpan = tw.span`block text-light-dark text-sm font-normal mt-1.5 tracking-normal lg:(mt-3 text-base)`
const Title = tw.h3`tracking-[-0.02em] text-gray-dark`

export default HomeDashboard
