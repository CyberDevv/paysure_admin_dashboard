import { makeEmptyRequest } from '../../../utils/makeEmptyRequest'

export default async function ListActiveRoles(req, res) {
  try {
    const response = await makeEmptyRequest(
      'paysure/api/processor/list-active-roles',
      'POST',
    )

    res.status(response.status).json(response)
  } catch (error) {
    console.log(error.response.data)
  }
}
