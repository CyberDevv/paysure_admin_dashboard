import axios from 'axios'

export async function fetcher(USER_TOKEN, method, url) {
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
        console.log({ data: err.response.data, status: err.response.status })
        return { data: err.response.data, status: err.response.status }
      })

    return response
  }
}
