import React from 'react'
import tw from 'twin.macro'
import { Avatar, AvatarGroup, Button, Checkbox } from '@mui/material'

import { AddSquare, UnChecked, Checked } from '../SVGIcons'
import Layout from '../layouts/main_layout/index.main_layout'

const Roles_and_PermissionsDashboard = () => {
  return (
    <Layout title="Roles & Permissions">
      <Ttile className="font-bold">Roles & Permissions</Ttile>

      {/* Cards  */}
      <Grid>
        {tempData.map(({ role, upperLimit, accounts }) => {
          return (
            <Card>
              <OverviewTitle className="font-500">
                {`${role} (${upperLimit.toUpperCase()})`}
              </OverviewTitle>

              <Div>
                <P>{accounts.length} Accounts</P>

                <AvatarGroup sx={{ flexDirection: 'row', marginTop: '8px' }}>
                  {accounts.map(url => (
                    <Avatar
                      variant="rounded"
                      alt="Remy Sharp"
                      src={url}
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
          )
        })}
        <MUIButton variant="outlined">
          <AddSquare /> Add new role
        </MUIButton>
      </Grid>

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
                <Checkbox icon={<UnChecked />} checkedIcon={<Checked />} />
              </THeader>
              <THeader className="font-500">
                Reconciliation{' '}
                <Checkbox icon={<UnChecked />} checkedIcon={<Checked />} />
              </THeader>
              <THeader className="font-500">
                Reconciliation{' '}
                <Checkbox icon={<UnChecked />} checkedIcon={<Checked />} />
              </THeader>
            </Table>

            {/* Body */}
            <TableBody>
              <Table>
                <TBodyInherit>Administrator</TBodyInherit>
                <TBody>
                  <Checkbox icon={<UnChecked />} checkedIcon={<Checked />} />
                </TBody>
                <TBody>
                  <Checkbox icon={<UnChecked />} checkedIcon={<Checked />} />
                </TBody>
                <TBody>
                  <Checkbox icon={<UnChecked />} checkedIcon={<Checked />} />
                </TBody>
              </Table>

              <Table>
                <TBodyInherit>Administrator</TBodyInherit>
                <TBody>
                  <Checkbox icon={<UnChecked />} checkedIcon={<Checked />} />
                </TBody>
                <TBody>
                  <Checkbox icon={<UnChecked />} checkedIcon={<Checked />} />
                </TBody>
                <TBody>
                  <Checkbox icon={<UnChecked />} checkedIcon={<Checked />} />
                </TBody>
              </Table>

              <Table>
                <TBodyInherit>Administrator</TBodyInherit>
                <TBody>
                  <Checkbox icon={<UnChecked />} checkedIcon={<Checked />} />
                </TBody>
                <TBody>
                  <Checkbox icon={<UnChecked />} checkedIcon={<Checked />} />
                </TBody>
                <TBody>
                  <Checkbox icon={<UnChecked />} checkedIcon={<Checked />} />
                </TBody>
              </Table>
            </TableBody>
          </SettinsGrid>
        </div>
      </PermSettins>
    </Layout>
  )
}

const tempData = [
  {
    role: 'Administrator',
    upperLimit: 'amd',
    accounts: [
      '/static/images/avatar/4.jpg',
      '/static/images/avatar/3.jpg',
      '/static/images/avatar/1.jpg',
    ],
  },
  {
    role: 'Account Admin',
    upperLimit: 'aad',
    accounts: [
      '/static/images/avatar/4.jpg',
      '/static/images/avatar/5.jpg',
      '/static/images/avatar/3.jpg',
      '/static/images/avatar/1.jpg',
    ],
  },
  {
    role: 'Account User',
    upperLimit: 'acu',
    accounts: [
      '/static/images/avatar/4.jpg',
      '/static/images/avatar/3.jpg',
      '/static/images/avatar/1.jpg',
    ],
  },
]

// Tailwind Styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:(text-[32px])`
const OverviewTitle = tw.h4`text-xl lg:text-2xl text-paysure-text-100 tracking-[-0.025em]`
const Div = tw.div`mt-5`
const Card = tw.div`rounded-[20px] p-5 border border-border lg:(min-w-[285px])`
const P = tw.p`text-sm text-paysure-50 lg:(text-base)`
const MUIButton = tw(
  Button,
)`flex items-center justify-center flex-col normal-case text-dark text-base border border-border rounded-[20px] lg:w-[170px]`
const Grid = tw.div`grid grid-cols-2 gap-[20px] mt-6 lg:(gap-[30px] grid-template-columns[auto auto auto auto] mt-12)`
const PermSettins = tw.div`mt-6 text-lg lg:(mt-10 text-xl)`
const SettinsGrid = tw.div`min-w-[720px]`
const THeader = tw.p`flex items-center justify-center`
const TBody = tw.p`flex items-center justify-center`
const TBodyInherit = tw(TBody)`justify-self-start`
const THeaderInherit = tw(THeader)`text-[#A6B7D4] justify-self-start`
const Table = tw.div`grid grid-cols-4 gap-[20px] text-base lg:(gap-[30px])`
const TableBody = tw.div`mt-4 space-y-3 lg:(mt-8 space-y-6)`

export default Roles_and_PermissionsDashboard