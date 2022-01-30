import tw from 'twin.macro'
import React from 'react'
import { Button } from '@mui/material'

import { Add } from '../SVGIcons'
import Layout from '../layouts/main_layout/index.main_layout'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'
import { DataGridViewTemp, HomeDisplayCard, OverviewCardSection } from '..'

const ProvidersDashboard = () => {
  // useState hook
  const [isaddModalOpened, setIsAddmodalOpened] = React.useState(false)
  const [providerName, setProviderName] = React.useState('')

  // functions
  const handleSetProviderName = React.useCallback(e => {
    setProviderName(e.target.value)
  })

  const handSetIsAddmodalOpened = React.useCallback(() =>
    setIsAddmodalOpened(true),
  )

  return (
    <Layout title="Providers">
      <div css={[tw`flex justify-between items-center`]}>
        <Ttile className="font-bold">
          Providers
          <TitleSpan>Manage all providers available on Paysure</TitleSpan>
        </Ttile>

        <MUIButton onClick={handSetIsAddmodalOpened} startIcon={<Add />}>
          Add Terminal
        </MUIButton>

        {/* Add terminal modal */}
        <Modal
          title="Add new Provider"
          state={isaddModalOpened}
          setState={setIsAddmodalOpened}
          buttonLabel="Next"
        >
          <Label
            label="Name of Provider"
            type="text"
            placeholder="Provider"
            value={providerName}
            onChange={handleSetProviderName}
          />
        </Modal>
      </div>

      <HomeDisplayCard data={temporalData} />

      <OverviewCardSection title="Metrics" data={agencyOveriewData} />

      <DataGridViewTemp
        limited
        link="/providers/providers_list"
        title="Providers"
        rows={rows}
        columns={columns}
        dropdownData={dropdownData}
      />
    </Layout>
  )
}

// FIXME: Temp data (should be replaced with real data)
const dropdownData = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'user',
    label: 'User',
  },
  {
    value: 'admin',
    label: 'Admin',
  },
]

// FIXME: Temp data (should be replaced with real data)
const rows = [
  {
    id: 1,
    col1: 1,
    col2: 'ETRANSACT',
    col3: 'POS',
    col4: 1,
    col5: 4243,
    col6: '443943043',
    col7: '443943043',
    col8: '7013',
    col9: 'Dec 30, 2018 05:12',
    col10: '',
  },
  {
    id: 2,
    col1: 2,
    col2: 'KUDA',
    col3: 'POS',
    col4: 1,
    col5: 4243,
    col6: '443943043',
    col7: '443943043',
    col8: '7013',
    col9: 'Dec 30, 2018 05:12',
    col10: '',
  },
  {
    id: 3,
    col1: 3,
    col2: 'Bessie Cooper',
    col3: 'Tv Subscription',
    col4: 5000,
    col5: 39.9,
    col6: '443943043',
    col7: 'Bank Card',
    col8: 'pending',
    col9: 'Dec 30, 2018 05:12',
    col10: '',
  },
  {
    id: 4,
    col1: 4,
    col2: 'Bessie Cooper',
    col3: 'Tv Subscription',
    col4: 5000,
    col5: 39.9,
    col6: '443943043',
    col7: 'Bank Card',
    col8: 'completed',
    col9: 'Dec 30, 2018 05:12',
    col10: '',
  },
  {
    id: 5,
    col1: 5,
    col2: 'Bessie Cooper',
    col3: 'Tv Subscription',
    col4: 5000,
    col5: 39.9,
    col6: '443943043',
    col7: 'Bank Card',
    col8: 'pending',
    col9: 'Dec 30, 2018 05:12',
    col10: '',
  },
]

// FIXME: Temp data (should be replaced with real data)
const columns = [
  {
    field: 'col1',
    headerName: 'S/N',
    minWidth: 71,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col2',
    headerName: 'Name of Provider',
    minWidth: 227,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col3',
    headerName: 'Services',
    minWidth: 236,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col4',
    headerName: 'No. of Services',
    minWidth: 103,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col5',
    headerName: 'No. of Transactions',
    minWidth: 176,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col6',
    headerName: 'Wallet Balance',
    minWidth: 150,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col7',
    headerName: 'Transactions(N)',
    minWidth: 144,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col8',
    headerName: 'Charges',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
    disableClickEventBubbling: true,
    // renderCell: params => {
    //   return (
    //     <span css={[tw`bg-border2 text-paysure-100 p-1 rounded`]}>
    //       {params.row.col8}
    //     </span>
    //   )
    // },
  },
  {
    field: 'col9',
    headerName: 'Date Added',
    minWidth: 123,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col10',
    headerName: 'Action',
    minWidth: 100,
    flex: 1,
    headerClassName: 'grid-header',
  },
]

// FIXME: Temp data (should be replaced with real data)
const temporalData = [
  {
    amount: '14',
    title: 'Total Providers',
    link: '/providers/providers_list',
  },
  {
    amount: '13',
    title: 'Total Services',
  },
  {
    amount: '13',
    title: 'Total Transactions',
  },
  {
    amount: '13',
    title: 'Total Charges',
  },
]

// FIXME: Temp data (should be replaced with real data)
const agencyOveriewData = [
  {
    amount: 93032434,
    label: 'All Transaction',
  },
  {
    amount: 289383,
    label: 'Data',
  },
  {
    amount: 70000,
    label: 'Transfer',
  },
  {
    amount: 700000,
    label: 'Transfer',
  },
]

const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:(text-[32px])`
const TitleSpan = tw.span`block text-light-dark text-sm font-normal mt-1.5 tracking-normal lg:(mt-3 text-base)`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 pl-3.5 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`

export default ProvidersDashboard
