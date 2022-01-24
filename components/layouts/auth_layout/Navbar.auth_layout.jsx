import React from 'react'
import tw from 'twin.macro'
import { Button } from '@mui/material'

import { ProfilePicPlaceholder } from '../../SVGIcons'
import Link from 'next/link'

const Navbar_auth_layout = () => {
  return (
    <Nav>
      {/* logo */}
      <img src="./svg/Paysure__.svg" alt="Paysure" />

      <Div>
        <ProfilePicPlaceholder />

        <Link href="/login">
          <a>Login</a>
        </Link>
      </Div>
    </Nav>
  )
}

// Tailwind Styles
const Nav = tw.nav`p-4 flex items-center justify-between lg:(px-10 py-7 container mx-auto)`
const Div = tw.div`space-x-4 text-white text-[13px]`

export default Navbar_auth_layout
