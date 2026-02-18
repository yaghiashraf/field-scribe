"use server";

import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function createCheckoutSession() {
  const headersList = await headers();
  const origin = headersList.get("origin") || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/dashboard?success=true`,
      cancel_url: `${origin}/?canceled=true`,
      automatic_tax: { enabled: true },
    });

    return { url: session.url };
  } catch (error) {
    console.error("Stripe Error:", error);
    return { error: "Failed to start checkout" };
  }
}
