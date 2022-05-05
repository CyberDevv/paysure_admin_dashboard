import { parseCookies } from 'nookies'

import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function providerList(req, res) {
  const { USER_AUTHORIZATION } = parseCookies({ req })

  try {
    const response = await makeEncryptedRequest(
      {
        searchKey: '',
      },
      'paysure/api/processor/list-providers',
      'POST',
      USER_AUTHORIZATION,
    )
    // console.log("🚀 ~ file: providerList.js ~ line 17 ~ providerList ~ response", response)

    res.status(response.status).json(response.data)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}
