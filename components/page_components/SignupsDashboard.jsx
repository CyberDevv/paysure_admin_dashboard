import tw from 'twin.macro'
import React, { useState } from 'react'
import { Box, Tabs, Tab } from '@mui/material'

import Layout from '../layouts/main_layout/index.main_layout'
import {
  AggregatorSignupsDashboard,
  CLMSignupsDashboard,
  UsersSignupsDashboard,
  AgentSignupsDashboard,
  TabPanel,
} from '..'

export default function SignupsDashboard({
  clmData = [],
  aggregatorData = [],
  userData = [],
  agentData = [],
}) {
  const [tabValue, setTabValue] = useState(0)

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Layout title="Signups">
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            paddingBottom: {
              xs: '20px',
              lg: '40px',
            },
          }}
        >
          <MUITabs
            value={tabValue}
            onChange={handleChange}
            sx={{
              '& .Mui-selected': {
                color: '#6500E0 !important',
              },
              '& .MuiTab-root': {
                minWidth: 'unset',
                paddingY: '0',
              },
              '& .MuiTabs-indicator ': {
                backgroundColor: '#6500E0',
              },
            }}
          >
            <MUITab label="Cluster Managers" />
            <MUITab sx={{ marginLeft: '32px' }} label="Aggregators" />
            <MUITab sx={{ marginLeft: '32px' }} label="Agents" />
            <MUITab sx={{ marginLeft: '32px' }} label="Users" />
          </MUITabs>
        </Box>
        <TabPanel tabvalue={tabValue} index={0}>
          <CLMSignupsDashboard signupsList={clmData} />
        </TabPanel>
        <TabPanel tabvalue={tabValue} index={1}>
          <AggregatorSignupsDashboard signupsList={aggregatorData} />
        </TabPanel>
        <TabPanel tabvalue={tabValue} index={2}>
          <AgentSignupsDashboard signupsList={agentData} />
        </TabPanel>
        <TabPanel tabvalue={tabValue} index={3}>
          <UsersSignupsDashboard signupsList={userData} />
        </TabPanel>
      </Box>
    </Layout>
  )
}

// Taiwind Styles
const MUITabs = tw(Tabs)`space-x-4`
const MUITab = tw(Tab)`normal-case text-paysure-50 text-base px-0`
