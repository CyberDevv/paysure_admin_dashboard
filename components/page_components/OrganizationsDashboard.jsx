import React from 'react'
import axios from 'axios'
import tw from 'twin.macro'
import Router from 'next/router'
import { toast } from 'react-toastify'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { DataGridViewTemp, HomeDisplayCard } from '..'
import Modal from '../layouts/modal_ayout/index.modal_layout'
import Layout from '../layouts/main_layout/index.main_layout'
import { Add, EditActionSVG, ViewActionSVG } from '../SVGIcons'
import Label from '../layouts/modal_ayout/LabelInput.main_layout'
import { fetchPartnerClass } from '../../features/partnerClassSlice'

const OrganizationsDashboard = ({ organizationList = [] }) => {
  const { trxInfo = [] } = organizationList

  const dispatch = useDispatch()

  React.useEffect(() => {
    // dispatch fetchPartnerClass
    dispatch(fetchPartnerClass())
  }, [dispatch])

  // useSelector
  const { partnerClass: partnerClassList = [] } = useSelector(
    state => state.partnerClass,
  )

  // array of partner class
  const partnerClassArray = partnerClassList.data?.map(item => {
    return {
      id: item.tid,
      code: item.code,
      title: item.description,
    }
  })

  // useState hook
  const [isaddModalOpened, setIsAddmodalOpened] = React.useState(false)
  const [firstName, setFirstName] = React.useState('Sapa')
  const [lastName, setLastName] = React.useState('United')
  const [email, setEmail] = React.useState('sapaunited@gmail.com')
  const [phone, setPhone] = React.useState('+2348072534657')
  const [domainName, setDomainName] = React.useState('https://sapa.com')
  const [partnerClass, setPartnerClass] = React.useState('')
  const [businessName, setBusinessName] = React.useState('Sapa and co.')
  const [contactemailaddress, setContactemailaddress] =
    React.useState('sapa@gmail.com')
  const [isLoading, setIsLoading] = React.useState(false)

  // functions
  const handSetIsAddmodalOpened = () => setIsAddmodalOpened(true)

  // handle add organization
  const handleAddOrganization = () => {
    // validation if all fields are filled
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      phone === '' ||
      domainName === '' ||
      partnerClass === '' ||
      businessName === '' ||
      contactemailaddress === ''
    ) {
      toast.error('Please fill all fields')
      return
    }

    // set loading
    setIsLoading(true)

    // fetching data
    axios
      .post('/api/organizatons/addOrganization', {
        firstName,
        lastName,
        email,
        phone,
        domainName,
        partnerClass,
        businessName,
        contactemailaddress,
      })
      .then(res => {
        toast.success('Organization added successfully')
        // set loading
        setIsLoading(false)
      })
      .catch(err => {
        // set loading
        setIsLoading(false)

        if (err.response.status === 917) {
          toast.error('Email not valid')
          return
        }

        if (err.response.status === 914) {
          toast.error('Phone number not valid')
          return
        }

        toast.error('Error adding organization')

        console.log(err.response)
      })
  }

  // rows
  let rows
  // check if providerList is an array
  if (Array.isArray(trxInfo)) {
    rows = trxInfo.map((organization, index) => {
      console.log('>>>> ' + organization)
      return {
        id: index,
        col1: index + 1,
        col2: organization.fullName,
        col3: organization.none,
        col4: organization.none,
        col5: organization.none,
        col6: organization.none,
        col7: organization.none,
        col8: organization.none,
        col9: organization.none,
        col10: '',
      }
    })
  } else {
    rows = []
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
            label="Business Name"
            type="text"
            placeholder="Business Name"
            value={businessName}
            setState={setBusinessName}
          />
          <Label
            label="Email Address"
            type="email"
            placeholder="yourBusinessName@example.com"
            value={email}
            setState={setEmail}
          />
          <Label
            label="Contact Person First Name"
            type="text"
            placeholder="John"
            value={firstName}
            setState={setFirstName}
          />
          <Label
            label="Contact Person Last Name"
            type="text"
            placeholder="Smith"
            value={lastName}
            setState={setLastName}
          />
          <Label
            label="Contact Person Email Address"
            type="text"
            placeholder="johnSmith@example.com"
            value={contactemailaddress}
            setState={setContactemailaddress}
          />
          <Label
            label="Contact Person Phone Number"
            type="text"
            placeholder="+2348012123456"
            value={phone}
            setState={setPhone}
          />
          <Label
            label="Domain Name"
            type="tel"
            placeholder="https://yourBusinessName.com"
            value={domainName}
            setState={setDomainName}
          />
          <Label
            label="Partner Class"
            value={partnerClass}
            setState={setPartnerClass}
            combo
            partnerClass
            menuItems={partnerClassArray}
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
      />
    </Layout>
  )
}

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
