import { Button, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import tw from 'twin.macro'

import { Search } from '../SVGIcons'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import ModalLabel from '../layouts/modal_ayout/LabelInput.main_layout'

const SendEmal = ({ state, setState }) => {
  return (
    <Modal
      title="Send Email"
      state={state}
      setState={setState}
      buttonLabel="Confirm"
      alternate
    >
      {/* Subject */}
      <TextField
        id="outlined-start-adornment"
        size="small"
        sx={{
          width: '100%',
          fontSize: '13px',
          minWidth: '256px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#EBF2FA',
            },
            '&:hover fieldset': {
              borderColor: '#c6c7c9',
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Span>Subject:</Span>
            </InputAdornment>
          ),
        }}
      />
    </Modal>
  )
}

// Tailwind Styles
const CusLabel = tw.label`text-[13px] text-[#454D54]`
const TextArea = tw.textarea`text-[13px] border border-[#E3E5E8] text-[#454D54] p-2.5 rounded w-full mt-1.5 focus:(outline-none ring-1 ring-border)`
const CheckLabel = tw.p`text-[13px] leading-[16px]`
const Span = tw.span`text-[13px] text-[#10101266]`

export default SendEmal
