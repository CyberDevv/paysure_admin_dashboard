import React from 'react'
import tw from 'twin.macro'

import { HomeDisplayCard, OverviewCard } from '..'
import Layout from '../layouts/main_layout/index.main_layout'

const HomeDashboard = () => {
  return (
    <Layout title="Home">
      <Ttile>
        Welcome to Paysure
        <TitleSpan>
          Manage all transactions and data on the Paysure service
        </TitleSpan>
      </Ttile>

      <HomeDisplayCard />

      <OverviewCard />
    </Layout>
  )
}

const Ttile = tw.h1`text-gray-dark font-bold tracking-[-0.05em] text-2xl lg:(text-[32px])`
const TitleSpan = tw.span`block text-light-dark text-sm font-normal mt-1.5 tracking-normal lg:(mt-3 text-base)`

export default HomeDashboard
