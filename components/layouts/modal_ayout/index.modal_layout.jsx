import tw from 'twin.macro'
import React from 'react'
import { Button, Dialog, Divider } from '@mui/material'

import { Close } from '../../SVGIcons'

const index_modal_layout = ({
  title,
  buttonLabel,
  state,
  children,
  onClose,
}) => {
  return (
    <Dialog
      onClose={onClose}
      open={state}
      sx={{ '& .MuiDialog-paper': { borderRadius: '20px' } }}
    >
      <InnerDialog>
        <DialogTitle className="font-500">
          {title}
          <IconWrapper onClick={onClose}>
            <Close />
          </IconWrapper>
        </DialogTitle>

        <Divider sx={{ marginTop: '20px', borderColor: '#E4ECF7' }} />

        <Form>
          {children}

          <Divider
            sx={{
              borderColor: '#E4ECF7',
              marginTop: '40px',
              marginBottom: '24px',
            }}
          />

          <ModalButton className="font-500">{buttonLabel}</ModalButton>
        </Form>
      </InnerDialog>
    </Dialog>
  )
}

// Tailwind styles
const InnerDialog = tw.div`py-5 overflow-hidden w-[400px]`
const DialogTitle = tw.h5`px-8 text-base text-paysure-text-100 text-center`
const Form = tw.form`px-8 py-4`
const Label = tw.label`text-[13px] text-[#454D54]`
const Input = tw.input`text-[13px] border border-[#E3E5E8] text-[#454D54] p-3.5 rounded w-full mt-2 focus:(outline-none ring-1 ring-border)`
const ModalButton = tw(
  Button,
)`normal-case bg-paysure-100 text-white w-full py-5 rounded-xl text-sm hover:(bg-paysure-100 shadow-xl)`
const IconWrapper = tw.button`absolute right-5 top-3.5 text-[#425D8A] hover:(text-red-700) transition-colors cursor-pointer stroke-current`

export default index_modal_layout
