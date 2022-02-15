import axios from 'axios'

export async function makePlainRequest(data, url, method) {
  try {
    if (method === 'POST') {
      // profile data to be sent to the server
      const toBeProcessedData = {
        key: process.env.KEY,
        iv: process.env.IV,
        data,
      }

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
        toBeProcessedData,
        REQ_HEADER,
      )

      return response.data
    }
  } catch (error) {
    return {
      status: error.response.status,
      errorDesc: error.response.data.errorDesc,
    }
  }
}
