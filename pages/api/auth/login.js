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

    // if (req.method === 'POST') {
    //   // profile data to be sent to the server

    //   // request header
    //   const REQ_HEADER = {
    //     headers: {
    //       'Content-Type': 'application/json; charset=utf-8',
    //       Authorization: process.env.AUTHORIZATION,
    //       // USER_AUTHORIZATION: userData.jwt,
    //     },
    //   }

    //   axios
    //     .post(
    //       `${process.env.BASE_URL}/paysure/api/auth/encrypt`,
    //       { userName, password },
    //       REQ_HEADER,
    //     )
    //     .then(async res => {
    //       axios
    //         .post(
    //           `${process.env.BASE_URL}/paysure/api/processor/user-login`,
    //           JSON.stringify(res.data.toJibrish),
    //           REQ_HEADER,
    //         )
    //         .then(response => {
    //           console.log(response.data)
    //         })
    //         .catch(err => {
    //           if (err.response) {
    //             console.log(err.response.data.errorDesc)
    //           }
    //         })
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    //   console.log(email, password)
    // }
  } catch (error) {
    console.log(error.response.data)
  }
}
