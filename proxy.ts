import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect the dashboard — only allow if fs_access cookie is set
  if (pathname.startsWith("/dashboard")) {
    const accessCookie = request.cookies.get("fs_access");
    if (!accessCookie?.value) {
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
