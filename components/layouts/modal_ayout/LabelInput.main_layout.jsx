import React from 'react'
import tw from 'twin.macro'

const LabelInput_main_layout = ({
  label,
  placeholder,
  onChange,
  value,
  type,
}) => {
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
const Label = tw.label`text-[13px] text-[#454D54]`
const Input = tw.input`text-[13px] border border-[#E3E5E8] text-[#454D54] p-2.5 rounded w-full mt-1.5 focus:(outline-none ring-1 ring-border)`

export default LabelInput_main_layout
