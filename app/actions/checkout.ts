"use server";

import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createCheckoutSession(_formData?: FormData) {
  let priceId = process.env.STRIPE_PRICE_ID || "prod_U0ZahzawYulNNp";
  let errorMessage: string | null = null;

  // 1. Validation
  if (!priceId) {
    return redirect("/dashboard?error=stripe_setup_missing");
  }

  // 2. Resolve Product ID to Price ID
  if (priceId.startsWith("prod_")) {
    try {
      const product = await stripe.products.retrieve(priceId);
      
      if (typeof product.default_price === 'string') {
        priceId = product.default_price;
      } else if (product.default_price && typeof product.default_price === 'object') {
        priceId = product.default_price.id;
      } else {
        const prices = await stripe.prices.list({
          product: priceId,
          active: true,
          limit: 1,
        });

        if (prices.data.length > 0) {
          priceId = prices.data[0].id;
        } else {
          errorMessage = `No active price found for product ${priceId}`;
        }
      }
    } catch (err) {
      console.error("[FieldScribe] Product lookup failed:", err);
      errorMessage = `Invalid Product ID: ${priceId}. Ensure your API Key matches the environment (Test/Live) where this product exists.`;
    }
  }

  if (errorMessage) {
    return redirect(`/?payment_error=true&error=${encodeURIComponent(errorMessage)}`);
  }

  // 3. Create Checkout Session
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

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${origin}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
    });
    sessionUrl = session.url;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[FieldScribe] Checkout session creation failed:", msg);
    errorMessage = msg;
  }

  // 4. Redirect (Must happen outside try/catch)
  if (sessionUrl) {
    redirect(sessionUrl);
  } else {
    redirect(`/?payment_error=true&error=${encodeURIComponent(errorMessage || "Unknown error")}`);
  }
}
