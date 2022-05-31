import { parseCookies } from 'nookies'

import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function providerStats(req, res) {
  const { USER_AUTHORIZATION } = parseCookies({ req })

  const { phone, email } = req.body

  try {
    const response = await makeEncryptedRequest(
      { phonenumberpri: phone, emailaddress: email },
      'paysure/api/processor/do-suspend-user',
      'POST',
      USER_AUTHORIZATION,
    )

    res.status(response.status).json(response.data)
  } catch (error) {
    error && res.json(error)
  }
}
