import React from 'react'
import tw from 'twin.macro'
import Link from 'next/link'
import Image from 'next/image'
import Router from 'next/router'

import { SettingsOUtline, CircledUser, MenuHamburger } from '../../SVGIcons'

const NavBar_main_layout = ({ setIsSideBarOpen, title, goBack }) => {
  // functions
  const handleSideBarToggle = React.useCallback(() => {
    setIsSideBarOpen(true)
  })

  const handleGoBack = React.useCallback(() => {
    Router.back()
  })

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

        {title && <Title>{title}</Title>}

        {goBack && <Button1 onClick={handleGoBack}>Back</Button1>}

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

      {title && <Title2>{title}</Title2>}
      {goBack && <Button2 onClick={handleGoBack}>Back</Button2>}
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
const Button = tw.button`normal-case text-paysure-text-100 text-sm hover:(underline)`
const Button1 = tw(Button)`hidden lg:block`
const Button2 = tw(Button)`lg:hidden mt-2`

export default NavBar_main_layout
