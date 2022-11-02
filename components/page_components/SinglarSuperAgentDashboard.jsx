import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import tw from 'twin.macro'

import { Agents, Aggregators, CMDashboard, TabPanel } from '..'
import Layout from '../layouts/main_layout/index.main_layout'

export default function AgentDashboard({
  clmData = [],
  aggregatorData = [],
  agentData = [],
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
            <MUITab label="Cluster Managers" />
            <MUITab sx={{ marginLeft: '32px' }} label="Aggregators" />
            <MUITab sx={{ marginLeft: '32px' }} label="Agents" />
          </MUITabs>
        </Box>
        <TabPanel tabvalue={tabValue} index={0}>
          <CMDashboard clmData={clmData} />
        </TabPanel>
        <TabPanel tabvalue={tabValue} index={1}>
          <Aggregators aggregatorData={aggregatorData} />
        </TabPanel>
        <TabPanel tabvalue={tabValue} index={2}>
          <Agents agentData={agentData} />
        </TabPanel>
      </Box>
    </Layout>
  )
}

// Taiwind Styles
const MUITabs = tw(Tabs)`space-x-4`
const MUITab = tw(Tab)`normal-case text-paysure-50 text-base px-0`
