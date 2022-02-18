import { parseCookies } from 'nookies'

import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function ListAgents(req, res) {
  const { USER_AUTHORIZATION } = parseCookies({ req })

  try {
    const { status, fromDate, toDate, paramOne } = req.body

    const response = await makeEncryptedRequest(
      {
        status: 0,
        fromDate: '2021-01-01 00:00:00',
        toDate: '2022-03-31 23:59:59',
        paramOne: '',
      },
      'paysure/api/processor/list-agents-and-subscribers',
      'POST',
      USER_AUTHORIZATION,
    )

    res.status(response.status).json(response)
  } catch (error) {
    console.log(error)
  }
}
