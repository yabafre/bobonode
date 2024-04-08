import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db"
import ApiAdapter from "@core/hook/UserAdapter"

const githubId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
const githubSecret = process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET

if (!githubId || !githubSecret) {
    throw new Error("Missing environment variables for GitHub OAuth")
}
export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            const authResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/callback/credentials`, {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" },
            })
          if (!authResponse.ok) {
            return null
          }
          const user = await authResponse.json()
          return user
        },
      }),
      GitHub({
        clientId: githubId,
        clientSecret: githubSecret,
    }),
      Google({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
      })
    ],
    session: { strategy: "jwt" },
    pages: {
      signIn: "/auth/login",
    },
    // adapter: ApiAdapter(process.env.NEXT_PUBLIC_API_BACKEND_URL),
})

