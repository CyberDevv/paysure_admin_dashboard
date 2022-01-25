import React from 'react'
import tw from 'twin.macro'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@mui/material'

import {
  Categories,
  Organizations,
  Providers,
  Roles,
  Settings,
  Settlement,
  Sighups,
  SubAccounts,
  Support,
  Terminals,
  Transactions,
  Users,
} from '../../SVGIcons'

const SideBar_main_layout = () => {
  return (
    <Nav>
      <Image
        src="/images/logo_purple.png"
        alt="paysure"
        width="92px"
        height="24px"
      />

      <Ul>
        <NavItem label="Home" icon={<Categories />} link="/" />
        <NavItem label="Providers" icon={<Providers />} />
        <NavItem label="Organizations" icon={<Organizations />} />
        <NavItem label="Users" icon={<Users />} />
        <NavItem label="Agents" icon={<Users />} />
        <NavItem label="Signups" icon={<Sighups />} />
        <NavItem label="Terminals" icon={<Terminals />} />
        <NavItem label="Transactions" icon={<Transactions />} />
        <NavItem label="Settlements" icon={<Settlement />} />
        <NavItem
          label="Roles & Permissions"
          icon={<Roles />}
          link="/roles_and_permissions"
        />
        <NavItem label="Sub Accounts" icon={<SubAccounts />} />
        <NavItem label="Settings" icon={<Settings />} />
        <NavItem label="Support" icon={<Support />} />
      </Ul>
    </Nav>
  )
}

const NavItem = ({ label, icon, link }) => {
  return (
    <li>
      <Link href={`/${link || label.toLowerCase()}`}>
        <a>
          <MUIButton fullWidth startIcon={icon}>
            <Span>{label}</Span>
          </MUIButton>
        </a>
      </Link>
    </li>
  )
}

// Tailwind Styles￼
const Nav = tw.nav`w-[245px] min-w-[245px] h-screen bg-gray-light pl-8 py-7`
const Ul = tw.ul`mt-14 space-y-6`
const Span = tw.span`text-[13px] text-gray-700 ml-4`
const MUIButton = tw(Button)`normal-case justify-start`

export default SideBar_main_layout
