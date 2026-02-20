import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // If user is trying to access dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const accessCookie = request.cookies.get("field-scribe-access");

    // Check if cookie exists and has correct value
    if (!accessCookie || accessCookie.value !== "granted") {
      // If not, redirect to home page with access_required param
      return NextResponse.redirect(new URL("/?access_required=true", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
