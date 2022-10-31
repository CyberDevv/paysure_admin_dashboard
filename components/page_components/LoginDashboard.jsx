import axios from 'axios'
import Router from 'next/router'
import { setCookie } from 'nookies'
import React from 'react'
import { toast } from 'react-toastify'
import tw from 'twin.macro'

import LabelInput from '../InputLabel'
import Layout from '../layouts/auth_layout/index.auth_layout'
import { AuthButton } from '../MUIComponents'

const LoginDashboard = () => {
  // useState hooks
  const [userName, setUserName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  // Functions
  const handleLogin = () => {
    setLoading(true)

    axios
      .post('/api/auth/login', {
        userName,
        password,
      })
      .then(res => {
        // console.log('Response from client >>>>', res)

        // save user token to cookie
        setCookie(null, 'USER_TOKEN', res.data.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })

        setLoading(false)

        toast.success('Redirecting...')

        Router.push('/')
      })
      .catch(err => {
        // console.log('Error from client >>>>', err.response)

        setLoading(false)

        toast.error(err.response.data.message)
      })
  }

  const handleSetPassword = e => {
    setPassword(e.target.value)
  }

  const handleSetEmail = e => {
    setUserName(e.target.value)
  }

  return (
    <Layout title="Login to your dashboard" login>
      <Form>
        <LabelInput
          label="Username"
          type="text"
          placeholder="staff@example.com"
          value={userName}
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
          <AuthButton
            loading={loading}
            onClick={handleLogin}
            label="Login to dashboard"
          />
        </div>
      </Form>
    </Layout>
  )
}

// tailwind styles
const Form = tw.form`mt-[50px] space-y-5`

export default LoginDashboard
