import React from 'react'
import tw from 'twin.macro'

import LabelInput from '../InputLabel'
import { AuthButton } from '../MUIComponents'
import Layout from '../layouts/auth_layout/index.auth_layout'
import { LeftArrow } from '../SVGIcons'

const Signupashboard = () => {
  // useState hook
  const [emailEntered, setEmailEntered] = React.useState(false)

  // Functions
  const handleContinue = () => {
    setEmailEntered(true)
  }

  const handleBack = () => {
    setEmailEntered(false)
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
            />

            <LabelInput
              label="Confirm password"
              type="password"
              placeholder="confirm password"
            />

            <div>
              <AuthButton label="Confirm password" />
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
