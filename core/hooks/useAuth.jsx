"use server"

// core/hooks/useAuth.jsx

import { useSession, signIn, signOut } from "next-auth/react"


export const singOutAction = async () => {
    await signOut()
}

export const signInAction = async () => {
    await signIn()
}
