import React from 'react'
import tw from 'twin.macro'

import NavBar from './Navbar.auth_layout'

const Auth_Layout_index = ({ children, title, icon, onClick, login }) => {
  return (
    <MainWrapper>
      <NavBar login={login} />
      <Main>
        <Wrapper>
          <Header>
            {icon && <button onClick={onClick}>{icon}</button>}
            <H3>{title}</H3>
          </Header>

          {children}
        </Wrapper>
      </Main>
    </MainWrapper>
  )
}

// Tailwind Styles
const MainWrapper = tw.div`bg-purple-dark min-h-screen h-screen`
const Main = tw.main`flex items-center justify-center h-[calc(100vh - 64px)] text-white lg:(items-start pt-32 h-[calc(100vh - 88px)] )`
const Wrapper = tw.section`bg-purple-light rounded-xl px-6 py-10 min-w-[358px]`
const Header = tw.header`flex items-center space-x-2`
const H3 = tw.h3`leading-[-0.025em]`

export default Auth_Layout_index
