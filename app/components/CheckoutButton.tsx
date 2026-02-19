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
      className={className}
    >
      {pending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Zap className="h-5 w-5 mr-3 text-yellow-400 group-hover:scale-110 transition-transform" />
          Get Lifetime Access
        </>
      )}
    </button>
  );
}
