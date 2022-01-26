import React from 'react'
import tw from 'twin.macro'
import { Avatar } from '@mui/material'

const HomeDisplayCard = ({ data = [], hasIcon }) => {
  return (
    <div
      className="scrollHidden"
      css={[tw`overflow-x-scroll lg:(overflow-x-hidden)`]}
    >
      <MainWrapper>
        {data.map(({ amount, title }, index) => {
          return (
            <Wrapper
              key={index}
              css={[!hasIcon ? tw`px-4 py-6 lg:(px-8)` : tw`p-4 lg:(p-5)`]}
            >
              {hasIcon && (
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
              )}

              <div css={[!hasIcon && tw`space-y-3`]}>
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

// Tailwind style
const MainWrapper = tw.div`grid grid-cols-4 gap-2.5 mt-10 min-w-[900px] overflow-hidden lg:(gap-5)`
const Wrapper = tw.div`bg-blue-light min-w-[165px] border border-border rounded-lg lg:(min-w-[265px])`
const AvatarWrapper = tw.div`flex justify-end`
const H1 = tw.h1`text-3xl lg:text-[40px] text-[#191716]`
const P = tw.p`text-sm text-paysure-50 mt-1 mb-2 lg:(text-base mb-3)`

export default HomeDisplayCard
