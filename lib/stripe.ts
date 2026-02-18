import Stripe from "stripe";

// Stripe client — initialized lazily to avoid build-time failures
// Set STRIPE_SECRET_KEY=sk_test_... in your environment variables
// For testing, use Stripe test mode keys from https://dashboard.stripe.com/test/apikeys
export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder",
  {
    apiVersion: "2026-01-28.clover",
    typescript: true,
  }
);
