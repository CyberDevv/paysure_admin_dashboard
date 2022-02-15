import axios from 'axios'

export async function makeEmptyRequest(url, method) {
  try {
    if (method === 'POST') {
      // request header
      const REQ_HEADER = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: process.env.AUTHORIZATION,
          // USER_AUTHORIZATION: userData.jwt,
        },
      }

      const response = await axios.post(
        `${process.env.BASE_URL}/${url}`,
        // encryptedData,
        REQ_HEADER,
      )

      return response.data
    }
  } catch (error) {
    console.log(error)
    return {
      status: error.response.status,
      errorDesc: error.response.data.errorDesc,
    }
  }
}
