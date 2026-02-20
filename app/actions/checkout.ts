"use server";

import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createCheckoutSession(_formData?: FormData) {
  const priceId = process.env.STRIPE_PRICE_ID || "prod_U0ZahzawYulNNp";
  let errorMessage: string | null = null;
  let resolvedPriceId = priceId;

  // 1. Validation
  if (!priceId) {
    return redirect("/dashboard?error=stripe_setup_missing");
  }

  try {
    // 2. Resolve Product ID to Price ID
    if (priceId.startsWith("prod_")) {
        const product = await stripe.products.retrieve(priceId);
        
        if (typeof product.default_price === 'string') {
          resolvedPriceId = product.default_price;
        } else if (product.default_price && typeof product.default_price === 'object') {
          resolvedPriceId = product.default_price.id;
        } else {
          // Fallback: list active prices
          const prices = await stripe.prices.list({
            product: priceId,
            active: true,
            limit: 1,
          });

          if (prices.data.length > 0) {
            resolvedPriceId = prices.data[0].id;
          } else {
            errorMessage = `No active price found for product ${priceId}`;
          }
        }
    }
  } catch (err) {
    // This is the error seen in logs: "An error occurred with our connection to Stripe."
    // This usually means the API key is wrong OR network issue.
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[FieldScribe] Stripe product lookup failed:", msg);
    errorMessage = `Stripe connection error: ${msg}. Check your API keys.`;
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
      line_items: [{ price: resolvedPriceId, quantity: 1 }],
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

  // 4. Redirect
  if (sessionUrl) {
    redirect(sessionUrl);
  } else {
    redirect(`/?payment_error=true&error=${encodeURIComponent(errorMessage || "Unknown error")}`);
  }
}
