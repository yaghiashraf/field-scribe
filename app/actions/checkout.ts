"use server";

import { redirect } from "next/navigation";

export async function createCheckoutSession() {
  // Simple redirection to the Stripe Payment Link
  // The user must generate this link in their Stripe Dashboard: https://dashboard.stripe.com/payment-links
  const paymentLink = process.env.STRIPE_PAYMENT_LINK;

  if (!paymentLink) {
    console.error("STRIPE_PAYMENT_LINK is missing");
    redirect("/dashboard?error=stripe_setup_missing");
  }

  redirect(paymentLink);
}
