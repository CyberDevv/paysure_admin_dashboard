import React from 'react'
import tw from 'twin.macro'
import Router from 'next/router'
import { Button, InputAdornment, TextField } from '@mui/material'

import { ArrowBack, Search, UserProfileBlueSVG } from '../SVGIcons'
import Layout from '../layouts/main_layout/index.main_layout'

const AdminstratorDashboard = () => {
  // fuction
  const handleGoback = React.useCallback(() => {
    Router.back()
  })

  return (
    <Layout title="Roles & Permissions">
      {/* back button */}

      <Button
        tw="text-[13px] text-[#454D54] normal-case"
        startIcon={<ArrowBack />}
        onClick={handleGoback}
      >
        Back
      </Button>

      <Ttile className="font-500">Administrator</Ttile>

      {/* description */}
      <DescWrapper>
        <DescTitle className="font-500">Description</DescTitle>

        <DescDescription>
          Eros quam senectus pharetra quis in cras viverra. Amet pulvinar
          interdum neque ultrices egestas ac maecenas. Imperdiet urna et
          curabitur morbi pharetra lacinia facilisi etiam. Velit pellentesque
          nunc quam orci sodales hac arcu eget felis. Risus, enim ipsum
          pellentesque mus sit sit lorem lorem. Tristique sodales adipiscing
          dignissim odio viverra massa in fusce. Sodales cum vestibulum velit
          fames ac feugiat rhoncus eget. Egestas dictum etiam blandit pulvinar
          nascetur lacus enim volutpat. Risus curabitur pretium id a cras orci
          laoreet ut. Sagittis commodo urna tristique senectus curabitur sem
          consequat gravida. Amet elementum eleifend quam adipiscing.
        </DescDescription>
      </DescWrapper>

      {/* Users */}
      <DescWrapper>
        <div tw="flex items-center justify-between">
          <DescTitle className="font-500">Users</DescTitle>

          {/* Search */}
          <TextField
            id="outlined-start-adornment"
            size="small"
            sx={{
              fontSize: '13px',
              minWidth: '256px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#EBF2FA',
                },
                '&:hover fieldset': {
                  borderColor: '#c6c7c9',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Span>Search</Span>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button sx={{ minWidth: 0 }}>
                    <Search />
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div tw="overflow-x-scroll mt-4 lg:mt-8">
          <div tw="min-w-[900px]">
            {/* Header */}
            <UserGrid>
              <UserHeader>Name</UserHeader>
              <UserHeader>Roles</UserHeader>
              <UserHeader>Email</UserHeader>
              <UserHeader>Date Joined</UserHeader>
            </UserGrid>

            {/* Users */}
            <div tw="mt-4 space-y-4 lg:(mt-8 space-y-8)">
              {userDetails.map(({ name, role, email, dateJoined }, index) => (
                <UserGrid>
                  <div tw="flex items-center space-x-2.5">
                    <UserProfileBlueSVG />
                    <GridRow>{name}</GridRow>
                  </div>
                  <UserBody>{role}</UserBody>
                  <UserBody>{email}</UserBody>
                  <UserBody>{dateJoined}</UserBody>
                </UserGrid>
              ))}
            </div>
          </div>
        </div>
      </DescWrapper>
    </Layout>
  )
}

const userDetails = [
  {
    name: 'Wader Warren',
    role: 'Account Admin',
    email: 'ozeuaoluwatoi@gmail.com',
    dateJoined: 'Oct 4, 2020 12:11am',
  },
  {
    name: 'Wader Warren',
    role: 'Account Admin',
    email: 'ozeuaoluwatoi@gmail.com',
    dateJoined: 'Oct 4, 2020 12:11am',
  },
  {
    name: 'Wader Warren',
    role: 'Account Admin',
    email: 'ozeuaoluwatoi@gmail.com',
    dateJoined: 'Oct 4, 2020 12:11am',
  },
]

// Tailwind Styles
const Ttile = tw.h5`text-gray-dark tracking-[-0.025em] text-lg  mt-2 lg:(text-[20px] mt-4)`
const DescWrapper = tw.div`mt-8 lg:mt-10`
const DescTitle = tw.h6`leading-[19px] tracking-[-0.025em] text-paysure-text-100`
const DescDescription = tw.p`text-paysure-50 mt-2.5 text-sm leading-[150%] lg:mt-5 tracking-[-0.025em]`
const UserGrid = tw.div`grid grid-template-columns[2fr 1fr 2fr 1.5fr] gap-2`
const GridRow = tw.p`self-center text-paysure-text-100`
const UserHeader = tw(GridRow)`text-[#A6B7D4]`
const UserBody = tw(GridRow)`text-paysure-50`
const Span = tw.span`text-[13px] text-[#10101266]`

export default AdminstratorDashboard
