import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  const { pathname } = req.nextUrl;

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isLoginRoute = pathname === "/login";

  if (isDashboardRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const verified = await verifyToken(token);

    if (!verified) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (isLoginRoute && token) {
    const verified = await verifyToken(token);

    if (verified) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
