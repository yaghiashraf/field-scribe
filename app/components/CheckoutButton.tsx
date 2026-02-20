"use client";

import { useFormStatus } from "react-dom";
import { Zap, Loader2 } from "lucide-react";
import { createCheckoutSession } from "../actions/checkout";

export function CheckoutButton({ className }: { className?: string }) {
  return (
    <form action={createCheckoutSession}>
      <SubmitButton className={className} />
    </form>
  );
}

function SubmitButton({ className }: { className?: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${className} min-w-[280px] h-[60px] flex items-center justify-center transition-all duration-200`}
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2 animate-pulse">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="font-medium">Redirecting to Stripe...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-3">
          <Zap className="h-5 w-5 text-yellow-400 group-hover:scale-110 transition-transform" />
          Get Lifetime Access
        </span>
      )}
    </button>
  );
}
