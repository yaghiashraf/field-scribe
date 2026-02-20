"use server";

import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createCheckoutSession(_formData?: FormData) {
  let priceId = process.env.STRIPE_PRICE_ID || "prod_U0ZahzawYulNNp";

  // If no price ID at all, fail early
  if (!priceId) {
    console.error("[FieldScribe] No Stripe Price ID configured");
    redirect("/dashboard?error=stripe_setup_missing");
  }

  // Handle Product IDs (prod_...) by fetching their default price
  if (priceId.startsWith("prod_")) {
    try {
      // 1. First try to get the default_price directly from the product
      const product = await stripe.products.retrieve(priceId);
      
      if (typeof product.default_price === 'string') {
        priceId = product.default_price;
      } else if (product.default_price && typeof product.default_price === 'object') {
        priceId = product.default_price.id;
      } else {
        // 2. If no default_price, list active prices for this product
        console.log(`[FieldScribe] Product ${priceId} has no default_price, searching prices...`);
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
      }
    } catch (err) {
      console.error("[FieldScribe] Error fetching price for product:", err);
      // Don't redirect yet, let it try to fail naturally or return error
      // Actually we must redirect or throw in a server action if we can't proceed
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
      // 'customer_creation: always' is implicit for payment mode
      billing_address_collection: "auto",
    });

    if (session.url) {
      sessionUrl = session.url;
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[FieldScribe] Stripe checkout error:", msg);
    // Redirect to home with error parameter
    redirect(`/?payment_error=true&error=${encodeURIComponent(msg)}`);
  }

  if (sessionUrl) {
    redirect(sessionUrl);
  } else {
    console.error("[FieldScribe] No session URL returned from Stripe");
    redirect("/?payment_error=true&reason=no_url");
  }
}
