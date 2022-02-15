import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function addTerminal(req, res) {
  try {
    const { terminalId, terminalBrand, terminalSerialNo, bankId } = req.body

    const response = await makeEncryptedRequest(
      { terminalId, terminalBrand, terminalSerialNo, bankId },
      'paysure/api/processor/create-terminal-info',
      'POST',
    )

    res.status(response.status).json(response)
  } catch (error) {
    console.log(error.response.data)
  }
}
