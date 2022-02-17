import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function createPassword(req, res) {
  try {
    const { userName, otp, password, verifyPassword, pin, verifyPin } = req.body

    const response = await makeEncryptedRequest(
      { userName, otp, password, verifyPassword, pin, verifyPin },
      'paysure/api/processor/votp',
      'POST',
    )

    res.status(response.status).json(response)
  } catch (error) {
    res.json(error)
  }
}
