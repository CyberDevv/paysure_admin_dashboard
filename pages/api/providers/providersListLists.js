import moment from 'moment'
import { parseCookies } from 'nookies'

import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function providerList(req, res) {
  const { USER_AUTHORIZATION } = parseCookies({ req })

  const {
    fromDate = moment().subtract(30, 'days').format('YYYY-MM-DD 12:00:00'),
    toDate = moment().format('YYYY-MM-DD 23:59:59'),
    page = 1,
    pageSize = 10,
    searchKey = '',
  } = req.query

  try {
    const response = await makeEncryptedRequest(
      {
        fromDate: fromDate,
        toDate: toDate,
        pageId: page,
        pageSize: pageSize,
        searchKey: searchKey,
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
