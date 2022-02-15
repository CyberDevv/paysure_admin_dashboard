import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function createPassword(req, res) {
  try {
    const { userName, otp, password, verifyPassword } = req.body

    const response = await makeEncryptedRequest(
      { userName, otp, password, verifyPassword },
      'paysure/api/processor/votp-n-force-change',
      'POST',
    )

    res.status(response.status).json(response)
  } catch (error) {
    res.json(error)
  }
}
