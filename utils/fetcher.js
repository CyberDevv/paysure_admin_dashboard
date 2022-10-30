import axios from 'axios'

export async function fetcher(USER_TOKEN, method, url) {
  if (!USER_TOKEN) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

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
        console.log(err.response.data)
        return { data: err.response.data }
      })

    if (response.data.status === 401) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }

    return response
  }
}
