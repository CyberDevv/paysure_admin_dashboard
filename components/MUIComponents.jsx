import React from 'react'
import tw from 'twin.macro'
import { Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'

export const AuthButton = ({ label, onClick, loading }) => {
  return (
    <MUIButton fullWidth onClick={onClick} loading={loading}>
      {label}
    </MUIButton>
  )
}

// Tailwind styles
const MUIButton = tw(
  LoadingButton,
)`bg-white normal-case py-3 text-purple-dark text-sm mt-5 hover:(bg-gray-100 rounded)`
