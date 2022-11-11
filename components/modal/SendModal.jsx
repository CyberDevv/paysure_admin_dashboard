import React from 'react'
import tw from 'twin.macro'
import 'react-quill/dist/quill.snow.css'
import { InputAdornment, TextField } from '@mui/material'

import Modal from './ModalLayout'
import { TaggedTextfield } from '..'
import TextEditor from '../TextEditor'

const SendModal = ({ state, setState, title, onClick }) => {
  const [message, setMessage] = React.useState('')
  const [selectedItem, setSelectedItem] = React.useState([])

  return (
    <Modal
      title={title}
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
      <TextEditor onClick={onClick} />
    </Modal>
  )
}

// Tailwind Styles
const Span = tw.span`text-[13px] text-[#10101266]`

export default SendModal
