import { auth } from "@/lib/auth"


// Path: app/api/protected/route.js


export default async (req, res) => {
  const session = await auth(req, res)
  if (session) {
    return res. json("This is protected content.")
  }
  return res. status(401).json("You must be signed in.")
}