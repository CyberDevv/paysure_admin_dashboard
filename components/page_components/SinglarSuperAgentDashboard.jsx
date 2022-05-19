import tw from 'twin.macro'
import React, { useState } from 'react'
import { Box, Tabs, Tab } from '@mui/material'

import Layout from '../layouts/main_layout/index.main_layout'
import { AgentSubDashboard, SuperAgentSubDashboard, TabPanel } from '..'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function AgentDashboard({
  agentData = [],
  superAgentData = [],
}) {
  const [tabValue, setTabValue] = useState(0)

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Layout title="Agents">
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
              '& .css-1aquho2-MuiTabs-indicator ': {
                backgroundColor: '#6500E0',
              },
            }}
          >
            <MUITab label="Agents" {...a11yProps(0)} />
            <MUITab
              sx={{ marginLeft: '32px' }}
              label="Super Agents"
              {...a11yProps(1)}
            />
          </MUITabs>
        </Box>
        <TabPanel tabvalue={tabValue} index={0}>
          <AgentSubDashboard agentData={agentData} />
        </TabPanel>
        <TabPanel tabvalue={tabValue} index={1}>
          <SuperAgentSubDashboard superAgentData={superAgentData} />
        </TabPanel>
      </Box>
    </Layout>
  )
}

// Taiwind Styles
const MUITabs = tw(Tabs)`space-x-4`
const MUITab = tw(Tab)`normal-case text-paysure-50 text-base px-0`
