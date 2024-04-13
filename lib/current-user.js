import { auth } from "@/lib/auth"


export const currentUser = async () => {
  const { data: session } = await auth()

  if (!session?.user) {
    return null
  }

  const user = session.user

  return user
}

export const requireCurrentUser = async () => {
  const user = await currentUser()

  if (!user) {
    throw new Error("User is not authenticated")
  }

  return user
}