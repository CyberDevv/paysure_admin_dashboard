import { parseCookies } from 'nookies'

import { makeEncryptedRequest } from '../../../../utils/makeEncryptedRequest'

export default async function providerStats(req, res) {
  const { USER_AUTHORIZATION } = parseCookies({ req })

  try {
    const response = await makeEncryptedRequest(
      {
        fromDate: moment().subtract(400, 'days').format('YYYY-MM-DD 12:00:00'),
        toDate: moment().format('YYYY-MM-DD 23:59:59'),
        status: 0,
        pageId: 1,
        pageSize: 5,
        terminalId: terminalId,
      },
      'paysure/api/processor/lookup-mappedterminal-stats',
      'POST',
      USER_AUTHORIZATION,
    )

    res.status(response.status).json(response.data)
  } catch (error) {
    error && res.json(error)
  }
}
