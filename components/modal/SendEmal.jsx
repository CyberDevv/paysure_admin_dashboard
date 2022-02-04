import React from 'react'
import tw from 'twin.macro'
import 'react-quill/dist/quill.snow.css'
import { InputAdornment, TextField } from '@mui/material'

import { TaggedTextfield } from '..'
import TextEditor from '../TextEditor'
import Modal from '../modal/ModalLayout'

const SendEmal = ({ state, setState }) => {
  const [message, setMessage] = React.useState('')
  const [selectedItem, setSelectedItem] = React.useState(['kdkkdkd'])

  return (
    <Modal
      title="Send Email"
      state={state}
      setState={setState}
      buttonLabel="Confirm"
      alternate
    >
      {/* send to */}
      <TaggedTextfield
        fullWidth
        // selectedTags={handleSelecetedTags}
        id="tags"
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      {/* Subject */}
      <TextField
        // size="small"
        sx={{
          width: '100%',
          fontSize: '13px',
          borderRadius: '4px',
          minWidth: '256px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#EBF2FA',
              borderRadius: '8px',
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

      {/* Text editor */}
      <TextEditor />
    </Modal>
  )
}

// Tailwind Styles
const Span = tw.span`text-[13px] text-[#10101266]`

export default SendEmal
