import React from 'react'
import tw from 'twin.macro'
import Link from 'next/link'

import Layout from '../layouts/main_layout/index.main_layout'
import { DataGridViewTemp, HomeDisplayCard, OverviewCardSection } from '..'

const HomeDashboard = () => {
  return (
    <Layout title="Home">
      <Ttile className="font-bold">
        Welcome to Paysure
        <TitleSpan>
          Manage all transactions and data on the Paysure service
        </TitleSpan>
      </Ttile>

      <HomeDisplayCard data={temporalData} hasIcon />

      <OverviewCardSection title="Agency Overview" data={agencyOveriewData} />

      <OverviewCardSection title="User Overview" data={agencyOveriewData2} />

      <DataGridViewTemp title= "Recent Transactions" />
    </Layout>
  )
}

// FIXME: Temp data (should be replaced with real data)
const temporalData = [
  {
    amount: '240',
    title: 'Total Providers',
  },
  {
    amount: '120',
    title: 'Total Services',
  },
  {
    amount: '30',
    title: 'Total Super Agent',
  },
  {
    amount: '72',
    title: 'Total Agents',
  },
  {
    amount: '534',
    title: 'Total Users',
  },
  {
    amount: '10',
    title: 'Total Organizations',
  },
  {
    amount: '10',
    title: 'Total Admins',
  },
  {
    amount: '32429',
    title: 'Total Paysure Users',
  },
]

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

export default HomeDashboard
