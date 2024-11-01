import { IconButton, Menu, MenuItem } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import { destroyCookie, setCookie } from 'nookies'
import React from 'react'
import { useDispatch } from 'react-redux'
import tw from 'twin.macro'

import { logout } from '../../../features/userSlice'
import { CircledUser, MenuHamburger, SettingsOUtline } from '../../SVGIcons'

const NavBar_main_layout = ({ setIsSideBarOpen, title, goBack }) => {
  const dispatch = useDispatch()

  // useState hook
  const [anchorEl, setAnchorEl] = React.useState(null)

  // functions
  const handleSideBarToggle = () => {
    setIsSideBarOpen(true)
  }

  const handleGoBack = () => {
    Router.back()
  }

  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    // Set
    setCookie(null, 'fromClient', 'value', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setAnchorEl(null)

    dispatch(logout())
    destroyCookie(null, 'USER_AUTHORIZATION')
    localStorage.removeItem('user')
    Router.push('/login')
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

        {title && <Title>{title}</Title>}

        {goBack && <Button1 onClick={handleGoBack}>Back</Button1>}

        <AuthWrapper>
          <Link href="/settings">
            <a>
              <IconButton>
                <SettingsOUtline />
              </IconButton>
            </a>
          </Link>

          {/* Dropdonwn */}
          <div>
            <IconButton
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <CircledUser />
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>

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
const Nav = tw.nav`py-3 sm:py-6 md:py-7 w-full`
const InnerWrapper = tw.div`flex items-center justify-between w-full`
const ImageWrapper = tw.div`lg:hidden`
const Title = tw.h5`text-sm hidden lg:block`
const Title2 = tw.h5`text-sm lg:hidden mt-2`
const AuthWrapper = tw.div`flex items-center space-x-4 text-paysure-text-100`
const Button = tw.button`normal-case text-paysure-text-100 text-sm hover:(underline)`
const Button1 = tw(Button)`hidden lg:block`
const Button2 = tw(Button)`lg:hidden mt-2`

export default NavBar_main_layout
