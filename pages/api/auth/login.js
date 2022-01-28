export default async function loginAPI(req, res) {
  try {
    const { email, password } = req.body

    console.log(email, password)
  } catch (error) {
    console.log(error)
  }
}
