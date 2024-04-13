"use server";

import { z } from "zod";
import { action } from "@/lib/safe-action";
import { auth } from "@/lib/auth"
import { signIn } from "@/lib/auth"
import { useRouter} from "next/navigation"

// Ce schéma est utilisé pour valider les données entrantes.
const schemaLogin = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const loginUserAdmin = action(schemaLogin, async ({ email, password }) => {

  const user = await signIn('credentials', {
    email,
    password,
    callbackUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/admin_5dhb8A1a/dashboard`,
  });

  if (!user) {
    return {
      failure: "Incorrect credentials",
    };
  }

  return {
    success: "Successfully logged in",
  };

});