"use client";

import { useEffect } from "react";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();
  const guestRoutes = ["/signin", "/signup", "/forgot-password"];
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const userData =
      typeof window !== "undefined"
        ? localStorage.getItem("userData")!
        : "";

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("jwt")!
        : "";

    if (!userData && !token && !guestRoutes.includes(pathname)) {
      // if user is logined
      router.replace("/signin");
    }

    if (userData && token && guestRoutes.includes(pathname)) {
      // if user not login
      router.replace("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (loading) {
    return <>loading...</>;
  }

  return <>{children}</>;
}
