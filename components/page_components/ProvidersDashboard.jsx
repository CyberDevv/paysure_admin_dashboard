import React from 'react'
import tw from 'twin.macro'
import Link from 'next/link'
import { Button } from '@mui/material'

import { Add } from '../SVGIcons'
import Layout from '../layouts/main_layout/index.main_layout'
import { DataGridViewTemp, HomeDisplayCard, OverviewCardSection } from '..'

const ProvidersDashboard = () => {
  return (
    <Layout title="Providers">
      <div css={[tw`flex justify-between items-center`]}>
        <Ttile className="font-bold">
          Providers
          <TitleSpan>Manage all providers available on Paysure</TitleSpan>
        </Ttile>

        <MUIButton startIcon={<Add />}>Add Terminal</MUIButton>
      </div>

      <HomeDisplayCard data={temporalData} />

      <OverviewCardSection title="Metrics" data={agencyOveriewData} />

      {/* <DataGridViewTemp title= "Providers" /> */}
    </Layout>
  )
}

// FIXME: Temp data (should be replaced with real data)
const temporalData = [
  {
    amount: '14',
    title: 'Total Providers',
  },
  {
    amount: '13',
    title: 'Total Services',
  },
  {
    amount: '13',
    title: 'Total Transactions',
  },
  {
    amount: '13',
    title: 'Total Charges',
  },
]

// FIXME: Temp data (should be replaced with real data)
const agencyOveriewData = [
  {
    amount: 93032434,
    label: 'All Transaction',
  },
  {
    amount: 289383,
    label: 'Data',
  },
  {
    amount: 70000,
    label: 'Transfer',
  },
  {
    amount: 700000,
    label: 'Transfer',
  },
]

const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:(text-[32px])`
const TitleSpan = tw.span`block text-light-dark text-sm font-normal mt-1.5 tracking-normal lg:(mt-3 text-base)`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 pl-3.5 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`

export default ProvidersDashboard
