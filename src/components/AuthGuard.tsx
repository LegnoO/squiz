"use client";

import { useEffect } from "react";
import {
  usePathname,
  redirect,
  useSearchParams,
  useRouter,
} from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();
  const guestRoutes = ["/signin", "/signup", "/forgot-password"];
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("userData")!)
        : "";

    if (!token) {
      // if user is logined
      if (!guestRoutes.includes(pathname)) {
        router.replace("/signin");
      } 
    } else {
      if (guestRoutes.includes(pathname)) {
        router.replace("/");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (loading) {
    return <>loading...</>;
  }

  return <>{children}</>;
}
