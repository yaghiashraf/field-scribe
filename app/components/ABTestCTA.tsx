"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ABTestCTA() {
  const [variant, setVariant] = useState<"A" | "B">("A");

  useEffect(() => {
    // Simple 50/50 split based on random
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks
    setVariant(Math.random() > 0.5 ? "B" : "A");
  }, []);

  const text = variant === "A" ? "Start Your First Report" : "Get Professional in Seconds";
  const subtext = variant === "A" ? "No credit card required" : "Try the AI Demo Free";

  return (
    <div className="flex flex-col items-center">
      <Link
        href="/dashboard"
        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 w-full sm:w-auto"
      >
        <span>{text}</span>
        <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
      </Link>
      <p className="mt-3 text-sm text-slate-500">{subtext}</p>
    </div>
  );
}
