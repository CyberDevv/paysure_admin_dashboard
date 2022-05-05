// import { makePlainRequest } from '../../../utils/makePlainReques'

// export default async function ListActiveRoles(req, res) {
//   try {
//     const { status, fromDate, toDate } = req.body

//     const response = await makePlainRequest(
//       { status, fromDate, toDate },
//       'paysure/api/processor/list-terminal-info',
//       'POST',
//     )

//     res.status(response.status).json(response)
//   } catch (error) {
//     console.log(error.response.data)
//   }
// }
