import React from 'react'
import tw from 'twin.macro'

import NavBar from './NavBar.main_layout'
import SideBar from './SideBar.main_layout'

const index_main_layout = ({ children, title, goBack }) => {
  // usestate hook
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false)

  return (
    <Wrapper>
      <SideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />

      <Section>
        <NavBar
          setIsSideBarOpen={setIsSideBarOpen}
          title={title}
          goBack={goBack}
        />
        <Main>{children}</Main>
      </Section>
    </Wrapper>
  )
}

// Tailwind Styles
const Wrapper = tw.div`flex`
const Section = tw.section`w-full px-4  lg:(ml-[245px] px-10)`
const Main = tw.main`py-2 lg:(py-6)`

export default index_main_layout