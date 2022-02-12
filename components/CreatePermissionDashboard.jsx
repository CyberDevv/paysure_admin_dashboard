import React from 'react'
import tw from 'twin.macro'
import PropTypes from 'prop-types'
import { Checkbox } from '@mui/material'
import { styled } from '@mui/material/styles'

const CreatePermissionDashboard = ({ setShowAddPanel }) => {
  // functions
  const handleGoBack = React.useCallback(() => {
    setShowAddPanel(false)
  })

  return (
    <div>
      <Button onClick={handleGoBack}>Back</Button>

      <Ttile>Create Permissions</Ttile>

      {/* fields */}
      <Form>
        <Label>
          Title
          <Input type="text" placeholder="Adminstrator" />
        </Label>

        <div css={[tw`flex justify-between items-center w-full space-x-4`]}>
          <CheckboxWrapper>
            <Checkbox color="error" />

            <P>Allow all permissions</P>
          </CheckboxWrapper>

          {/* Save button */}
          <MUIButton>Save</MUIButton>
        </div>
      </Form>

      {/* Grid */}
      <div tw="overflow-x-scroll">
        <GridWrapper>
          {/* header */}
          <GridHeader>
            <HeaderText>Feature</HeaderText>
            <HeaderTextOther>View</HeaderTextOther>
            <HeaderTextOther>Update</HeaderTextOther>
            <HeaderTextOther>Delete</HeaderTextOther>
            <HeaderTextOther>Create</HeaderTextOther>
            <HeaderTextOther>List</HeaderTextOther>
            <HeaderTextOther>Print</HeaderTextOther>
            <HeaderTextOther>Add</HeaderTextOther>
            <HeaderTextOther>Attach</HeaderTextOther>
          </GridHeader>

          {/* body */}
          <div>
            {/* Transaction */}
            <Grid>
              <HeaderText>Transactions</HeaderText>
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
            </Grid>

            {/* Providers */}
            <Grid>
              <HeaderText>Providers</HeaderText>
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
            </Grid>

            {/* Organizations */}
            <Grid>
              <HeaderText>Organizations</HeaderText>
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
            </Grid>

            {/* Users */}
            <Grid>
              <HeaderText>Users</HeaderText>
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
            </Grid>

            {/* Super Agents */}
            <Grid>
              <HeaderText>Super Agents</HeaderText>
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
            </Grid>

            {/* Agents */}
            <Grid>
              <HeaderText>Agents</HeaderText>
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
            </Grid>

            {/* Roles */}
            <Grid>
              <HeaderText>Roles</HeaderText>
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
            </Grid>

            {/* Settlements */}
            <Grid>
              <HeaderText>Settlements</HeaderText>
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
            </Grid>

            {/* VAS */}
            <Grid>
              <HeaderText>VAS</HeaderText>
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
              <MUICheckbox />
            </Grid>
          </div>
        </GridWrapper>
      </div>
    </div>
  )
}

const MUICheckbox = styled(Checkbox)`
  ${tw`rounded-none`}
`

// Tailwind Styles
const Button = tw.button`normal-case text-paysure-text-100 text-sm hover:(underline)`
const Ttile = tw.h1`text-gray-dark tracking-[-0.025em] text-lg mt-4 lg:(text-[20px] mt-8)`
const GridWrapper = tw.div`mt-10 min-w-[720px]`
const Grid = tw.div`grid grid-template-columns[2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr] p-4 gap-4`
const GridHeader = tw(Grid)`bg-blue-light`
const HeaderText = tw.p`text-[13px] my-auto`
const HeaderTextOther = tw(HeaderText)`mx-auto`
const Form = tw.form`mt-11 flex flex-col space-y-2 lg:(flex-row space-y-0 items-end)`
const Label = tw.label`text-[13px] text-[#454D54] w-full lg:w-[inherit]`
const Input = tw.input`text-[13px] block border border-border mt-2 px-3.5 py-3 w-full rounded lg:w-[336px] focus:(outline-none ring-2 ring-border2)`
const CheckboxWrapper = tw.div`flex items-center bg-[#FCEAE8] p-[3px] rounded lg:ml-2.5 w-[254px]`
const P = tw.p`text-[13px] text-[#ED6A5A]`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 px-10 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`

// proptypes
CreatePermissionDashboard.propTypes = {
  setShowAddPanel: PropTypes.func.isRequired,
}

export default CreatePermissionDashboard
