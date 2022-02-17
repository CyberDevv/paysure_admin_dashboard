import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function loginAPI(req, res) {
  try {
    const { userName, password } = req.body

    const response = await makeEncryptedRequest(
      { userName, password },
      'paysure/api/processor/user-login',
      'POST',
    )

    res.status(response.status).json(response)
  } catch (error) {
    console.log(error)
  }
}
