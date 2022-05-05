import { parseCookies } from 'nookies'

import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function providerStats(req, res) {
  const { USER_AUTHORIZATION } = parseCookies({ req })

  try {
    const response = await makeEncryptedRequest(
      {},
      'paysure/api/processor/lookup-provider-stats',
      'POST',
      USER_AUTHORIZATION,
    )
    // console.log(
    //   '🚀 ~ file: providerStats.js ~ line 15 ~ providerStats ~ response',
    //   response,
    // )

    res.status(response.status).json(response.data)
  } catch (error) {
    error && res.json(error)
  }
}
