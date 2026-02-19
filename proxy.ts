import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const accessCookie = request.cookies.get("fs_access");

    // Developer bypass: FIELDSCRIBE_SKIP_AUTH=true skips cookie check
    const skipAuth = process.env.FIELDSCRIBE_SKIP_AUTH === "true";

    if (!accessCookie?.value && !skipAuth) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.search = "?access_required=true";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
