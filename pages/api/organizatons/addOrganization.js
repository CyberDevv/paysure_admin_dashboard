import uid from 'generate-unique-id'
import { parseCookies } from 'nookies'

import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function addOrganizaion(req, res) {
  const { USER_AUTHORIZATION } = parseCookies({ req })

  try {
    const { name, email, phone, address, logoURL, abbreviation } = req.body

    const response = await makeEncryptedRequest(
      {
        fullName: name,
        emailAddress: email,
        phonePri: phone,
        address1: address,
        logoUrl: logoURL,
        abbrv: abbreviation,
        partnerCode: uid({ length: 20 }),
        partnerClass: 'AGGREGATOR',
      },
      'paysure/api/processor/create-partner',
      'POST',
      USER_AUTHORIZATION,
    )

    console.log(response)

    res.status(response.status).json(response)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}
