import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function createProfile(req, res) {
  try {
    const profileData = {
      firstName: 'Hybee',
      lastName: 'Odesola',
      emailAddress: 'smarthibee@gmail.com',
      state: 1,
      address1: 'Ibadan, felele',
      partnerCode: '00000000',
      userRole: '06',
      fullName: 'Odesola Hybee',
      phonePri: '+2348072534558',
      schemeCode: '12345678',
      userName: 'smibee@gmail.com',
    }

    const response = await makeEncryptedRequest(
      profileData,
      'paysure/api/processor/create-profile',
      'POST',
    )

    res.status(response.status).json(response)
  } catch (error) {
    res.json(error)
  }
}
