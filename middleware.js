import { NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/auth/login", "/auth/signup", "/auth/otp", "/"];

export default async function middleware(req) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  const userIsAuthenticated = session?.userId;
  const isSignupComplete = session?.isSignupComplete;

  // Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute && !userIsAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  // Redirect authenticated users who have completed signup away from public auth routes
  if (isPublicRoute && userIsAuthenticated && isSignupComplete) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // Allow users who are authenticated but have not completed signup to access the signup page
  if (path === "/auth/signup" && userIsAuthenticated && !isSignupComplete) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
