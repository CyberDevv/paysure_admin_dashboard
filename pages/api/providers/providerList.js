import { parseCookies } from 'nookies'

import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function providerList(req, res) {
  const { USER_AUTHORIZATION } = parseCookies({ req })

  try {
    const response = await makeEncryptedRequest(
      {
        fromDate: moment().subtract(30, 'days').format('YYYY-MM-DD hh:mm:ss'),
        toDate: moment().format('YYYY-MM-DD hh:mm:ss'),
        pageId: 1,
        pageSize: 5,
        searchKey: '',
      },
      'paysure/api/processor/list-providers',
      'POST',
      USER_AUTHORIZATION,
    )
    // console.log("🚀 ~ file: providerList.js ~ line 17 ~ providerList ~ response", response)

    res.status(response.status).json(response.data)
  } catch (error) {
    error && res.json(error)
  }
}
