import axios from 'axios'

export default async function loginAPI(req, res) {
  const { userName, password } = req.body

  axios
    .post(`${process.env.BASE_URL}/authenticate`, {
      password,
      username: userName,
    })
    .then(response => {
      console.log('Response from server >>>>', response)
      res.status(response.status).json(response)
    })
    .catch(error => {
      console.log('Error from server >>>>', error.response.data)
      res.status(error.response.status).json(error.response.data)
    })
}
