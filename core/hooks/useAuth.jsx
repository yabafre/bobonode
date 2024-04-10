"use client"

// core/hooks/useAuth.jsx

import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export const useAuth = (roleRequired) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setIsRouterReady(true);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (!isRouterReady) return; // Attendre que le router soit prêt

    if (status === "loading") return; // Attendre que NextAuth finisse de charger
    if (status === "unauthenticated") {
      signIn(); // Si non connecté, rediriger vers la page de connexion
    } else if (session && (!session.user.role || session.user.role !== roleRequired)) {
      router.push('/unauthorized'); // Rediriger vers une page "non autorisé" si le rôle ne correspond pas
    }
  }, [session, status, router, roleRequired, isRouterReady]);

  return { session, status };
};
