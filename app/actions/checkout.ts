"use server";

import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createCheckoutSession() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;

  // Stripe not configured — send user to dashboard with a setup notice
  if (!secretKey || secretKey === "sk_test_placeholder" || !priceId) {
    redirect("/dashboard?stripe_setup=true");
  }

  const headersList = await headers();
  const origin = headersList.get("origin") || "http://localhost:3000";

  // Attempt to create the Stripe session; capture errors gracefully
  let sessionUrl: string | null = null;
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${origin}/api/verify-access?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      automatic_tax: { enabled: true },
      allow_promotion_codes: true,
    });
    sessionUrl = session.url;
  } catch (err) {
    console.error("[FieldScribe] Stripe checkout error:", err instanceof Error ? err.message : err);
    // sessionUrl stays null — handled below
  }

  // Redirect outside try/catch so Next.js redirect signals propagate correctly
  redirect(sessionUrl ?? "/?payment_error=true");
}
