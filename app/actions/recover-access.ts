"use server";

import { stripe } from "@/lib/stripe";
import { cookies } from "next/headers";

export async function recoverAccess(email: string) {
  if (!email) return { status: "error" as const };

  try {
    // 1. Search for a customer with this email
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      // If customer not found in list, we assume they haven't purchased.
      return { status: "not_found" as const };
    }

    const customer = customers.data[0];

    // 2. Verify payment (Check for completed sessions or charges)
    const [sessions, charges] = await Promise.all([
      stripe.checkout.sessions.list({
        customer: customer.id,
        status: "complete",
        limit: 1,
      }),
      stripe.charges.list({
        customer: customer.id,
        limit: 10, // Check recent charges
      }),
    ]);

    const hasPaidSession = sessions.data.length > 0;
    const hasPaidCharge = charges.data.some((c) => c.status === "succeeded" && c.paid);

    if (!hasPaidSession && !hasPaidCharge) {
      return { status: "not_found" as const };
    }

    // 3. If customer found and paid, set session cookie
    const cookieStore = await cookies();
    cookieStore.set("field-scribe-access", "granted", { 
      secure: true, 
      httpOnly: true, 
      maxAge: 60 * 60 * 24 * 365 * 10 // 10 years (Lifetime)
    });

    return { status: "ok" as const };

  } catch (error) {
    console.error("Access recovery failed:", error);
    return { status: "error" as const };
  }
}
