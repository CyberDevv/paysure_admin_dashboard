import moment from 'moment'
import uid from 'generate-unique-id'
import { parseCookies } from 'nookies'

import { makeEncryptedRequest } from '../../../../utils/makeEncryptedRequest'

export default async function providerStats(req, res) {
  const { USER_AUTHORIZATION } = parseCookies({ req })

  const {
    providerName,
    fromDate = moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
    toDate = moment().format('YYYY-MM-DD 23:59:59'),
    page = 1,
    pageSize = 5,
    status = 0,
    search = '',
  } = req.query

  try {
    const response = await makeEncryptedRequest(
      {
        requestId: uid({ length: 20 }),
        fromDate: fromDate,
        toDate: toDate,
        pageId: page,
        pageSize: pageSize,
        provider: providerName,
        status: status,
        searchKey: search,
      },
      'paysure/api/processor/each-partner',
      'POST',
      USER_AUTHORIZATION,
    )

    res.status(response.status).json(response.data)
  } catch (error) {
    error && res.json(error)
  }
}
