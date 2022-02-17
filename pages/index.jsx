// imports
import axios from 'axios'
import React from 'react'
import Head from 'next/head'
import nookies from 'nookies'

import { HomeDashboard } from '../components'

// Page init
const IndexPage = ({ data }) => {
  return (
    <>
      <Head>
        <title>Home | Paysure</title>
      </Head>

      <HomeDashboard dashboardStats={data} />
    </>
  )
}

// getStaticProps
export async function getServerSideProps(ctx) {
  const { USER_AUTHORIZATION } = nookies.get(ctx)

  const toBeEncryptedData = {
    key: process.env.KEY,
    iv: process.env.IV,
    toJibrish: JSON.stringify({}),
  }
  const REQ_HEADER = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: process.env.AUTHORIZATION,
      USER_AUTHORIZATION: USER_AUTHORIZATION,
    },
  }

  let data = {
    totalAgentsCount: 0,
    totalSubscribersCount: 0,
  }

  await axios
    .post(
      'https://core.paysure365.com:8443/paysure/api/auth/encrypt',
      toBeEncryptedData,
      REQ_HEADER,
    )
    .then(async res => {
      await axios
        .post(
          'https://core.paysure365.com:8443/paysure/api/processor/dashboard-stats',
          JSON.stringify(res.data.toJibrish),
          REQ_HEADER,
        )
        .then(response => {
          // setErrorMsg(null)
          data = response.data
          // nextTab()
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response.data.errorDesc)
          }
        })
    })
    .catch(err => {
      console.log(err)
    })

  const processedData = stripData(data)

  return {
    props: {
      data: processedData || {},
    },
  }
}

function stripData(data) {
  return {
    totalAgentsCount: data.totalAgentsCount,
    totalSubscribersCount: data.totalSubscribersCount,
  }
}

// Page export
export default IndexPage
