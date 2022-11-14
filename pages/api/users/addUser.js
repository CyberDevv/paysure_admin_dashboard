import Router from 'next/router'
import { parseCookies } from 'nookies'

import { fetcher } from '../../../utils/fetcher'

export default async function addTerminal(req, res) {
  const { USER_TOKEN } = parseCookies({ req })

  const {
    firstName,
    lastName,
    emailAddress,
    phonePri,
    address1,
    DOB,
    state,
    city,
  } = req.body

  await fetcher(
    USER_TOKEN,
    'POST',
    '/apis/v1/paysure/admin/users/new/addUser',
    {
      firstname: firstName,
      lastname: lastName,
      email: emailAddress,
      phonenumber: phonePri,
      dob: DOB,
      businessaddress: address1,
      state,
      city,
      accountholder: '',
      accountnumber: '',
      addedBy: '',
      aggregatorReferralCode: '',
      approved: '',
      approvedby: '',
      bankcode: '',
      bankname: '',
      businessname: '',
      businessphone: '',
      businesstype: '',
      bvn: '',
      cacnumber: '',
      clusterManager: '',
      fullname: firstName + ' ' + lastName,
      gender: '',
      housenumber: '',
      landmark: '',
      latitude: '',
      lga: '',
      lgacode: '',
      locationUrl: '',
      longitude: '',
      maxamountperday: '',
      middlename: '',
      nin: '',
      password: '',
      pictureUrl: '',
      pin: '',
      serialnumber: '',
      settlementPlan: '',
      signatureUrl: '',
      state: '',
      streetname: '',
      timestamp: '',
      usertype: '',
    },
  )
    .then(response => {
      res.status(response.status).json(response.data)
    })
    .catch(err => {
      console.log(err.data)
      if (err.status === 401) {
        Router.push('/login')
        return
      }
      res.status(err.status).send(err.data)
    })
}
