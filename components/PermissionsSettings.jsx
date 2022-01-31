import React from 'react'

import { PermissionsSettingsDashboard, CreatePermissionDashboard } from '.'

const PermissionsSettings = () => {
  // useState hooks
  const [showAddPanel, setShowAddPanel] = React.useState(false)

  return (
    <>
      {!showAddPanel && (
        <PermissionsSettingsDashboard setShowAddPanel={setShowAddPanel} />
      )}

      {showAddPanel && (
        <CreatePermissionDashboard setShowAddPanel={setShowAddPanel} />
      )}
    </>
  )
}

export default PermissionsSettings
