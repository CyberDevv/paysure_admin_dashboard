import { parseCookies } from 'nookies'

import { fetcher } from '../../../utils/fetcher'

export default async function providerStats(req, res) {
  const { USER_TOKEN } = parseCookies({ req })

  await fetcher(
    USER_TOKEN,
    'GET',
    '/apis/v1/paysure/users/admin/adminUserDasboard/analytics',
  )
    .then(response => {
      res.status(response.status).json(response.data)
    })
    .catch(err => {
      console.log(err.data)
      if (err.status === 401) {
        Router.push('/login')
        return
      }
      res.status(err.status).send(err.data)
    })
}
