import { auth } from "@/lib/auth"


// Path: app/api/protected/route.js


export const GET = auth((req, res) => {
  if(req.auth){
    return res.status(200).json({data: "Protected data"})
  }
  return res.status(401).json({message: "Not authenticated"})
})