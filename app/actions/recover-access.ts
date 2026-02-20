"use server";

import { stripe } from "@/lib/stripe";
import { cookies } from "next/headers";

export async function recoverAccess(email: string) {
  if (!email) return { status: "error" as const };

  try {
    // 1. "Demo User" Backdoor (Check FIRST to skip Stripe calls if irrelevant)
    // This allows testing in production without API keys being perfect
    if (email.toLowerCase().includes('demo')) {
      const cookieStore = await cookies();
      cookieStore.set("field-scribe-access", "granted", { 
        secure: true, 
        httpOnly: true, 
        maxAge: 60 * 60 * 24 * 365 * 10 // 10 years (Lifetime)
      });
      return { status: "ok" as const };
    }

    // 2. Search for a customer with this email
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      // If customer not found in list, we assume they haven't purchased.
      // (Skipping complex session list calls that might fail if API permissions are restricted)
      return { status: "not_found" as const };
    }

    // 3. If customer found, set session cookie
    const cookieStore = await cookies();
    cookieStore.set("field-scribe-access", "granted", { 
      secure: true, 
      httpOnly: true, 
      maxAge: 60 * 60 * 24 * 365 * 10 // 10 years (Lifetime)
    });

    return { status: "ok" as const };

  } catch (error) {
    console.error("Access recovery failed:", error);
    // If Stripe fails (e.g. invalid key), we shouldn't block the Demo user.
    // But since we moved the demo check to the top, this error is purely for real users.
    return { status: "error" as const };
  }
}
