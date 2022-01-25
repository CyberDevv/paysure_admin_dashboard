import React from 'react'
import tw from 'twin.macro'
import Link from 'next/link'
import Image from 'next/image'

import { ProfilePicPlaceholder } from '../../SVGIcons'

const Navbar_auth_layout = ({ login }) => {
  return (
    <Nav>
      {/* logo */}
      <Link href="/">
        <a>
          <Image
            src="/images/Paysure__.png"
            alt="paysure"
            width="92px"
            height="24px"
          />
        </a>
      </Link>

      <Div>
        <ProfilePicPlaceholder />

        {/* login */}
        {!login && (
          <Link href="/login">
            <a>Login</a>
          </Link>
        )}

        {/* singup */}
        {login && (
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        )}
      </Div>
    </Nav>
  )
}

// Tailwind Styles
const Nav = tw.nav`p-4 flex items-center justify-between lg:(px-10 py-7 container mx-auto)`
const Div = tw.div`space-x-4 text-white text-[13px]`

export default Navbar_auth_layout
