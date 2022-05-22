import moment from 'moment'
import uid from 'generate-unique-id'
import { parseCookies } from 'nookies'

import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function providerStats(req, res) {
  const { USER_AUTHORIZATION } = parseCookies({ req })

  try {
    const response = await makeEncryptedRequest(
      {
        requestId: uid({ length: 20 }),
        fromDate: moment().subtract(30, 'days').format('YYYY-MM-DD hh:mm:ss'),
        toDate: moment().format('YYYY-MM-DD hh:mm:ss'),
        pageId: 1,
        pageSize: 5,
      },
      'paysure/api/processor/admin-dashboard-stats-with-grid',
      'POST',
      USER_AUTHORIZATION,
    )

    res.status(response.status).json(response.data)
  } catch (error) {
    error && res.json(error)
  }
}
