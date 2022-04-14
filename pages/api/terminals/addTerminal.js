import { parseCookies } from 'nookies'

import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function addTerminal(req, res) {
  const { USER_AUTHORIZATION } = parseCookies({ req })

  try {
    const { terminalId, terminalBrand, terminalSerialNo, bankId } = req.body

    const response = await makeEncryptedRequest(
      { terminalId, terminalBrand, terminalSerialNo, bankId },
      'paysure/api/processor/create-terminal-info',
      'POST',
      USER_AUTHORIZATION,
    )

    console.log(terminalId, terminalBrand, terminalSerialNo, bankId)

    console.log(response)

    res.status(301).json(response)
  } catch (error) {
    console.log(error)
  }
}
