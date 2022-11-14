import moment from 'moment'
import Router from 'next/router'
import React from 'react'
import tw from 'twin.macro'

import { Tooltip } from '@mui/material'
import Head from 'next/head'
import { DataGridViewTemp, HomeMetricCard } from '.'
import numberFormatter from '../utils/numberFormatter'
import { Print, ViewActionSVG } from './SVGIcons'
import { SignupsColumn } from './Columns'

const SuperAgentSignupsDashboard = ({ signupsList = [] }) => {
  const { superAgentsInfo = [] } = signupsList

  const overviewDataArray = [
    {
      amount: numberFormatter(signupsList[0].newlyAdded),
      title: 'New',
    },
    {
      amount: numberFormatter(signupsList[0].approved),
      title: 'Approved',
    },
    {
      amount: numberFormatter(signupsList[0].rejected),
      title: 'Rejected',
    },
    {
      amount: numberFormatter(signupsList[0].pending),
      title: 'Pending',
    },
  ]

  // DataGrid rows
  let rows =
    signupsList[1].length > 0
      ? signupsList[1].map((item, index) => {
          return {
            id: index,
            col1: index + 1,
            fullName: item.fullName,
            email: item.email,
            bvn: item.bvn,
            businessName: item.businessName,
            businessAddress: item.businessAddress,
            dateAdded: item.dateAdded,
            status: item.status,
            document: item.document,
            actions: '',
          }
        })
      : []

  return (
    <>
      <Head>
        <title>New Cluster Managers | Paysure</title>
      </Head>

      <Ttile className="font-bold">Cluster Managers</Ttile>

      <div tw="grid mt-10 grid-cols-2 gap-3 md:grid-cols-3 lg:(grid-cols-4 gap-5)">
        {overviewDataArray.map((item, index) => (
          <HomeMetricCard.PlainCard
            key={index}
            amount={item.amount}
            title={item.title}
          />
        ))}
      </div>

      <DataGridViewTemp
        limited
        link="/agents/super_agents_list"
        title="List of New signups"
        rows={rows}
        columns={SignupsColumn}
      />
    </>
  )
}

// Tailwind Styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`

export default SuperAgentSignupsDashboard