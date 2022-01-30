import React from 'react'
import axios from 'axios'
import tw from 'twin.macro'

import LabelInput from '../InputLabel'
import { AuthButton } from '../MUIComponents'
import Layout from '../layouts/auth_layout/index.auth_layout'

const LoginDashboard = () => {
  // useState hooks
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Functions
  const handleLogin = React.useCallback(async () => {
    try {
      await axios.post('/api/auth/login', {
        email,
        password,
      })
    } catch (error) {
      console.log(error)
    }
  })

  const handleSetPassword = React.useCallback(e => {
    setPassword(e.target.value)
  })

  const handleSetEmail = React.useCallback(e => {
    setEmail(e.target.value)
  })

  return (
    <Layout title="Login to your dashboard" login>
      <Form>
        <LabelInput
          label="LoginId"
          type="text"
          placeholder="staff@example.com"
          value={email}
          onChange={handleSetEmail}
        />

        <LabelInput
          label="Password"
          type="password"
          placeholder="password"
          value={password}
          onChange={handleSetPassword}
        />

        <div>
          <AuthButton onClick={handleLogin} label="Login to dashboard" />
        </div>
      </Form>
    </Layout>
  )
}

// tailwind styles
const Form = tw.form`mt-[50px] space-y-5`

export default LoginDashboard
