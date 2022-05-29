import uid from 'generate-unique-id'
import { parseCookies } from 'nookies'

import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function addOrganizaion(req, res) {
  const { USER_AUTHORIZATION } = parseCookies({ req })

  try {
    const {
      firstName,
      lastName,
      email,
      businessName,
      contactemailaddress,
      phone,
      domainName,
      partnerClass,
    } = req.body

    const response = await makeEncryptedRequest(
      {
        partnerClass: partnerClass,
        domainName: domainName,
        emailAddress: email,
        contactEmailAddress: contactemailaddress,
        contactFirstName: firstName,
        contactLastName: lastName,
        fullName: businessName,
        contactPhonePri: phone,
      },
      'paysure/api/processor/create-partner',
      'POST',
      USER_AUTHORIZATION,
    )

    res.status(response.status).json(response)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}
