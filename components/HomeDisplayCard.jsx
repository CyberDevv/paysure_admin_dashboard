import { Avatar } from '@mui/material'
import React from 'react'
import tw from 'twin.macro'

const HomeDisplayCard = () => {
  return (
    <div
      className="scrollHidden"
      css={[tw`overflow-x-scroll lg:(overflow-x-hidden)`]}
    >
      <MainWrapper>
        {temporalData.map(({ amount, title }, index) => {
          return (
            <Wrapper key={index}>
              <AvatarWrapper>
                <Avatar
                  sx={{
                    height: {
                      xs: '30px',
                      sm: '40px',
                      lg: '50px',
                    },
                    width: {
                      xs: '30px',
                      sm: '40px',
                      lg: '50px',
                    },
                  }}
                />
              </AvatarWrapper>

              <div>
                <H1 className="font-bold">{amount}</H1>
                <P>{title}</P>
              </div>
            </Wrapper>
          )
        })}
      </MainWrapper>
    </div>
  )
}

const temporalData = [
  {
    amount: '240',
    title: 'Total Providers',
  },
  {
    amount: '120',
    title: 'Total Services',
  },
  {
    amount: '30',
    title: 'Total Super Agent',
  },
  {
    amount: '72',
    title: 'Total Agents',
  },
  {
    amount: '534',
    title: 'Total Users',
  },
  {
    amount: '10',
    title: 'Total Organizations',
  },
  {
    amount: '10',
    title: 'Total Admins',
  },
  {
    amount: '32429',
    title: 'Total Paysure Users',
  },
]

// Tailwind style
const MainWrapper = tw.div`grid grid-cols-4 gap-2.5 mt-10 min-w-[720px] rounded-lg overflow-hidden lg:(gap-5)`
const Wrapper = tw.div`bg-blue-light min-w-[165px] p-4 lg:(w-[265px] p-5)`
const AvatarWrapper = tw.div`flex justify-end`
const H1 = tw.h1`text-3xl lg:text-[40px] text-[#191716]`
const P = tw.p`text-sm text-paysure-50 mt-1 mb-2 lg:(text-base mb-3)`

export default HomeDisplayCard
