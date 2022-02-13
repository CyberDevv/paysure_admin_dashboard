import axios from 'axios'

export default async function createProfile(req, res) {
  try {
    if (req.method === 'POST') {
      // profile data to be sent to the server
      const profileData = {
        key: process.env.KEY,
        iv: process.env.IV,
        toJibrish: JSON.stringify({
          firstName: 'rahim',
          lastName: 'sola',
          emailAddress: 'tocyv@gmail.com',
          state: 1,
          address1: 'Ifelele',
          partnerCode: '00000000',
          userRole: '06',
          fullName: 'Osola Ibrim',
          phonePri: '+234807334558',
          schemeCode: '12345678',
          userName: 'toyev@gmail.com',
        }),
      }

      // request header
      const REQ_HEADER = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: process.env.AUTHORIZATION,
          // USER_AUTHORIZATION: userData.jwt,
        },
      }

      axios
        .post(
          `${process.env.BASE_URL}/paysure/api/auth/encrypt`,
          profileData,
          REQ_HEADER,
        )
        .then(async res => {
          axios
            .post(
              `${process.env.BASE_URL}/paysure/api/processor/create-profile`,
              JSON.stringify(res.data.toJibrish),
              REQ_HEADER,
            )
            .then(response => {
              console.log(response.data)
            })
            .catch(err => {
              if (err.response) {
                console.log(err.response.data.errorDesc)
              }
            })
        })
        .catch(err => {
          console.log(err)
        })
    }
  } catch (error) {
    console.log(error)
  }
}
