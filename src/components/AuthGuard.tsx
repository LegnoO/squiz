"use client";

import { useEffect } from "react";
import {
  useRouter,
  usePathname,
  redirect,
  useSearchParams,
} from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const protectedRoutes = ["/signin", "/signup"];

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  // console.log(params);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!protectedRoutes.includes(pathname)) {
    //   redirect("/");
    }
  }, []);

  return <>{children}</>;
}
