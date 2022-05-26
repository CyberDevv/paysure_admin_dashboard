import moment from 'moment'
import { parseCookies } from 'nookies'

import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function providerList(req, res) {
  const { USER_AUTHORIZATION } = parseCookies({ req })

  try {
    const response = await makeEncryptedRequest(
      {
        fromDate: moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
        toDate: moment().format('YYYY-MM-DD 23:59:59'),
        pageId: 1,
        pageSize: 5,
        searchKey: '',
        status: 1,
      },
      'paysure/api/processor/list-providers',
      'POST',
      USER_AUTHORIZATION,
    )

    res.status(response.status).json(response.data)
  } catch (error) {
    error && res.json(error)
  }
}
