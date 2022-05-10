import moment from 'moment'
import uid from 'generate-unique-id'
import { parseCookies } from 'nookies'

import { makeEncryptedRequest } from '../../../../utils/makeEncryptedRequest'

export default async function providerStats(req, res) {
  const { USER_AUTHORIZATION } = parseCookies({ req })

  const {
    providerName,
    fromDate = moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
    toDate = moment().format('YYYY-MM-DD 12:00:00'),
    page = 1,
  } = req.query

  try {
    const response = await makeEncryptedRequest(
      {
        requestId: uid({ length: 20 }),
        fromDate: fromDate,
        toDate: toDate,
        pageId: page,
        pageSize: 10,
        provider: providerName,
      },
      'paysure/api/processor/each-provider',
      'POST',
      USER_AUTHORIZATION,
    )

    res.status(response.status).json(response.data)
  } catch (error) {
    error && res.json(error)
  }
}
