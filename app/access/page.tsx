"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { FileText, Mail, ArrowRight, Loader2, CheckCircle, XCircle } from "lucide-react";
import { recoverAccess } from "@/app/actions/recover-access";

export default function AccessPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "not_found" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await recoverAccess(email.trim().toLowerCase());
      setStatus(result.status);
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-10">
        <div className="bg-indigo-600 p-1.5 rounded-lg">
          <FileText className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">FieldScribe</span>
      </Link>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Restore your access</h1>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">
          Enter the email you used to purchase FieldScribe. We&apos;ll verify your
          payment and restore access to your dashboard instantly.
        </p>

        {status === "ok" && (
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-800 text-sm">Access restored!</p>
              <p className="text-green-700 text-sm mt-1">
                You&apos;re all set.{" "}
                <Link href="/dashboard" className="underline font-medium">
                  Go to your dashboard →
                </Link>
              </p>
            </div>
          </div>
        )}

        {status === "not_found" && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <XCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 text-sm">No purchase found</p>
              <p className="text-amber-700 text-sm mt-1">
                We couldn&apos;t find a completed payment for that email. Try another
                address, or{" "}
                <Link href="/#pricing" className="underline font-medium">
                  purchase access
                </Link>
                .
              </p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">
              Something went wrong. Please try again or{" "}
              <a href="mailto:support@fieldscribe.app" className="underline font-medium">
                contact support
              </a>
              .
            </p>
          </div>
        )}

        {status !== "ok" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Purchase email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isPending || !email}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Restore Access <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <p className="text-center text-xs text-slate-400 mt-6">
          Haven&apos;t purchased yet?{" "}
          <Link href="/#pricing" className="text-indigo-600 hover:underline font-medium">
            Get lifetime access — $149
          </Link>
        </p>
      </div>
    </div>
  );
}
