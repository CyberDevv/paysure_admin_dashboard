import axios from 'axios'

export default async function loginAPI(req, res) {
  const { userName, password } = req.body

  axios
    .post(`${process.env.BASE_URL}/authenticate`, {
      username: userName,
      password,
    })
    .then(response => {
      // console.log('Response from server >>>>', response.data)
      res.status(response.status).json(response.data)
    })
    .catch(err => {
      if (err) {
        // console.log('Error from server >>>>', err.response.data)
        res.status(err.response.data.status).send(err.response.data)
      }
    })
}
