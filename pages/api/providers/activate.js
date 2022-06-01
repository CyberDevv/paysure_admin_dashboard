import { parseCookies } from 'nookies'

import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function providerStats(req, res) {
  const { USER_AUTHORIZATION } = parseCookies({ req })

  const { providerName } = req.body

  try {
    const response = await makeEncryptedRequest(
      {
        providerName,
      },
      'paysure/api/processor/enable-provider',
      'POST',
      USER_AUTHORIZATION,
    )

    res.status(response.status).json(response.data)
  } catch (error) {
    error && res.json(error)
  }
}
