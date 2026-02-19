"use client";

import { useTransition } from "react";
import { Zap, Loader2 } from "lucide-react";
import { createCheckoutSession } from "@/app/actions/checkout";

export function CheckoutButton({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await createCheckoutSession();
    });
  }

  return (
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
  );
}
