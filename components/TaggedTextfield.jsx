import Downshift from 'downshift'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import { Chip, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { padding } from '@mui/system'
import tw from 'twin.macro'
import { DeleteSVG } from './SVGIcons'

const useStyles = makeStyles(() => ({
  chip: {
    margin: '0.5rem 0.25rem',
  },
}))

const TaggedTextfield = ({ ...props }) => {
  const classes = useStyles()
  const {
    selectedTags,
    selectedItem,
    setSelectedItem,
    placeholder,
    tags,
    ...other
  } = props

  const [inputValue, setInputValue] = useState('')
  // const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    setSelectedItem(tags)
  }, [setSelectedItem, tags])

  // useEffect(() => {
  //    selectedTags(selectedItem);
  // }, [selectedItem, selectedTags]);

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      const newSelectedItem = [...selectedItem]
      const duplicatedValues = newSelectedItem.indexOf(
        event.target.value.trim(),
      )

      if (duplicatedValues !== -1) {
        setInputValue('')
        return
      }
      if (!event.target.value.replace(/\s/g, '').length) return

      newSelectedItem.push(event.target.value.trim())
      setSelectedItem(newSelectedItem)
      setInputValue('')
    }
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === 'Backspace'
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1))
    }
  }

  function handleChange(item) {
    let newSelectedItem = [...selectedItem]
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item]
    }
    setInputValue('')
    setSelectedItem(newSelectedItem)
  }

  const handleDelete = item => () => {
    const newSelectedItem = [...selectedItem]
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1)
    setSelectedItem(newSelectedItem)
  }

  function handleInputChange(event) {
    setInputValue(event.target.value)
  }

  return (
    <>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={handleChange}
        selectedItem={selectedItem}
      >
        {({ getInputProps }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder,
          })
          return (
            <div>
              <TextField
                sx={{
                  padding: 0,
                  width: '100%',
                  fontSize: '13px',
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
                      <Span tw="mr-1">Send to:</Span>

                      {selectedItem.map(item => (
                        <Chip
                          key={item}
                          tabIndex={-1}
                          label={item}
                          className={classes.chip}
                          deleteIcon={<DeleteSVG />}
                          onDelete={handleDelete(item)}
                          tw="p-1 rounded bg-paysure-10 space-x-1 text-paysure-text-100"
                        />
                      ))}
                    </InputAdornment>
                  ),
                  onBlur,
                  onChange: event => {
                    handleInputChange(event)
                    onChange(event)
                  },
                  onFocus,
                }}
                {...other}
                {...inputProps}
              />
            </div>
          )
        }}
      </Downshift>
    </>
  )
}

TaggedTextfield.defaultProps = {
  tags: [],
}

TaggedTextfield.propTypes = {
  selectedTags: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
}

// Tailwind styles
const Span = tw.span`text-[13px] text-[#10101266]`

export default TaggedTextfield
