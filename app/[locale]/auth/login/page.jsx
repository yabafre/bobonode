import React from "react"
import Image from "next/image"
import Link from "next/link"
import FormLogin from "@/components/auth/FormLogin"
import { useSession, signIn, signOut } from "next-auth/react"


export default function AuthenticationPage() {
  return (
    <>
      <div className="text-dark h-screen w-full p-6 flex flex-col justify-center items-center space-y-6">
        <FormLogin />
      </div>
    </>
  )
}

