'use client'
import {Button} from "@/components/ui/button";
import { useSession, signIn, signUp, signOut } from "next-auth/react"

export const LoginButton = function LoginButton() {
    const { data: session } = useSession()
    if (session) {
        return (
          <>
              Signed in as {session.user.email} <br />
              <Button onClick={() => signOut()}>Sign out</Button>
          </>
        )
    }
    return (
      <>
          Not signed in <br />
          <Button onClick={() => signIn()}>Sign in</Button>
      </>
    )
}