"use client";

import { useEffect } from "react";
import {
  usePathname,
  redirect,
  useSearchParams,
  useRouter,
} from "next/navigation";
import { getTokenAccess } from "../services/auth";
import { getUserInfo } from "@/services/auth";
import { useAppDispatch } from "@/redux/hooks";
import { updateInfoUser } from "@/redux/features/userSlice";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const guestRoutes = ["/signin", "/signup", "/forgot-password"];
  const protectedRoutes = ["/quiz", "/settings"];
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const pathname = usePathname();
  const router = useRouter();

  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("jwt")!;
    const initAuth = async () => {
      if (isAuthenticated) {
        const { data } = await getUserInfo();

        if (data) {
          dispatch(updateInfoUser(data));
        }
      }
    };
    initAuth();
  }, []);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("jwt")!;
    const user = JSON.parse(localStorage.getItem("userData")!);

    // if user is logined
    if (user && isAuthenticated && guestRoutes.includes(pathname)) {
      redirect("/");
    }
    // if user is not logined
    if (!user && !isAuthenticated && protectedRoutes.includes(pathname)) {
      redirect("/signin");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <>{children}</>;
}
