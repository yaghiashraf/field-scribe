"use server";

import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createCheckoutSession() {
  const headersList = await headers();
  const origin = (() => {
    const raw = headersList.get("origin");
    if (raw) return raw;
    const proto = headersList.get("x-forwarded-proto") ?? "https";
    const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
    if (host) return `${proto}://${host}`;
    return "http://localhost:3000";
  })();

  let sessionUrl: string | null = null;
  let errorMessage: string | null = null;

  try {
    // Create a Checkout Session with "Ad-Hoc" pricing
    // This allows us to define the product name and price directly in code,
    // overriding whatever might be misconfigured in the Stripe Dashboard (like the "ON" name).
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "FieldScribe Lifetime Access",
              description: "Unlimited reports, AI analysis, and voice-to-text. One-time payment.",
              images: ["https://field-scribe.vercel.app/icon.svg"],
            },
            unit_amount: 14900, // $149.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/access?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      customer_creation: "always",
    });

    sessionUrl = session.url;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[FieldScribe] Checkout error:", msg);
    errorMessage = msg;
  }

  if (sessionUrl) {
    redirect(sessionUrl);
  } else {
    // If we can't create a session (e.g. invalid API key), redirect with error
    const friendlyError = errorMessage?.includes("api_key") 
      ? "Payment service configuration error. Please contact support." 
      : errorMessage;
    redirect(`/?payment_error=true&error=${encodeURIComponent(friendlyError || "Unknown error")}`);
  }
}
