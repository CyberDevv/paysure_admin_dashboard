// imports
import React from 'react'
import Head from 'next/head'
// import nookies from 'nookies'

import { TerminalsDashboard } from '../../components'
// import { makeEncryptedRequest } from '../../utils/makeEncryptedRequest'

// Page init
const Terminals = () => {
  return (
    <>
      <Head>
        <title>Terminals | Paysure</title>
      </Head>

      <TerminalsDashboard />
    </>
  )
}

// getStaticProps
// export async function getServerSideProps(ctx) {
//   const { USER_AUTHORIZATION } = nookies.get(ctx)

//   const response = await makeEncryptedRequest(
//     { status: 0, fromDate: '2021-01-01 00:00:00', page: '2022-03-31 23:59:59' },
//     '3geepay/api/processor/list-terminal-info',
//     'POST',
//     USER_AUTHORIZATION,
//   )

//   console.log(response)

//   return {
//     props: {
//       // data: response ? response.data : {},
//     },
//   }
// }

// Page export
export default Terminals
