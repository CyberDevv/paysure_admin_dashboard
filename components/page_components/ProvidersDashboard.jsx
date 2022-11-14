import axios from 'axios'
import React from 'react'
import moment from 'moment'
import tw from 'twin.macro'
import Router from 'next/router'
import { useSWRConfig } from 'swr'
import { toast } from 'react-toastify'
import { Button, Tooltip } from '@mui/material'
import CurrencyFormat from 'react-currency-format'

import Layout from '../layouts/main_layout/index.main_layout'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import { Add, EditActionSVG, ViewActionSVG } from '../SVGIcons'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'
import {
  DataGridViewTemp,
  HomeDisplayCard,
  HomeMetricCard,
  OverviewCardSection,
} from '..'
import BarChat from '../BarChat'
// import { MultiSelect } from '../layouts/modal_ayout/LabelInput.main_layout'
import MultipleSelectChip from '../MultiSelect'

const ProvidersDashboard = ({ providerStats = [], tableTata = [] }) => {
  console.log("🚀 ~ file: ProvidersDashboard.jsx ~ line 26 ~ ProvidersDashboard ~ tableTata", tableTata)
  // useState hook
  const [isaddModalOpened, setIsAddmodalOpened] = React.useState(false)
  const [providerName, setProviderName] = React.useState('MTN')
  const [services, setServices] = React.useState(['Airtime'])
  const [btnLabel, setBtnLabel] = React.useState('Add Provider')
  const [modalLabel, setModalLabel] = React.useState('Add New Provider')
  const [isLoading, setIsLoading] = React.useState(false)

  const { mutate } = useSWRConfig()

  // Array of provider stats data
  const providerStatsData = [
    {
      amount: providerStats.totalProviders,
      title: 'Total Number of Providers',
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
          value={providerStats.allTransactions}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      label: 'All Transactions',
    },
    {
      amount: (
        <CurrencyFormat
          value={providerStats.allData}
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
          value={providerStats.allTransfer}
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
          value={providerStats.allRechargeTransaction}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      label: 'Recharge Transactions',
    },
    {
      amount: (
        <CurrencyFormat
          value={providerStats.allPowerTransaction}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      label: 'Power Transactions',
    },
    {
      amount: (
        <CurrencyFormat
          value={providerStats.allTvTransactions}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₦'}
        />
      ),
      label: 'TV Transactions',
    },
  ]

  // rows
  let rows = tableTata.map((provider, index) => {
    return {
      id: index,
      col1: index + 1,
      col2: provider.providerName,
      col3: provider.services,
      col4: provider.noOfServices,
      col5: provider.noOfTransactions,
      col6: provider.walletBalance,
      col7: provider.null,
      col8: provider.charges,
      col9: provider.dateCreated,
      col10: '',
    }
  })

  const columns = [
    {
      field: 'col1',
      headerName: 'S/N',
      minWidth: 71,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return <span>{params.row.col1}.</span>
      },
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
      minWidth: 300,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return <span tw="truncate w-full">{params.row.col3}</span>
      },
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
      renderCell: params => {
        return (
          <span>{moment(params.row.col9).format('MMM DD, YYYY HH:mm')}</span>
        )
      },
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
          handSetIsAddmodalOpened()

          setTid(params.row.id)
          setProviderName(params.row.col2)
          setWalletBallance(params.row.col6)
          setServicesDesc(params.row.col3)
          setServicesCount(params.row.col4)
          setBtnLabel('Save')
          setModalLabel('Update Provider')
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

          Router.push(`/providers/${thisRow.col2}`)
        }

        return (
          <div tw="space-x-1">
            <Tooltip title="Edit Provider">
              <button onClick={handleEdit}>
                <EditActionSVG />
              </button>
            </Tooltip>

            <Tooltip title="View Provider">
              <button onClick={handleView}>
                <ViewActionSVG />
              </button>
            </Tooltip>
          </div>
        )
      },
    },
  ]

  // functions
  const handSetIsAddmodalOpened = () => {
    setBtnLabel('Add Provider')
    setIsAddmodalOpened(true)
    setModalLabel('Add New Provider')
    // setProviderName(''),
    // setWalletBallance(''),
    // setServicesDesc(''),
    // setServicesCount(''),
    // setEmailAddress('')
  }

  const handleAddProvider = () => {
    // Validation
    if (!providerName || !services) {
      toast.error('Please fill all the fields')
      return
    }

    setIsLoading(true)

    if (modalLabel === 'Add New Provider') {
      axios
        .post('/api/providers/addProvider', {
          providerName,
          services,
        })
        .then(res => {
          toast.success('Provider added successfully')

          setIsLoading(false)

          setProviderName('')
          setServices([])
          setIsAddmodalOpened(false)

          // Fresh information from the server
          // mutate('/api/providers/providerStats')
          // mutate('/api/providers/providerList')
        })
        .catch(err => {
          setIsLoading(false)
          toast.error('Error adding provider')
          console.log('err >>>>', err.response.status)
        })
    } else {
      axios
        .post('/api/providers/editProvider', {
          providerName,
          services,
        })
        .then(res => {
          if (res.status === 200) {
            toast.success('Provider updated successfully')

            setIsLoading(false)

            setProviderName('')
            setServices( )
            setIsAddmodalOpened(false)

            // Fresh information from the server
            // mutate('/api/providers/providerStats')
            // mutate('/api/providers/providerList')
          }
        })
        .catch(err => {
          setIsLoading(false)
          console.log('err >>>>', err.response.status)
        })
    }
  }

  return (
    <Layout title="Providers">
      <div css={[tw`flex items-center justify-between`]}>
        <Ttile className="font-bold">
          Providers
          <TitleSpan>Manage all providers available on Paysure</TitleSpan>
        </Ttile>

        <MUIButton onClick={handSetIsAddmodalOpened} startIcon={<Add />}>
          Add Provider
        </MUIButton>

        {/* Add Provider modal */}
        <Modal
          title={modalLabel}
          state={isaddModalOpened}
          setState={setIsAddmodalOpened}
          buttonLabel={btnLabel}
          loading={isLoading}
          onClick={handleAddProvider}
        >
          <Label
            label="Name of Provider"
            type="text"
            placeholder="Provider"
            value={providerName}
            setState={setProviderName}
          />
          <MultipleSelectChip
            menuItems={['Airtime', 'Data', 'Transfer']}
            label="Services"
            value={services}
            setState={setServices}
          />
        </Modal>
      </div>

      <div tw="grid mt-10 grid-cols-2 gap-3 md:grid-cols-4">
        {providerStatsData.map((item, index) => (
          <HomeMetricCard.PlainCard
            key={index}
            amount={item.amount}
            title={item.title}
          />
        ))}
      </div>

      <OverviewCardSection title="Metrics" data={metricData} />

      <BarChat
        title={'Performance of Providers'}
        categories={[
          'PROVIDER 1',
          'PROVIDER 2',
          'PROVIDER 3',
          'PROVIDER 4',
          'PROVIDER 5',
          'PROVIDER 6',
          'PROVIDER 7',
          'PROVIDER 8',
        ]}
      />

      <DataGridViewTemp
        limited
        link="/providers/providers_list"
        title="Providers"
        rows={rows}
        columns={columns}
      />
    </Layout>
  )
}

// Tailwind Styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`
const TitleSpan = tw.span`block text-light-dark text-sm font-normal mt-1.5 tracking-normal lg:(text-base) xl:mt-3`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 pl-3.5 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`

export default ProvidersDashboard
