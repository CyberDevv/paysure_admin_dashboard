// imports
import axios from 'axios'
import React from 'react'
import Head from 'next/head'

import { SinglarSuperAgentDashboard } from '../../components'

// Page init
const Agents = () => {
  return (
    <>
      <Head>
        <title>Agents | Paysure</title>
      </Head>

      <SinglarSuperAgentDashboard />
    </>
  )
}

// getStaticProps
// export async function getServerSideProps(ctx) {
//   const { USER_AUTHORIZATION } = nookies.get(ctx)

//   const toBeEncryptedData = {
//     key: process.env.KEY,
//     iv: process.env.IV,
//     toJibrish: JSON.stringify({
//       status: 0,
//       fromDate: '2021-01-01 00:00:00',
//       toDate: '2022-03-31 23:59:59',
//       paramOne: '',
//     }),
//   }
//   const REQ_HEADER = {
//     headers: {
//       'Content-Type': 'application/json; charset=utf-8',
//       Authorization: process.env.AUTHORIZATION,
//       USER_AUTHORIZATION: USER_AUTHORIZATION,
//     },
//   }

//   let data

//   await axios
//     .post(
//       `${process.env.BASE_URL}/paysure/api/auth/encrypt`,
//       toBeEncryptedData,
//       REQ_HEADER,
//     )
//     .then(async res => {
//       await axios
//         .post(
//           `${process.env.BASE_URL}/paysure/api/processor/list-agents-and-subscribers`,
//           JSON.stringify(res.data.toJibrish),
//           REQ_HEADER,
//         )
//         .then(response => {
//           // setErrorMsg(null)
//           data = response.data
//           // nextTab()
//         })
//         .catch(err => {
//           if (err.response) {
//             console.log(err.response.data.errorDesc)
//           }
//         })
//     })
//     .catch(err => {
//       console.log(err)
//     })

//   return {
//     props: {
//       data,
//     },
//   }
// }

// Page export
export default Agents
