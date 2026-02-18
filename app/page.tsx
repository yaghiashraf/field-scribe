import Link from "next/link";
import { Check, Zap, Shield, FileText, Camera, Mic } from "lucide-react";
import { createCheckoutSession } from "./actions/checkout";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-slate-900">FieldScribe</span>
          </div>
          <div className="flex space-x-4">
            <Link href="/login" className="text-slate-600 hover:text-slate-900 font-medium">
              Log In
            </Link>
            <Link
              href="/dashboard"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-12 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
          Stop typing reports at <span className="text-indigo-600">midnight.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Turn site photos and messy voice notes into professional, liability-proof inspection reports in seconds—with one simple lifetime payment.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/dashboard"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 shadow-lg transition-all"
          >
            Start For Free
          </Link>
          <a
            href="#pricing"
            className="bg-white text-slate-700 border border-slate-300 px-8 py-3 rounded-lg text-lg font-medium hover:bg-slate-50 transition-colors"
          >
            View Pricing
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Camera className="h-8 w-8 text-indigo-600" />}
            title="AI Vision Analysis"
            description="Upload 50+ site photos. Our AI auto-detects defects (cracks, rust, leaks) and writes the captions for you."
          />
          <FeatureCard
            icon={<Mic className="h-8 w-8 text-indigo-600" />}
            title="Voice-to-Report"
            description="Walk the site and talk. We transcribe your stream-of-consciousness into structured, professional observations."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8 text-indigo-600" />}
            title="Liability Guard"
            description="Our AI rewrites 'fix the leak' into 'Qualified plumber to evaluate moisture intrusion', protecting you from lawsuits."
          />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">One Payment. Lifetime Access.</h2>
          <p className="text-slate-600 mb-12">No monthly subscriptions. No per-report fees.</p>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="p-8 bg-indigo-50 border-b border-indigo-100">
              <span className="inline-block px-3 py-1 bg-indigo-200 text-indigo-800 rounded-full text-xs font-semibold mb-4">
                LIMITED TIME LAUNCH DEAL
              </span>
              <div className="flex justify-center items-baseline">
                <span className="text-5xl font-extrabold text-slate-900">$149</span>
                <span className="ml-2 text-slate-500">/ lifetime</span>
              </div>
            </div>
            <div className="p-8">
              <ul className="space-y-4 text-left mb-8">
                <CheckItem text="Unlimited Reports" />
                <CheckItem text="AI Vision Analysis (500/mo included)" />
                <CheckItem text="Unlimited Voice Transcription" />
                <CheckItem text="PDF Export & Branding" />
                <CheckItem text="30-Day Money Back Guarantee" />
              </ul>
              <form action={createCheckoutSession}>
                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center"
                >
                  <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                  Get Lifetime Access
                </button>
              </form>
              <p className="mt-4 text-xs text-slate-500">
                Secure payment via Stripe. Instant access key delivered via email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} FieldScribe. Built for inspectors, by developers.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-center text-slate-700">
      <div className="bg-green-100 p-1 rounded-full mr-3">
        <Check className="h-4 w-4 text-green-600" />
      </div>
      {text}
    </li>
  );
}
