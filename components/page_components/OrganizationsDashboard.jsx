import React from 'react'
import axios from 'axios'
import tw from 'twin.macro'
import Router from 'next/router'
import { toast } from 'react-toastify'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'

import { DataGridViewTemp, HomeDisplayCard } from '..'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import Layout from '../layouts/main_layout/index.main_layout'
import { Add, EditActionSVG, ViewActionSVG } from '../SVGIcons'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'
import { fetchPartnerClass } from '../../features/partnerClassSlice'

const OrganizationsDashboard = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchPartnerClass())
  }, [dispatch])

  // useState hook
  const [isaddModalOpened, setIsAddmodalOpened] = React.useState(false)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [logoURL, setLogoURL] = React.useState('')
  const [abbreviation, setAbbreviation] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  // functions
  const handSetIsAddmodalOpened = React.useCallback(() =>
    setIsAddmodalOpened(true),
  )

  // handle add organization
  const handleAddOrganization = () => {
    // validation if all fields are filled
    if (!name || !email || !phone || !address || !logoURL || !abbreviation) {
      toast.error('Please fill all the fields')
      return
    }

    // set loading
    setIsLoading(true)

    // fetching data
    axios
      .post('/api/organizatons/addOrganization', {
        name,
        email,
        phone,
        address,
        logoURL,
        abbreviation,
      })
      .then(res => {
        // set loading
        console.log(res)
        setIsLoading(false)
      })
      .catch(err => {
        // set loading
        setIsLoading(false)
        toast.error('Error adding organization')

        console.log(err.response)
      })
  }

  return (
    <Layout title="Organizations">
      <div css={[tw`flex justify-between items-center w-full`]}>
        <div>
          <Ttile className="font-bold">Organizations</Ttile>
          <TitleSpan>Manage all organizations available on Paysure</TitleSpan>
        </div>

        <MUIButton onClick={handSetIsAddmodalOpened} startIcon={<Add />}>
          Add Organization
        </MUIButton>

        {/* Add organization modal */}
        <Modal
          setState={setIsAddmodalOpened}
          title="Add new Organization"
          state={isaddModalOpened}
          buttonLabel="Next"
          loading={isLoading}
          onClick={handleAddOrganization}
        >
          <Label
            label="Name"
            type="text"
            placeholder="John Smith"
            value={name}
            setState={setName}
          />
          <Label
            label="Abbreviation"
            type="text"
            placeholder="Abbreviation"
            value={abbreviation}
            setState={setAbbreviation}
          />
          <Label
            label="Email"
            type="email"
            placeholder="yourname@example.com"
            value={email}
            setState={setEmail}
          />
          <Label
            label="Phone"
            type="tel"
            placeholder="08012345678"
            value={phone}
            setState={setPhone}
          />
          <Label
            label="Address"
            type="text"
            placeholder="Address"
            value={address}
            setState={setAddress}
          />
          <Label
            label="Logo URL"
            type="text"
            placeholder="https://"
            value={logoURL}
            setState={setLogoURL}
          />
        </Modal>
      </div>

      <HomeDisplayCard data={temporalData} />

      <DataGridViewTemp
        limited
        link="/organizations/organizations_list"
        title="Organizations"
        rows={rows}
        columns={columns}
        dropdownData={dropdownData}
        hasSearch
        hasFilter
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
    col2: 'Apple',
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
    col2: 'Master Card',
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
    headerName: 'Name of Organisation',
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
    headerName: 'Services',
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
    headerName: 'Transactions{N}',
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
    headerName: 'Action.',
    minWidth: 100,
    flex: 1,
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

        Router.push(`/organizations/${thisRow.col1}`)
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

// FIXME: Temp data (should be replaced with real data)
const temporalData = [
  {
    amount: '194',
    title: 'Organizations',
    link: '/organizations/organizations_list',
  },
  {
    amount: '143843938',
    title: 'Total Transactions',
  },
  {
    amount: '109313',
    title: 'Completed Transactions',
  },
  {
    amount: '132',
    title: 'Pending Transactions',
  },
]

// Tailwind Styles
const Ttile = tw.h1`text-gray-dark tracking-[-0.05em] text-2xl lg:text-[28px] xl:(text-[32px])`
const TitleSpan = tw.span`block text-light-dark text-sm font-normal mt-1.5 tracking-normal lg:(text-base) xl:mt-3`
const MUIButton = tw(
  Button,
)`bg-paysure-100 text-white normal-case rounded-lg p-3 pl-3.5 text-[13px] hover:(bg-paysure-100 ring-2 ring-offset-2 ring-paysure-100)`

export default OrganizationsDashboard
