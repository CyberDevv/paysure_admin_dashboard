import React from 'react'
import axios from 'axios'
import moment from 'moment'
import tw from 'twin.macro'
import Router from 'next/router'
import { toast } from 'react-toastify'
import CurrencyFormat from 'react-currency-format'

import { EditActionSVG, ViewActionSVG } from '../SVGIcons'
import { DataGridViewTemp, SearchBar, FilterBox } from '..'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import Layout from '../layouts/main_layout/index.main_layout'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'

const ProvidersListDashboard = ({
  providersList = [],
  page,
  searchKey,
  status,
}) => {
  const { providerInfo = [] } = providersList
  // useState hook
  const [isaddModalOpened, setIsAddmodalOpened] = React.useState(false)
  const [providerName, setProviderName] = React.useState('')
  const [walletBalance, setWalletBallance] = React.useState('')
  const [servicesDesc, setServicesDesc] = React.useState('')
  const [servicesCount, setServicesCount] = React.useState('')
  const [tid, setTid] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  // rows
  let rows

  // check if providerList is an array
  if (Array.isArray(providerInfo)) {
    rows = providerInfo.map((provider, index) => {
      return {
        id: provider.tid,
        col1: (page - 1) * 10 + (index + 1),
        col2: provider.providerName,
        col3: provider.servicesDesc,
        col4: provider.servicesCount,
        col5: provider.noOfTransactions,
        col6: provider.walletBalance,
        col7: provider.transSum,
        col8: provider.charges,
        col9: provider.dateCreated,
        col10: '',
      }
    })
  } else {
    rows = []
  }

  const statusDataArray = [
    {
      value: '0',
      label: 'All',
    },
    {
      value: '1',
      label: 'Active',
    },
    {
      value: '2',
      label: 'Inactive',
    },
  ]

  // Funtion to edit provider
  const handleEditProvider = () => {
    // Validation
    if (!providerName || !walletBalance || !servicesDesc || !servicesCount) {
      toast.error('Please fill all the fields')
      return
    }

    let walletBalanceRefined = `${walletBalance}.00`
    setIsLoading(true)

    axios
      .post('/api/providers/editProvider', {
        providerName,
        walletBalanceRefined,
        servicesCount,
        servicesDesc,
        tid,
      })
      .then(res => {
        if (res.status === 200) {
          toast.success('Provider updated successfully')

          setIsLoading(false)

          setProviderName('')
          setWalletBallance('')
          setServicesDesc('')
          setServicesCount('')
          setIsAddmodalOpened(false)
        }
      })
      .catch(err => {
        setIsLoading(false)
        if (err.response.status === 913) {
          toast.error('Provider already exists')
        } else {
          toast.error('Error updating provider')
        }

        console.log('err >>>>', err.response.status)
      })
  }

  // array of columns
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
      minWidth: 236,
      flex: 1,
      headerClassName: 'grid-header',
      renderCell: params => {
        return <span tw="truncate">{params.row.col3}</span>
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
          setIsAddmodalOpened(true)

          setTid(params.row.id)
          setProviderName(params.row.col2)
          setWalletBallance(params.row.col6)
          setServicesDesc(params.row.col3)
          setServicesCount(params.row.col4)
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

  return (
    <Layout goBack>
      <DataGridViewTemp
        title="Providers"
        rows={rows}
        columns={columns}
        page={page}
        recordCount={providersList.totalRecords}
        pagination={true}
        className={tw`space-y-4 md:(flex space-y-0 space-x-4) xl:max-w-xl`}
      >
        <SearchBar value={searchKey} />
        <FilterBox
          label="Showing"
          dropdownData={statusDataArray}
          statusValue={status}
        />
      </DataGridViewTemp>

      {/* Edit Provider modal */}
      <Modal
        title={'Update Provider'}
        state={isaddModalOpened}
        setState={setIsAddmodalOpened}
        buttonLabel={'Save'}
        loading={isLoading}
        onClick={handleEditProvider}
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
    </Layout>
  )
}

export default ProvidersListDashboard
