import { makeEncryptedRequest } from '../../../utils/makeEncryptedRequest'

export default async function createProfile(req, res) {
  try {
    const profileData = {
      firstName: 'CyberDevv',
      lastName: 'CyberDevv',
      emailAddress: 'CyberDevvCyberDevv@gmail.com',
      state: 16,
      address1: 'Iyanal',
      partnerCode: '00000000',
      userRole: '01',
      fullName: 'CyberDevv CyberDevv',
      phonePri: '+2348022534558',
      schemeCode: '12345678',
      userName: 'evvCyberDevv@gmail.com',
    }

    const response = await makeEncryptedRequest(
      profileData,
      'paysure/api/processor/create-profile',
      'POST',
    )

    res.status(response.status).json(response)
  } catch (error) {
    console.log(error)
    // res.json(error)
  }
}
