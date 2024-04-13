import { createSafeActionClient } from "next-safe-action";
import { auth } from "@/lib/auth"

export const action = createSafeActionClient();


export const authentificationAction = createSafeActionClient({
  async middleware(){
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized")
    }

    return {
      userI: session.user.id,
    }
  }
})