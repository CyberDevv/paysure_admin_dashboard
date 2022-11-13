import { Button, InputAdornment, TextField } from '@mui/material'
import Router from 'next/router'
import React from 'react'
import tw from 'twin.macro'

import Layout from '../layouts/main_layout/index.main_layout'
import { ArrowBack, Search, UserProfileBlueSVG } from '../SVGIcons'

const AdminstratorDashboard = ({ roleData }) => {
  // fuction
  const handleGoback = () => {
    Router.back()
  }

  const userDetails = roleData.users.map(item => {
    return {
      name: item.name,
      role: item.userRoles,
      email: item.email,
      dateJoined: item.datePosted,
    }
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

      <Ttile className="font-500">{roleData.roleTitle}</Ttile>

      {/* description */}
      <DescWrapper>
        <DescTitle className="font-500">Description</DescTitle>

        <DescDescription>{roleData.description}</DescDescription>
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
              {userDetails.length > 0 ? (
                userDetails.map(({ name, role, email, dateJoined }, index) => (
                  <UserGrid key={index}>
                    <div tw="flex items-center space-x-2.5">
                      <UserProfileBlueSVG />
                      <GridRow>{name}</GridRow>
                    </div>
                    <UserBody>{role}</UserBody>
                    <UserBody>{email}</UserBody>
                    <UserBody>{dateJoined}</UserBody>
                  </UserGrid>
                ))
              ) : (
                <div tw="text-center text-paysure-50">No user found</div>
              )}
            </div>
          </div>
        </div>
      </DescWrapper>
    </Layout>
  )
}

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
