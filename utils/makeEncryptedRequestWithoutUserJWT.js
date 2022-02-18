import axios from 'axios'

export async function makeEncryptedRequestWithoutUserJWT(data, url, method) {
  if (method === 'POST') {
    // profile data to be sent to the server
    const toBeProcessedData = {
      key: process.env.KEY,
      iv: process.env.IV,
      toJibrish: JSON.stringify(data),
    }

    // request header
    const REQ_HEADER = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: process.env.AUTHORIZATION,
      },
    }

    const AceResponse = await axios
      .post(
        `${process.env.BASE_URL}/paysure/api/auth/encrypt`,
        toBeProcessedData,
        REQ_HEADER,
      )
      .then(async response => {
        const res = await axios.post(
          `${process.env.BASE_URL}/${url}`,
          response.data.toJibrish,
          REQ_HEADER,
        )

        return {
          status: res.status,
          data: res.data,
        }
      })
      .catch(error => {
        return {
          status: error.response.status,
          data: error.response.data,
        }
      })

    // console.log(AceResponse.status)
    // console.log(AceResponse.data)

    return AceResponse
  }
}
