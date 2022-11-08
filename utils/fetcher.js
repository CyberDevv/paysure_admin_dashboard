import axios from 'axios'

export async function fetcher(USER_TOKEN, method, url, data) {
  if (method === 'GET') {
    // fetch data from server
    const response = await axios
      .get(`${process.env.BASE_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${USER_TOKEN}`,
        },
      })
      .then(res => {
        return res
      })
      .catch(err => {
        if (err.response) {
          console.log({ data: err.response.data, status: err.response.status })
          return { data: err.response.data, status: err.response.status }
        } else {
          console.log({ data: err })
          return { data: err }
        }
      })

    return response
  } else {
    // post data to server
    const response = await axios
      .post(`${process.env.BASE_URL}${url}`, data, {
        headers: {
          Authorization: `Bearer ${USER_TOKEN}`,
        },
      })
      .then(res => {
        return res
      })
      .catch(err => {
        if (err.response) {
          console.log({ data: err.response.data, status: err.response.status })
          return { data: err.response.data, status: err.response.status }
        } else {
          console.log({ data: err })
          return { data: err }
        }
      })

    return response
  }
}
