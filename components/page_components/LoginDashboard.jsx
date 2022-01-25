import React from 'react'
import tw from 'twin.macro'

import LabelInput from '../InputLabel'
import { AuthButton } from '../MUIComponents'
import Layout from '../layouts/auth_layout/index.auth_layout'

const LoginDashboard = () => {
  return (
    <Layout title="Login to your dashboard" login>
      <Form>
        <LabelInput
          label="LoginId"
          type="text"
          placeholder="staff@example.com"
        />

        <LabelInput label="Password" type="password" placeholder="password" />

        <div>
          <AuthButton label="Login to dashboard" />
        </div>
      </Form>
    </Layout>
  )
}

// tailwind styles
const Form = tw.form`mt-[50px] space-y-5`

export default LoginDashboard
