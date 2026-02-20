"use client";

import { useFormStatus } from "react-dom";
import { Zap, Loader2, Lock } from "lucide-react";
import { createCheckoutSession } from "../actions/checkout";

export function CheckoutButton({ className }: { className?: string }) {
  return (
    <form action={createCheckoutSession} className="w-full sm:w-auto">
      <SubmitButton className={className} />
      <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-500">
        <Lock className="w-3 h-3" />
        <span>30-Day Money-Back Guarantee</span>
      </div>
    </form>
  );
}

function SubmitButton({ className }: { className?: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${className} w-full min-w-[280px] h-[64px] flex items-center justify-center transition-all duration-200 active:scale-95`}
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2 animate-pulse">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="font-medium">Securely Redirecting...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-3">
          <Zap className="h-6 w-6 text-yellow-400 group-hover:scale-110 transition-transform fill-yellow-400" />
          <span className="text-xl">Get Lifetime Access</span>
        </span>
      )}
    </button>
  );
}
