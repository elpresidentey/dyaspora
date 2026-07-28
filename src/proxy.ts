import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  "/", "/login", "/signup", "/forgot-password",
  "/events", "/flights", "/accommodation",
  "/restaurants", "/transport", "/tourism",
  "/cities", "/experiences", "/about",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
  const isApiRoute = pathname.startsWith("/api");
  const isStaticFile = pathname.startsWith("/_next") || pathname.startsWith("/images");

  if (isApiRoute || isStaticFile || isPublicRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
