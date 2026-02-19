"use client";

import { useTransition, useState } from "react";
import { Zap, Loader2, AlertCircle } from "lucide-react";
import { createCheckoutSession } from "@/app/actions/checkout";

export function CheckoutButton({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function handleClick() {
    setErrorMsg(null);
    startTransition(async () => {
      const result = await createCheckoutSession();
      if (result.error) {
        setErrorMsg("Checkout failed — please try again or contact support.");
        return;
      }
      // Hard-navigate to Stripe checkout (redirect() in server actions
      // doesn't propagate when called outside a form action)
      window.location.href = result.url!;
    });
  }

  return (
    <div className="w-full">
      <button
        onClick={handleClick}
        disabled={isPending}
        className={className}
        aria-label="Get lifetime access to FieldScribe for $149"
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin shrink-0" />
            Redirecting to checkout…
          </>
        ) : (
          <>
            <Zap className="w-5 h-5 text-yellow-400 shrink-0 group-hover:scale-110 transition-transform" />
            Get Lifetime Access — $149
          </>
        )}
      </button>

      {errorMsg && (
        <div className="flex items-center gap-2 mt-3 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {errorMsg}
        </div>
      )}
    </div>
  );
}
