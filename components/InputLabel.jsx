import React from 'react'
import tw from 'twin.macro'

const InputLabel = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div>
      <Label>
        {label}
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </Label>
    </div>
  )
}

// Tailwind styles
const Label = tw.label`text-[#E9F4FB] text-[13px]`
const Input = tw.input`block bg-purple-deep text-[#E9F4FB] text-[13px] px-3 py-3.5 w-full rounded mt-2 focus:(outline-none ring-4 ring-purple-900)`

export default InputLabel
