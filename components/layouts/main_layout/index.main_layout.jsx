import React from 'react'
import tw from 'twin.macro'

import NavBar from './NavBar.main_layout'
import SideBar from './SideBar.main_layout'

const index_main_layout = ({ children }) => {
  return (
    <Wrapper>
      <SideBar />

      <Section>
        <NavBar />
        <Main>{children}</Main>
      </Section>
    </Wrapper>
  )
}

// Tailwind Styles
const Wrapper = tw.div`flex `
const Section = tw.section` `
const Main = tw.main``

export default index_main_layout
