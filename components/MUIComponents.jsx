import React from 'react'
import tw from 'twin.macro'
import { Button } from '@mui/material'

export const AuthButton = ({ label }) => {
  return <MUIButton fullWidth>{label}</MUIButton>
}

// Tailwind styles
const MUIButton = tw(
  Button,
)`bg-white normal-case py-3 text-purple-dark text-sm mt-5 hover:(bg-gray-100 rounded)`
