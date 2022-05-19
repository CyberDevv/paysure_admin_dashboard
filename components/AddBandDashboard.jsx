import React from 'react'
import tw from 'twin.macro'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

import { AddSVG } from './SVGIcons'
import Label from './layouts/modal_ayout/LabelInput.main_layout'

const AddBandDashboard = ({ setShowAddPanel }) => {
  // useState hook
  const [title, setTitle] = React.useState('')
  const [charge, setChargeType] = React.useState('')
  const [paysureRate, setPaysureRate] = React.useState('')
  const [agentRate, setAgentRate] = React.useState('')
  const [nibbs, setNibbs] = React.useState('')
  const [chargeRate, setChargeRate] = React.useState('')
  const [superAgentRate, setSuperAgentRate] = React.useState('')

  // functions
  const handleBandSave = () => {
    setShowAddPanel(false)
  }

  return (
    <main>
      <header css={[tw`flex justify-between items-center`]}>
        <Ttile className="font-500">
          Add Band
          <TitleSpan>Create a settlement band</TitleSpan>
        </Ttile>

        {/* Buttons */}
        <div>
          <Button sx={tw`normal-case text-paysure-100 mr-5`}>
            Evaluate band
          </Button>

          <MUIButton onClick={handleBandSave}>Save</MUIButton>
        </div>
      </header>

      {/* fields */}
      <Form>
        <Label
          label="Title"
          type="text"
          placeholder="Percentage Plan 1"
          value={title}
          setState={setTitle}
        />
        <Label
          combo
          menuItems={['Percentage', 'Flat']}
          label="Charge Type"
          value={charge}
          setState={setChargeType}
        />
        <Label
          value={nibbs}
          label="Nibbs (%)"
          type="text"
          placeholder="0"
          setState={setNibbs}
        />
        <Label
          label="Charge Rate"
          type="text"
          placeholder="0"
          value={chargeRate}
          setState={setChargeRate}
        />
        <Label
          label="Paysure Rate"
          type="text"
          placeholder="50"
          value={paysureRate}
          setState={setPaysureRate}
        />
        <Label
          label="Super Agent Rate"
          type="text"
          placeholder="0"
          value={superAgentRate}
          setState={setSuperAgentRate}
        />
        <Label
          label="Agent Rate"
          type="text"
          placeholder="0"
          value={agentRate}
          setState={setAgentRate}
        />
      </Form>

      {/* fields2 */}
      <div css={[tw`mt-10`]}>
        {/* header */}
        <div css={[tw`flex items-center justify-between`]}>
          <Ttile css={[tw`mt-0`]} className="font-500">
            Add a sub plan
          </Ttile>

          <Button startIcon={<AddSVG />} sx={tw`normal-case text-paysure-100`}>
            Add field
          </Button>
        </div>

        {/* form */}
        <div css={[tw`space-y-6 mt-6`]}>
          <Label
            combo
            menuItems={menuItems}
            value={charge}
            setState={setChargeType}
          />
          <Label
            combo
            menuItems={menuItems}
            value={charge}
            setState={setChargeType}
          />
        </div>
      </div>
    </main>
  )
}

const menuItems = ['All', 'Active', 'Inactive']

// Tailwind Styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.025em] text-lg mt-4 lg:(text-[20px] mt-8)`
const Form = tw.form`mt-10 grid grid-cols-2 gap-x-14 gap-y-6`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 px-10 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`
const TitleSpan = tw.span`block text-light-dark text-sm font-normal mt-1.5 tracking-normal lg:(mt-3 text-base)`

// proptypes
AddBandDashboard.propTypes = {
  setShowAddPanel: PropTypes.func.isRequired,
}

export default AddBandDashboard
