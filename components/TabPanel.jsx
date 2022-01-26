import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'

function TabPanel(props) {
  const { children, tabvalue, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={tabvalue !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {tabvalue === index && <Box>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

export default TabPanel
