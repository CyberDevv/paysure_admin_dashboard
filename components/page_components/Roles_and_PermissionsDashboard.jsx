import React from 'react'
import tw from 'twin.macro'
import { Avatar, AvatarGroup, Button, Checkbox } from '@mui/material'

import { AddSquare, UnChecked, Checked } from '../SVGIcons'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import Layout from '../layouts/main_layout/index.main_layout'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'
import Link from 'next/link'

const Roles_and_PermissionsDashboard = ({RandPData}) => {
  // useState hook
  const [isaddModalOpened, setIsAddmodalOpened] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [upperLimit, setUpperLimit] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [administrator, setAdministrator] = React.useState([
    false,
    false,
    false,
  ])
  const [accountAdmin, setAccountAdmin] = React.useState([false, false, false])
  const [accountUser, setAccountUser] = React.useState([false, false, false])


const tempData = RandPData.map((item) => {
  return {
    role: item.roleTitle,
    accounts: item.users,
  }
})
  
  // functions
  const handSetIsAddmodalOpened = () => setIsAddmodalOpened(true)

  const handleSetDescription = e => {
    setDescription(e.target.value)
  }

  // Administrator checboxes function
  const handleAdminstratorChange1 = event => {
    setAdministrator([event.target.checked, administrator[1], administrator[2]])
  }
  const handleAdminstratorChange2 = event => {
    setAdministrator([administrator[0], event.target.checked, administrator[2]])
  }
  const handleAdminstratorChange3 = event => {
    setAdministrator([administrator[0], administrator[1], event.target.checked])
  }

  // Account Admin checboxes function
  const handleAccountAdminChange1 = event => {
    setAccountAdmin([event.target.checked, accountAdmin[1], accountAdmin[2]])
  }
  const handleAccountAdminChange2 = event => {
    setAccountAdmin([accountAdmin[0], event.target.checked, accountAdmin[2]])
  }
  const handleAccountAdminChange3 = event => {
    setAccountAdmin([accountAdmin[0], accountAdmin[1], event.target.checked])
  }

  // Account User checboxes function
  const handleAccountUserChange1 = event => {
    setAccountUser([event.target.checked, accountUser[1], accountUser[2]])
  }
  const handleAccountUserChange2 = event => {
    setAccountUser([accountUser[0], event.target.checked, accountUser[2]])
  }
  const handleAccountUserChange3 = event => {
    setAccountUser([accountUser[0], accountUser[1], event.target.checked])
  }

  // Roles overall checkbox function
  const handleSupportChange = event => {
    setAdministrator([event.target.checked, administrator[1], administrator[2]])

    setAccountAdmin([event.target.checked, accountAdmin[1], accountAdmin[2]])

    setAccountUser([event.target.checked, accountUser[1], accountUser[2]])
  }

  const handleReconciliationChange = event => {
    setAdministrator([administrator[0], event.target.checked, administrator[2]])

    setAccountAdmin([accountAdmin[0], event.target.checked, accountAdmin[2]])

    setAccountUser([accountUser[0], event.target.checked, accountUser[2]])
  }

  const handleUnknownChange = event => {
    setAdministrator([administrator[0], administrator[1], event.target.checked])

    setAccountAdmin([accountAdmin[0], accountAdmin[1], event.target.checked])

    setAccountUser([accountUser[0], accountUser[1], event.target.checked])
  }

  return (
    <Layout title="Roles & Permissions">
      <Ttile className="font-bold">Roles & Permissions</Ttile>

      {/* Cards  */}
      <Grid>
        {tempData.map(({ role, upperLimit, accounts }, index) => {
          return (
            <Link
              key={index}
              href={`/roles_and_permissions/${role.toLocaleLowerCase()}`}
            >
              <a>
                <Card role="button">
                  <OverviewTitle className="font-500">
                    {`${role}`}
                  </OverviewTitle>

                  <Div>
                    <P>{accounts.length} Accounts</P>

                    <AvatarGroup
                      sx={{ flexDirection: 'row', marginTop: '8px' }}
                    >
                      {accounts.map((user, index) => (
                        <Avatar
                          key={index}
                          variant="rounded"
                          alt={user.name}
                          src={user.name}
                          sx={{
                            width: { xs: '18px', lg: '24px' },
                            height: { xs: '18px', lg: '24px' },
                            borderRadius: '5px',
                          }}
                        />
                      ))}
                    </AvatarGroup>
                  </Div>
                </Card>
              </a>
            </Link>
          )
        })}
        <MUIButton variant="outlined" onClick={handSetIsAddmodalOpened}>
          <AddSquare /> Add new role
        </MUIButton>
      </Grid>

      {/* Add role modal */}
      <Modal
        title="Add new Role"
        state={isaddModalOpened}
        setState={setIsAddmodalOpened}
        buttonLabel="Add role"
      >
        <FlexBox>
          <Label
            label="Title"
            type="text"
            placeholder="Account Admin"
            value={title}
            setState={setTitle}
          />
          <Label
            label="Upper Limit"
            type="text"
            placeholder="AAD"
            value={upperLimit}
            setState={setUpperLimit}
          />
        </FlexBox>

        <div>
          <CusLabel>
            Description
            <TextArea
              cols="30"
              rows="5"
              value={description}
              onChange={handleSetDescription}
            />
          </CusLabel>
        </div>
      </Modal>

      {/* Settings */}
      <PermSettins>
        <h4 className="font-500">Permissions</h4>

        <div css={[tw`overflow-x-scroll mt-3 lg:(mt-6 overflow-visible)`]}>
          <SettinsGrid>
            {/* Header */}
            <Table>
              <THeaderInherit className="font-500">Roles</THeaderInherit>
              <THeader className="font-500">
                Support
                <Checkbox
                  checked={
                    administrator[0] && accountAdmin[0] && accountUser[0]
                  }
                  icon={<UnChecked />}
                  checkedIcon={<Checked />}
                  onChange={handleSupportChange}
                />
              </THeader>
              <THeader className="font-500">
                Reconciliation{' '}
                <Checkbox
                  checked={
                    administrator[1] && accountAdmin[1] && accountUser[1]
                  }
                  icon={<UnChecked />}
                  checkedIcon={<Checked />}
                  onChange={handleReconciliationChange}
                />
              </THeader>
              <THeader className="font-500">
                Reconciliation{' '}
                <Checkbox
                  checked={
                    administrator[2] && accountAdmin[2] && accountUser[2]
                  }
                  icon={<UnChecked />}
                  checkedIcon={<Checked />}
                  onChange={handleUnknownChange}
                />
              </THeader>
            </Table>

            {/* Body */}
            <TableBody>
              <Table>
                <TBodyInherit>Administrator</TBodyInherit>
                <TBody>
                  <Checkbox
                    checked={administrator[0]}
                    icon={<UnChecked />}
                    checkedIcon={<Checked />}
                    onChange={handleAdminstratorChange1}
                  />
                </TBody>
                <TBody>
                  <Checkbox
                    checked={administrator[1]}
                    icon={<UnChecked />}
                    checkedIcon={<Checked />}
                    onChange={handleAdminstratorChange2}
                  />
                </TBody>
                <TBody>
                  <Checkbox
                    checked={administrator[2]}
                    icon={<UnChecked />}
                    checkedIcon={<Checked />}
                    onChange={handleAdminstratorChange3}
                  />
                </TBody>
              </Table>

              <Table>
                <TBodyInherit>Account Admin</TBodyInherit>
                <TBody>
                  <Checkbox
                    checked={accountAdmin[0]}
                    icon={<UnChecked />}
                    checkedIcon={<Checked />}
                    onChange={handleAccountAdminChange1}
                  />
                </TBody>
                <TBody>
                  <Checkbox
                    checked={accountAdmin[1]}
                    icon={<UnChecked />}
                    checkedIcon={<Checked />}
                    onChange={handleAccountAdminChange2}
                  />
                </TBody>
                <TBody>
                  <Checkbox
                    checked={accountAdmin[2]}
                    icon={<UnChecked />}
                    checkedIcon={<Checked />}
                    onChange={handleAccountAdminChange3}
                  />
                </TBody>
              </Table>

              <Table>
                <TBodyInherit>Account User</TBodyInherit>
                <TBody>
                  <Checkbox
                    checked={accountUser[0]}
                    icon={<UnChecked />}
                    checkedIcon={<Checked />}
                    onChange={handleAccountUserChange1}
                  />
                </TBody>
                <TBody>
                  <Checkbox
                    checked={accountUser[1]}
                    icon={<UnChecked />}
                    checkedIcon={<Checked />}
                    onChange={handleAccountUserChange2}
                  />
                </TBody>
                <TBody>
                  <Checkbox
                    checked={accountUser[2]}
                    icon={<UnChecked />}
                    checkedIcon={<Checked />}
                    onChange={handleAccountUserChange3}
                  />
                </TBody>
              </Table>
            </TableBody>
          </SettinsGrid>
        </div>
      </PermSettins>
    </Layout>
  )
}

