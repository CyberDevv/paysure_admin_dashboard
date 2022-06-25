import React from 'react'
import axios from 'axios'
import tw from 'twin.macro'
import Router from 'next/router'
import { setCookie } from 'nookies'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import LabelInput from '../InputLabel'
import { AuthButton } from '../MUIComponents'
import { login } from '../../features/userSlice'
import Layout from '../layouts/auth_layout/index.auth_layout'

const LoginDashboard = () => {
  // useState hooks
  const [userName, setUserName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  // useDispatch hooks
  const dispatch = useDispatch()

  // Functions
  const handleLogin = async () => {
    setLoading(true)
    await axios
      .post('/api/auth/login', {
        userName,
        password,
      })
      .then(res => {
        if (!res.data.data) {
          console.log(res)
          console.log(res.data)

          toast.error('Please refresh the page and try again.')
          setLoading(false)
          return
        }

        // checks if the user is an admin
        if (res.data.data.userRole !== 1) {
          toast.error('You are not an admin')
          setLoading(false)
          return
        }

        dispatch(login(res.data.data))

        // save user data to localStorage
        localStorage.setItem('user', JSON.stringify(res.data.data))

        // save user jwt to cookie
        setCookie(null, 'USER_AUTHORIZATION', res.data.data.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })

        setLoading(false)

        toast.success('Login Successful')
        Router.push('/')
      })
      .catch(err => {
        setLoading(false)
        if (err.response) {
          toast.error(err.response.data.data)
        }
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
