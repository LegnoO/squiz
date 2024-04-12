"use client";

import { useEffect } from "react";
import {
  usePathname,
  redirect,
  useSearchParams,
  useRouter,
} from "next/navigation";
import { getTokenAccess } from "../services/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const guestRoutes = ["/signin", "/signup", "/forgot-password"];
  const protectedRoutes = ["/quiz", "/settings"];
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData")!);

    const access_token = getTokenAccess();
    // if user is logined
    if (user && access_token && guestRoutes.includes(pathname)) {
      redirect("/");
    }
    // if user is not logined
    if (!user && !access_token && protectedRoutes.includes(pathname)) {
      redirect("/signin");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <>{children}</>;
}
