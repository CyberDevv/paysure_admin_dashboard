import React from 'react'

import { BandsDashboard, AddBandDashboard } from '.'

const BandsSettings = () => {
  const [showAddBand, setShowAddBand] = React.useState(false)

  return (
    <>
      {showAddBand && <AddBandDashboard setShowAddBand={setShowAddBand} />}
      {!showAddBand && <BandsDashboard setShowAddBand={setShowAddBand} />}
    </>
  )
}

export default BandsSettings
