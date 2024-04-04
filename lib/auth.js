import GitHubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db"

const githubId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
const githubSecret = process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET

if (!githubId || !githubSecret) {
    throw new Error("Missing environment variables for GitHub OAuth")
}

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GitHubProvider({
            clientId: githubId,
            clientSecret: githubSecret,
        }),
    ],
    adapter: PrismaAdapter(prisma),
}

