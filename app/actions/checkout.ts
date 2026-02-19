"use server";

import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createCheckoutSession(_formData?: FormData) {
  const priceId = process.env.STRIPE_PRICE_ID;

  // We cannot return data to the client if we are using this as a form action that might redirect.
  // Instead, we will redirect to an error page or back to dashboard with a query param if something fails.
  
  if (!priceId) {
    redirect("/dashboard?error=stripe_setup_missing");
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
    // In a server action, we can't easily alert, so we redirect to show the error
    redirect(`/?payment_error=true&error=${encodeURIComponent(msg)}`);
  }

  if (sessionUrl) {
    redirect(sessionUrl);
  } else {
    redirect("/?payment_error=true&reason=no_url");
  }
}
