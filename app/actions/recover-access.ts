"use server";

import { stripe } from "@/lib/stripe";
import { cookies } from "next/headers";

type RecoverResult = { status: "ok" | "not_found" | "error" };

export async function recoverAccess(email: string): Promise<RecoverResult> {
  if (!email) return { status: "error" };

  try {
    // Find Stripe customers with this email
    const customers = await stripe.customers.list({ email, limit: 5 });
    if (customers.data.length === 0) return { status: "not_found" };

    // Check if any customer has a paid checkout session
    for (const customer of customers.data) {
      const sessions = await stripe.checkout.sessions.list({
        customer: customer.id,
        limit: 10,
      });

      const paid = sessions.data.find((s) => s.payment_status === "paid");
      if (paid) {
        // Valid purchase found — set access cookie
        const cookieStore = await cookies();
        cookieStore.set("fs_access", paid.id, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 365, // 1 year
          path: "/",
        });
        return { status: "ok" };
      }
    }

    return { status: "not_found" };
  } catch (err) {
    console.error("[FieldScribe] recover-access error:", err);
    return { status: "error" };
  }
}
