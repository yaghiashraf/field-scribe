"use server";

import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createCheckoutSession(_formData?: FormData) {
  // Use the provided Product ID if env var is missing, or use the env var
  let priceId = process.env.STRIPE_PRICE_ID || "prod_U0ZahzawYulNNp";

  if (!priceId) {
    redirect("/dashboard?error=stripe_setup_missing");
  }

  // Handle Product IDs (prod_...) by fetching their default price
  if (priceId.startsWith("prod_")) {
    try {
      const prices = await stripe.prices.list({
        product: priceId,
        active: true,
        limit: 1,
      });

      if (prices.data.length > 0) {
        priceId = prices.data[0].id;
      } else {
        console.error(`[FieldScribe] No active prices found for product ${priceId}`);
        redirect(`/?payment_error=true&error=product_has_no_price`);
      }
    } catch (err) {
      console.error("[FieldScribe] Error fetching price for product:", err);
      redirect(`/?payment_error=true&error=invalid_product_config`);
    }
  }

  const headersList = await headers();

  const origin = (() => {
    const raw = headersList.get("origin");
    if (raw) return raw;
    const proto = headersList.get("x-forwarded-proto") ?? "https";
    const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
    if (host) return `${proto}://${host}`;
    return "http://localhost:3000";
  })();

  let sessionUrl: string | undefined;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${origin}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      allow_promotion_codes: true,
      customer_creation: "always",
      billing_address_collection: "auto",
    });

    if (session.url) {
      sessionUrl = session.url;
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[FieldScribe] Stripe checkout error:", msg);
    redirect(`/?payment_error=true&error=${encodeURIComponent(msg)}`);
  }

  if (sessionUrl) {
    redirect(sessionUrl);
  } else {
    redirect("/?payment_error=true&reason=no_url");
  }
}
