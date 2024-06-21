"use client";

// ** React Imports
import { useEffect, useRef } from "react";

// ** Next Imports
import { usePathname, useRouter } from "next/navigation";

// ** Components
import nProgress from "nprogress";

export const useNavigationEvent = (onPathnameChange: () => void) => {
  const router = useRouter();
  const pathname = usePathname();
  const savedPathNameRef = useRef<string | null>(null);

  function goRoute(href: string) {
    nProgress.start();
    router.push(href);
  }

  useEffect(() => {
    if (savedPathNameRef.current !== pathname) {
      onPathnameChange();
      savedPathNameRef.current = pathname;
      nProgress.done();
    }
  }, [pathname, onPathnameChange]);

  return { goRoute };
};