// Tailwind Styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`
const OverviewTitle = tw.h4`text-lg sm:text-xl lg:text-2xl text-paysure-text-100 tracking-[-0.025em]`
const Div = tw.div`mt-5`
const Card = tw.div`rounded-[20px] p-5 border border-border transition-colors duration-[250ms] hover:(border-[#1976d2] bg-[rgba(25, 118, 210, 0.04)]) lg:(min-w-[230px] min-h-[155px])`
const P = tw.p`text-sm text-paysure-50 lg:(text-base)`
const MUIButton = tw(
  Button,
)`flex items-center p-5 justify-center flex-col normal-case text-dark text-base border border-border rounded-[20px] lg:w-[170px]`
const Grid = tw.div`grid grid-cols-2 gap-[20px] mt-6 lg:(gap-6 grid-cols-3 mt-8) xl:(grid-template-columns[auto auto auto auto] mt-12 gap-[30px])`
const PermSettins = tw.div`mt-6 text-lg lg:(mt-10 text-xl)`
const SettinsGrid = tw.div`min-w-[720px]`
const THeader = tw.p`flex items-center justify-center`
const TBody = tw.p`flex items-center justify-center`
const TBodyInherit = tw(TBody)`justify-self-start`
const THeaderInherit = tw(THeader)`text-[#A6B7D4] justify-self-start`
const Table = tw.div`grid grid-cols-4 gap-[20px] text-base lg:(gap-[30px])`
const TableBody = tw.div`mt-4 space-y-3 lg:(mt-8 space-y-6)`
const FlexBox = tw.div`flex items-center justify-between space-x-4`
const CusLabel = tw.label`text-[13px] text-[#454D54]`
const TextArea = tw.textarea`text-[13px] border border-[#E3E5E8] text-[#454D54] p-2.5 rounded w-full mt-1.5 focus:(outline-none ring-1 ring-border)`

export default Roles_and_PermissionsDashboard
