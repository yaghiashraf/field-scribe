"use server";

import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createCheckoutSession() {
  const headersList = await headers();
  const origin = headersList.get("origin") || "http://localhost:3000";
  let sessionUrl: string | null = null;

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
    sessionUrl = session.url;
  } catch (error) {
    console.error("Stripe Error:", error);
    // In a real app, you might want to redirect to an error page
    throw new Error("Failed to start checkout");
  }

  if (sessionUrl) {
    redirect(sessionUrl);
  }
}
