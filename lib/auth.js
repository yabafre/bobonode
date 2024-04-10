// Auth provider for NextAuth

import NextAuth from "next-auth"
import FormData from "form-data"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { SymfoboClient } from "@/lib/config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db"
import ApiAdapter from "@core/hooks/UserAdapter"

const githubId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
const githubSecret = process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET

const AUTH_SECRET = process.env.NEXT_PUBLIC_AUTH_SECRET

if (!githubId || !githubSecret) {
    throw new Error("Missing environment variables for GitHub OAuth")
}

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing environment variables for Google OAuth")
}

if (!AUTH_SECRET) {
    throw new Error("Missing environment variable AUTH_SECRET")
}


export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    providers: [
      CredentialsProvider({
        name: "ApiCredentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const formData = {
            email: credentials.email,
            password: credentials.password,
          }

          try {
            const authResponse = await SymfoboClient.post("/auth/login", JSON.stringify(formData), {
              headers: {
                "Content-Type": "application/json",
              }
            })
            const user = authResponse

            // console.log('User:', user)

            if (!user) {
              return null
            }
            return {
              name: user.name,
              email: user.email,
              image: user.image,
              role: user.role,
              access_token: user.access_token,
            }
          } catch (error) {
            console.error('Error during authorization:', error)
            throw error
          }
        },
      }),
      GitHub({
        clientId: githubId,
        clientSecret: githubSecret,
    }),
      Google({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET
      })
    ],
    session: {
      strategy: "jwt",
    },
    debug: true,
    pages: {
      signIn: "/auth/login",
    },
    secret: AUTH_SECRET,
    callbacks: {
    async jwt({ token, user, account, profile, isNewUser}) {
      console.log('JWT Callback:', token, account, user, profile, isNewUser)
      if (user) {
        token.user = user;
      }
      if(account){
        token.accessToken = account.access_token;
      }

      return token
    },
    async session({ session, user,token }) {
      console.log('Session Callback:', session, user, token)
      session.user = token.user;
      if (token.access_token) {
        session.access_token = token.access_token;
      }
      return session
    },
  },
})

