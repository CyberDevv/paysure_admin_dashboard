export default async function signupAPI(req, res) {
  try {
    const { email, password } = req.body

    console.log(email, password)
  } catch (error) {
    console.log(error)
  }
}
