// Auth provider for NextAuth

import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { SymfoboClient } from "@/lib/config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db"
// import ApiAdapter from "@core/hooks/UserAdapter"

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
    signIn,
    signOut,
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
            const authResponse = await SymfoboClient.post("/auth/login", JSON.stringify(formData))
            const user = authResponse

            // console.log('User:', user)

            if (!user) {
              return null
            }
            return {
              id: user.id,
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
    adapter: PrismaAdapter(prisma),
    pages: {
      signIn: "/auth/login",
    },
    secret: AUTH_SECRET,
    callbacks: {
      async jwt({ token, user, account, session}) {
        // console.log('JWT Callback:', token)
        // console.log('User:', user)
        // console.log('Account:', account)
        // console.log('Session:', session)
        if (user) {
          token.user = user;
        }
        if(account){
          token.accessToken = account.access_token;

        }

        return token
      },
      async session({ session,token }) {
        // console.log('Session Callback:', session, token)
        session.user = token.user;
        session.accessToken = token.accessToken;

        return session
      },
  },
})

