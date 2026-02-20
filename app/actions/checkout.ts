"use server";

import { redirect } from "next/navigation";

export async function createCheckoutSession() {
  // Direct redirection to the provided Stripe Payment Link
  // This bypasses the API completely and uses the hosted payment page directly.
  const paymentLink = process.env.STRIPE_PAYMENT_LINK || "https://buy.stripe.com/eVq4gydez4h9biebhPg3602";

  redirect(paymentLink);
}
