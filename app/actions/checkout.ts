"use server";

import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createCheckoutSession() {
  const headersList = await headers();
  const origin = headersList.get("origin") || "http://localhost:3000";

  // Validate Stripe is configured
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!secretKey || secretKey === "sk_test_placeholder") {
    console.error("[FieldScribe] STRIPE_SECRET_KEY not set");
    throw new Error("Payment system not configured. Contact support.");
  }

  if (!priceId) {
    console.error("[FieldScribe] STRIPE_PRICE_ID not set");
    throw new Error("Product not configured. Contact support.");
  }

  let sessionUrl: string | null = null;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/dashboard?success=true`,
      cancel_url: `${origin}/?canceled=true`,
      automatic_tax: { enabled: true },
      // Test mode: allow promotion codes for easy testing
      allow_promotion_codes: true,
    });
    sessionUrl = session.url;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[FieldScribe] Stripe Error:", msg);
    throw new Error("Failed to create checkout session. Please try again.");
  }

  if (sessionUrl) {
    redirect(sessionUrl);
  }
}
