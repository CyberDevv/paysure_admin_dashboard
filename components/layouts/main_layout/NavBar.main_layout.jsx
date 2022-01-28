import React from 'react'
import tw from 'twin.macro'
import Link from 'next/link'
import Image from 'next/image'

import { SettingsOUtline, CircledUser, MenuHamburger } from '../../SVGIcons'

const NavBar_main_layout = ({ isSideBarOpen, setIsSideBarOpen, title }) => {
  // functions
  const handleSideBarToggle = () => {
    setIsSideBarOpen(true)
  }

  return (
    <Nav>
      <InnerWrapper>
        <ImageWrapper>
          <Link href="/">
            <a>
              <Image
                src="/images/logo_purple.png"
                alt="paysure"
                width="92px"
                height="24px"
              />
            </a>
          </Link>
        </ImageWrapper>

        <Title>{title}</Title>

        <AuthWrapper>
          <Link href="/settings">
            <a>
              <I>
                <SettingsOUtline />
              </I>
            </a>
          </Link>
          <I>
            <CircledUser />
          </I>
          <button onClick={handleSideBarToggle} css={[tw`lg:hidden`]}>
            <MenuHamburger />
          </button>
        </AuthWrapper>
      </InnerWrapper>

      <Title2>{title}</Title2>
    </Nav>
  )
}

// Tailwind styles
const Nav = tw.nav`py-3 w-full lg:(py-7)`
const InnerWrapper = tw.div`flex items-center justify-between w-full`
const ImageWrapper = tw.div`lg:hidden`
const Title = tw.h5`text-sm hidden lg:block`
const Title2 = tw.h5`text-sm lg:hidden mt-2`
const AuthWrapper = tw.div`flex items-center space-x-4 text-paysure-text-100`
const I = tw.i`hover:text-paysure-100`

export default NavBar_main_layout
