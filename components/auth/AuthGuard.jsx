"use client";
import React, { useEffect, useMemo, useState } from "react"
import {useSession} from "next-auth/react";
import {usePathname, useRouter} from "next/navigation";
import { Loading } from "@/components/common/Loanding"

export default function AuthGuard({children}) {
  const {data: status} = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  console.log('status', status)
  const guestRoutes = useMemo(() => [
    "/auth/login",
  ], []);

  useEffect(() => {
    const isGuestRoute = !!guestRoutes.find(route => route === pathname);
    setLoading(true);

    if (status === 'loading') {
      return;
    } else if (status === "authenticated" && isGuestRoute) {
      router.push("/");
    } else if (!status === "unauthenticated" && !isGuestRoute) {
      router.push("/auth/login");
    } else {
      setLoading(false);
    }
  }, [guestRoutes, pathname, router, status]);

  return (
    <>
      <div>
        {loading ? <div>..loading</div> : children}
      </div>
    </>
  );
};