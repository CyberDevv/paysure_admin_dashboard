import axios from 'axios'
import React from 'react'
import tw from 'twin.macro'
import Router from 'next/router'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'
import CurrencyFormat from 'react-currency-format'

import Layout from '../layouts/main_layout/index.main_layout'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import { Add, EditActionSVG, ViewActionSVG } from '../SVGIcons'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'
import { DataGridViewTemp, HomeDisplayCard, OverviewCardSection, SearchBar, FilterBox } from '..'

const ProvidersDashboard = ({ providerStats, providersList }) => {
  // Array of provider stats data
  const providerStatsData = [
    {
      amount: providerStats.totalProviders,
      title: 'Total Number of Providers',
      link: '/providers/providers_list',
    },
    {
      amount: providerStats.totalServices,
      title: 'Total Number of Services',
    },
    {
      amount: providerStats.totalTransactions,
      title: 'Total Number of Transactions',
    },
    {
      amount: providerStats.totalCharges,
      title: 'Total Number of Charges',
    },
  ]

  // Array of metric data
  const metricData = [
    {
      amount: (
        <CurrencyFormat
          value={providerStats.sumTotalTransfers}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      label: 'Total Transactions',
    },
    {
      amount: (
        <CurrencyFormat
          value={providerStats.sumTotalData}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      label: 'Data',
    },
    {
      amount: (
        <CurrencyFormat
          value={70000}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      label: 'Transfer',
    },
    {
      amount: (
        <CurrencyFormat
          value={70000}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      label: 'Airtime',
    },
  ]

  const rows = providersList.map((provider, index) => {
    return {
      id: provider.tid,
      col1: index + 1,
      col2: provider.providerName,
      col3: provider.servicesDesc,
      col4: provider.servicesCount,
      col5: provider.noOfTransactions,
      col6: provider.walletBalance,
      col7: provider.none,
      col8: provider.none,
      col9: provider.none,
      col10: '',
    }
  })

  // useState hook
  const [isaddModalOpened, setIsAddmodalOpened] = React.useState(false)
  const [providerName, setProviderName] = React.useState('')
  const [walletBalance, setWalletBallance] = React.useState('')
  const [servicesDesc, setServicesDesc] = React.useState('')
  const [servicesCount, setServicesCount] = React.useState('')

  // functions
  const handSetIsAddmodalOpened = React.useCallback(() =>
    setIsAddmodalOpened(true),
  )

  const handleAddProvider = React.useCallback(() => {
    let walletBalanceRefined = `${walletBalance}.00`

    axios
      .post('/api/providers/addProvider', {
        providerName,
        walletBalanceRefined,
        servicesCount,
        servicesDesc,
      })
      .then(res => {
        if (res.status === 200) {
          toast.success('Provider added successfully')

          setProviderName('')
          setWalletBallance('')
          setServicesDesc('')
          setServicesCount('')
          setIsAddmodalOpened(false)
        }
      })
      .catch(err => {
        if (err.response.status === 913) {
          toast.error('Provider already exists')
        } else {
          toast.error('Error adding provider')
        }

        console.log('err >>>>', err.response.status)
      })
  })

  return (
    <Layout title="Providers">
      <div css={[tw`flex justify-between items-center`]}>
        <Ttile className="font-bold">
          Providers
          <TitleSpan>Manage all providers available on Paysure</TitleSpan>
        </Ttile>

        <MUIButton onClick={handSetIsAddmodalOpened} startIcon={<Add />}>
          Add Provider
        </MUIButton>

        {/* Add Provider modal */}
        <Modal
          title="Add new Provider"
          state={isaddModalOpened}
          setState={setIsAddmodalOpened}
          buttonLabel="Next"
          onClick={handleAddProvider}
        >
          <Label
            label="Name of Provider"
            type="text"
            placeholder="Provider"
            value={providerName}
            setState={setProviderName}
          />
          <Label
            label="Wallet Ballance"
            type="text"
            placeholder="₦20,000"
            value={walletBalance}
            setState={setWalletBallance}
          />
          <Label
            label="Services"
            type="text"
            placeholder="Provider"
            value={servicesDesc}
            setState={setServicesDesc}
          />
          <Label
            label="Number of Services"
            type="number"
            placeholder="0"
            value={servicesCount}
            setState={setServicesCount}
          />
        </Modal>
      </div>

      <HomeDisplayCard data={providerStatsData} />

      <OverviewCardSection title="Metrics" data={metricData} />

      <DataGridViewTemp
        limited
        link="/providers/providers_list"
        title="Providers"
        rows={rows}
        columns={columns}
        dropdownData={dropdownData}
        className= {tw`space-y-4 md:(flex space-y-0 space-x-4) xl:max-w-xl`}
      >
          <SearchBar />
          <FilterBox label="Showing" dropdownData={dropdownData} />
      </DataGridViewTemp>
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
    minWidth: 153,
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
    renderCell: params => {
      return (
        <CurrencyFormat
          value={params.row.col6}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      )
    },
  },
  {
    field: 'col7',
    headerName: 'Transactions(N)',
    minWidth: 144,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: params => {
      return (
        <CurrencyFormat
          value={params.row.col7}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      )
    },
  },
  {
    field: 'col8',
    headerName: 'Charges',
    minWidth: 153,
    flex: 1,
    headerClassName: 'grid-header',
    disableClickEventBubbling: true,
    renderCell: params => {
      return (
        <CurrencyFormat
          value={params.row.col8}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      )
    },
  },
  {
    field: 'col9',
    headerName: 'Date Added',
    minWidth: 183,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'col10',
    headerName: 'Action',
    minWidth: 100,
    flex: 1,
    sortable: false,
    headerClassName: 'grid-header',

    renderCell: params => {
      const handleEdit = () => {
        console.log('edit')
      }

      const handleView = e => {
        const api = params.api
        const thisRow = {}

        api
          .getAllColumns()
          .filter(c => c.field !== '__check__' && !!c)
          .forEach(
            c => (thisRow[c.field] = params.getValue(params.id, c.field)),
          )

        Router.push(`/providers/${thisRow.col1}`)
      }

      return (
        <div tw="space-x-1">
          <button onClick={handleEdit}>
            <EditActionSVG />
          </button>

          <button onClick={handleView}>
            <ViewActionSVG />
          </button>
        </div>
      )
    },
  },
]

// Tailwind Styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`
const TitleSpan = tw.span`block text-light-dark text-sm font-normal mt-1.5 tracking-normal lg:(text-base) xl:mt-3`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 pl-3.5 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`

export default ProvidersDashboard
