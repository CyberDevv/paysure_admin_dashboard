import { parseCookies } from 'nookies'

import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function ListActiveRoles(req, res) {
  const { USER_AUTHORIZATION } = parseCookies({ req })

  try {
    const response = await makeEncryptedRequest(
      {},
      'paysure/api/processor/list-active-roles',
      'POST',
      USER_AUTHORIZATION,
    )

    res.status(response.status).json(response)
  } catch (error) {
    console.log(error.response.data)
  }
}