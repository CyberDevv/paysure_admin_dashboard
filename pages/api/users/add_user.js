export default async function addUserAPI(req, res) {
  try {
    const {} = req.body

    console.log(process.env.BASE_URL)
  } catch (error) {
    console.log(error)
  }
}
