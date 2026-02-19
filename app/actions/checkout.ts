"use server";

import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

type CheckoutResult =
  | { url: string; error?: never }
  | { error: string; url?: never };

export async function createCheckoutSession(): Promise<CheckoutResult> {
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!priceId) {
    return { url: "/dashboard?stripe_setup=true" };
  }

  const headersList = await headers();

  // Robustly determine origin — Vercel sets x-forwarded-host, not origin
  const origin = (() => {
    const raw = headersList.get("origin");
    if (raw) return raw;
    const proto = headersList.get("x-forwarded-proto") ?? "https";
    const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
    if (host) return `${proto}://${host}`;
    return "http://localhost:3000";
  })();

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${origin}/api/verify-access?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      allow_promotion_codes: true,
      customer_creation: "always",
      billing_address_collection: "auto",
    });

    if (!session.url) return { error: "Stripe did not return a checkout URL." };
    return { url: session.url };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[FieldScribe] Stripe checkout error:", msg);
    return { error: msg };
  }
}
