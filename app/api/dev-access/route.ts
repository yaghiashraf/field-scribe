import { NextResponse } from "next/server";

/**
 * Developer-only route to bypass payment and access the dashboard.
 * Only works when FIELDSCRIBE_SKIP_AUTH=true is set in environment.
 * NEVER set this in production.
 *
 * Usage: GET /api/dev-access
 */
export async function GET(request: Request) {
  if (process.env.FIELDSCRIBE_SKIP_AUTH !== "true") {
    return NextResponse.json(
      { error: "Not available in production." },
      { status: 403 }
    );
  }

  const { origin } = new URL(request.url);
  const response = NextResponse.redirect(`${origin}/dashboard`);
  response.cookies.set("fs_access", "dev_bypass", {
    httpOnly: true,
    secure: false, // allow http in local dev
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });
  return response;
}
