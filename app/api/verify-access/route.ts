import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.redirect(`${origin}/?payment_error=true`);
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.redirect(`${origin}/?payment_error=true`);
    }

    // Payment verified — set a long-lived access cookie and send to dashboard
    const response = NextResponse.redirect(`${origin}/dashboard?success=true`);
    response.cookies.set("fs_access", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });
    return response;
  } catch (err) {
    console.error("[FieldScribe] verify-access error:", err);
    return NextResponse.redirect(`${origin}/?payment_error=true`);
  }
}
