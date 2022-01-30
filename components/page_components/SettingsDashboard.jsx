import tw from 'twin.macro'
import React, { useState } from 'react'
import { Button, Divider } from '@mui/material'

import Layout from '../layouts/main_layout/index.main_layout'
import {
  CategoriesSettings as CategoriesSettingsSVG,
  PermissionsSettings as PermissionsSettingsSVG,
} from '../SVGIcons'
import { BandsSettings, PermissionsSettings, Plan_PackagesSettings } from '..'

const SettingsDashboard = () => {
  // UseState Hooks
  const [activeTab, setActiveTab] = useState('Bands')

  // Functions
  const handleSetActiveTab = React.useCallback((label) => {
    setActiveTab(label)
  })

  // NavItem component
  const NavItem = ({ label, icon }) => {
    return (
      <li>
        <MUIButton fullWidth startIcon={icon} onClick={() => handleSetActiveTab(label)}>
          <Span>{label}</Span>
        </MUIButton>
      </li>
    )
  }

  return (
    <Layout title="Settins">
      <SectionsWrapper>
        {/* Section1 */}
        <div css={[tw`mt-8`]}>
          <Ttile className="font-bold">Settings</Ttile>

          <Nav>
            <NavItem label="Bands" icon={<CategoriesSettingsSVG />} />
            <NavItem label="Permissions" icon={<PermissionsSettingsSVG />} />
            <NavItem label="Plan Packages" icon={<CategoriesSettingsSVG />} />
          </Nav>
        </div>

        <Divider css={[tw`ml-[125px] mr-10`]} orientation="vertical" flexItem />

        {/* sections2 */}
        <div css={[tw`w-full mt-8`]}>
          {activeTab === 'Bands' && <BandsSettings />}
          {activeTab === 'Permissions' && <PermissionsSettings />}
          {activeTab === 'Plan Packages' && <Plan_PackagesSettings />}
        </div>
      </SectionsWrapper>
    </Layout>
  )
}

// Tailwind styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:(text-[32px])`
const SectionsWrapper = tw.div`flex`
const MUIButton = tw(Button)`normal-case justify-start`
const Nav = tw.ul`mt-7 lg:mt-14 space-y-6`
const Span = tw.span`text-base text-gray-700 ml-4 whitespace-nowrap`

export default SettingsDashboard
