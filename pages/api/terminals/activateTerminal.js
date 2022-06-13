import { parseCookies } from 'nookies'

import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function providerStats(req, res) {
  const { USER_AUTHORIZATION } = parseCookies({ req })

  const { terminalId } = req.body

  try {
    const response = await makeEncryptedRequest(
      {
        terminalId,
      },
      'paysure/api/processor/enable-mapped-terminal',
      'POST',
      USER_AUTHORIZATION,
    )

    res.status(response.status).json(response.data)
  } catch (error) {
    error && res.json(error)
  }
}
