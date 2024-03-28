import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  // check auth, if not direct to home
  // if (protectedRoutes.includes(req.nextUrl.pathname)) {
  //   const absoluteURL = new URL("/", req.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }

  // const requestHeaders = new Headers(req.headers);
  // requestHeaders.set("Authorization", "Bearer hello");
}
