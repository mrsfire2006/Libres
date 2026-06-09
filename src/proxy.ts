import { auth } from "@/../auth";
import { NextResponse } from "next/server";
import { ROUTES } from "./constants/constant";

const PROTECTED_PREFIXES = ["/profile", "/settings", "/checkout", ROUTES.MYLIBRARY];

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;
  const isProtectedRoute =
    PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
