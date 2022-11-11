import Router from 'next/router'
import { parseCookies } from 'nookies'

import { fetcher } from '../../../utils/fetcher'

export default async function activate(req, res) {
  const { USER_TOKEN } = parseCookies({ req })

  const { userName } = req.body

  await fetcher(
    USER_TOKEN,
    'POST',
    '/apis/v1/paysure/users/admin/actions/activateUser',
    {
      // reason,
      userName,
    },
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
