// imports
import React from 'react'
import Head from 'next/head'

import { SettingsDashboard } from '../components'

// Page init
const Settings = () => {
  return (
    <>
      <Head>
        <title>Settings | Paysure</title>
      </Head>

      <SettingsDashboard />
    </>
  )
}

// Page export
export default Settings
