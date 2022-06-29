import { parseCookies } from 'nookies'

import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function addTerminal(req, res) {
  const { USER_AUTHORIZATION } = parseCookies({ req })

  try {
    const {
      providerName,
      walletBalanceRefined,
      servicesCount,
      servicesDesc,
      emailAddress,
    } = req.body

    const response = await makeEncryptedRequest(
      {
        providerName,
        walletBalance: walletBalanceRefined,
        servicesCount,
        servicesDesc,
        providerEmail: emailAddress,
      },
      'paysure/api/processor/create-provider',
      'POST',
      USER_AUTHORIZATION,
    )

    res.status(response.status).json(response)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}
