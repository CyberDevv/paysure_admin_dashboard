import React from 'react'
import axios from 'axios'
import tw from 'twin.macro'

import LabelInput from '../InputLabel'
import { LeftArrow } from '../SVGIcons'
import { AuthButton } from '../MUIComponents'
import Layout from '../layouts/auth_layout/index.auth_layout'

const Signupashboard = () => {
  // useState hook
  const [emailEntered, setEmailEntered] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmpassword, setConfirmPassword] = React.useState('')

  // Functions
  const handleContinue = () => {
    setEmailEntered(true)
  }

  const handleBack = () => {
    setEmailEntered(false)
  }

  const handleSignup = async () => {
    try {
      await axios.post('/api/auth/signup', {
        email,
        password,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSetPassword = e => {
    setPassword(e.target.value)
  }

  const handleSetConfirmPassword = e => {
    setConfirmPassword(e.target.value)
  }

  const handleSetEmail = e => {
    setEmail(e.target.value)
  }

  return (
    <>
      {!emailEntered ? (
        <Layout title="Enter your email">
          <Form>
            <LabelInput
              label="Enter your email"
              type="email"
              placeholder="staff@example.com"
              value={email}
              onChange={handleSetEmail}
            />

            <div>
              <AuthButton onClick={handleContinue} label="Continue" />
            </div>
          </Form>
        </Layout>
      ) : (
        // Create password
        <Layout
          title="Create your password"
          icon={<LeftArrow />}
          onClick={handleBack}
        >
          <Form>
            <LabelInput
              label="Create password"
              type="password"
              placeholder="password"
              value={password}
              onChange={handleSetPassword}
            />

            <LabelInput
              label="Confirm password"
              type="password"
              placeholder="confirm password"
              value={confirmpassword}
              onChange={handleSetConfirmPassword}
            />

            <div>
              <AuthButton label="Confirm password" onClick={handleSignup} />
            </div>
          </Form>
        </Layout>
      )}
    </>
  )
}

// tailwind styles
const Form = tw.form`mt-[50px] space-y-5`

export default Signupashboard
