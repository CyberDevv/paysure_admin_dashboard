import axios from 'axios'
import { toast } from 'react-toastify'

export async function makeEncryptedRequest(data, url, method, token) {
  try {
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
          USER_AUTHORIZATION: token,
        },
      }

      const response = await axios.post(
        `${process.env.BASE_URL}/paysure/api/auth/encrypt`,
        toBeProcessedData,
        REQ_HEADER,
      )

      const encryptedData = response.data.toJibrish

      const response2 = await axios.post(
        `${process.env.BASE_URL}/${url}`,
        encryptedData,
        REQ_HEADER,
      )

      return {
        status: response2.status,
        data: response2.data,
      }
    }
  } catch (error) {
    return {
      status: error.response.status,
      data: error.response.data.errorDesc,
    }
  }
}
