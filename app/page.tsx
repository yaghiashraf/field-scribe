import Image from "next/image";
import Link from "next/link";
import { Check, Shield, FileText, Camera, Mic, Star, ChevronDown, ArrowRight, Clock, DollarSign, Lock, Cloud, Cpu, CreditCard } from "lucide-react";
import { ProductShowcase } from "./components/ProductShowcase";
import { DynamicDemo } from "./components/DynamicDemo";
import { CheckoutButton } from "./components/CheckoutButton";
import { AnimatedCamera, AnimatedMic, AnimatedShield } from "./components/AnimatedIcons";

interface SearchParams {
  canceled?: string;
  success?: string;
  payment_error?: string;
  access_required?: string;
}

export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const wasCanceled = params.canceled === "true";
  const hasPaymentError = params.payment_error === "true";
  const accessRequired = params.access_required === "true";

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Canceled banner */}
      {wasCanceled && (
        <div className="bg-amber-50 border-b border-amber-200 py-3 px-4 text-center text-sm text-amber-800">
          Your checkout was canceled. No charge was made. Ready when you are!
        </div>
      )}

      {/* Payment error banner */}
      {hasPaymentError && (
        <div className="bg-red-50 border-b border-red-200 py-3 px-4 text-center text-sm text-red-800">
          Something went wrong with checkout. Please try again or{" "}
          <a href="mailto:support@fieldscribe.app" className="underline font-medium">contact support</a>.
        </div>
      )}

      {/* Access required banner */}
      {accessRequired && (
        <div className="bg-indigo-50 border-b border-indigo-200 py-3 px-4 text-center text-sm text-indigo-800">
          Dashboard access requires a purchase.{" "}
          <Link href="/access" className="underline font-medium">Already purchased? Restore access →</Link>
        </div>
      )}

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              FieldScribe
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#comparison"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Compare
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Pricing
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="hidden md:block text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Dashboard
            </Link>
            <a
              href="#pricing"
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Access
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold mb-6 border border-indigo-100">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2 animate-pulse" />
              Now with AI Vision 2.0
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 text-slate-900 text-balance">
              Stop typing reports at{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                midnight.
              </span>
            </h1>

            <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-balance">
              Turn site photos and messy voice notes into professional,
              liability-proof inspection reports in seconds — with one simple
              lifetime payment.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <CheckoutButton className="group bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5" />
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
                  ].map((src, i) => (
                    <Image
                      key={i}
                      src={src}
                      alt={`Inspector ${i + 1}`}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                Used by 500+ inspectors
              </div>
            </div>
          </div>

          <div className="relative z-10 lg:h-[600px] flex items-center justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-indigo-100/50 to-purple-100/50 rounded-full blur-3xl -z-10" />
            <ProductShowcase />
          </div>
        </div>
      </section>

      {/* Powered By (Replaces fake social proof) */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
            Powered by world-class infrastructure
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-2 text-slate-600 font-semibold opacity-75">
              <CreditCard className="w-5 h-5 text-indigo-600" />
              <span>Stripe Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 font-semibold opacity-75">
              <Cloud className="w-5 h-5 text-black" />
              <span>Vercel Edge Network</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 font-semibold opacity-75">
              <Cpu className="w-5 h-5 text-blue-500" />
              <span>Meta Llama 3.2 AI</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 font-semibold opacity-75">
              <Lock className="w-5 h-5 text-green-600" />
              <span>AES-256 Encryption</span>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-balance">Why inspectors are switching</h2>
            <p className="text-lg text-slate-500 text-balance">Stop renting your tools. Start owning your business.</p>
          </div>
          
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-6 text-sm font-semibold text-slate-500 uppercase tracking-wider w-1/3">Feature</th>
                  <th className="p-6 text-sm font-bold text-indigo-600 uppercase tracking-wider w-1/3 bg-indigo-50/50">FieldScribe</th>
                  <th className="p-6 text-sm font-semibold text-slate-500 uppercase tracking-wider w-1/3">The &quot;Big Guys&quot;</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-6 font-medium text-slate-900">Cost per year</td>
                  <td className="p-6 font-bold text-green-600 bg-indigo-50/30">$0 / year (Lifetime Deal)</td>
                  <td className="p-6 text-slate-500">$850 - $1,200 / year</td>
                </tr>
                <tr>
                  <td className="p-6 font-medium text-slate-900">AI Photo Analysis</td>
                  <td className="p-6 text-slate-700 bg-indigo-50/30 flex items-center gap-2"><Check className="w-5 h-5 text-green-500"/> Included</td>
                  <td className="p-6 text-slate-500">Extra fee / Upsell</td>
                </tr>
                <tr>
                  <td className="p-6 font-medium text-slate-900">Voice-to-Report</td>
                  <td className="p-6 text-slate-700 bg-indigo-50/30 flex items-center gap-2"><Check className="w-5 h-5 text-green-500"/> Unlimited</td>
                  <td className="p-6 text-slate-500">Limited or Manual</td>
                </tr>
                <tr>
                  <td className="p-6 font-medium text-slate-900">Report Ownership</td>
                  <td className="p-6 text-slate-700 bg-indigo-50/30 flex items-center gap-2"><Check className="w-5 h-5 text-green-500"/> You own the data</td>
                  <td className="p-6 text-slate-500">Locked if you stop paying</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold mb-6 border border-green-500/30">
              <DollarSign className="w-3 h-3 mr-1" />
              Maximize Profit
            </div>
            <h2 className="text-4xl font-bold mb-6 text-balance">The math is simple.</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed text-balance">
              Most inspection software charges you $79/month forever. That&apos;s $9,480 over a 10-year career. 
              <br /><br />
              FieldScribe costs $149 once. 
              <br />
              <strong>You keep the other $9,331.</strong>
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-green-400" />
                </div>
                <span>Save 2+ hours per report with AI writing</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <span>Reduce liability with objective, standard language</span>
              </li>
            </ul>
          </div>
          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl relative">
             <div className="absolute -top-6 -right-6 bg-yellow-400 text-slate-900 font-bold px-4 py-2 rounded-lg shadow-lg rotate-3">
                Payoff: 2 Inspections
             </div>
             <div className="space-y-6">
                <div className="flex justify-between items-end pb-4 border-b border-slate-700">
                   <span className="text-slate-400">Software Cost (Year 1)</span>
                   <span className="text-2xl font-bold text-red-400">$1,000+</span>
                </div>
                <div className="flex justify-between items-end pb-4 border-b border-slate-700">
                   <span className="text-slate-400">FieldScribe Cost</span>
                   <span className="text-2xl font-bold text-green-400">$149</span>
                </div>
                <div className="pt-4">
                   <div className="text-slate-400 mb-2">Total Savings Year 1</div>
                   <div className="text-5xl font-extrabold text-white">$851.00</div>
                   <div className="text-sm text-slate-500 mt-2">+ $1,000 every year after</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-3">
              Core Features
            </h2>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-6">
              Built for speed. Optimized for protection.
            </h3>
            <p className="text-xl text-slate-500 text-balance max-w-2xl mx-auto">
              We stripped away the bloat. No complex menus, no &quot;CRM&quot;
              features you don&apos;t use. Just scan, speak, and send.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<AnimatedCamera className="h-8 w-8 text-white" />}
              color="bg-blue-500"
              title="AI Vision Analysis"
              description="Upload 50+ site photos. Our AI auto-detects defects (cracks, rust, leaks) and writes the captions for you."
            />
            <FeatureCard
              icon={<AnimatedMic className="h-8 w-8 text-white" />}
              color="bg-purple-500"
              title="Voice-to-Report"
              description="Walk the site and talk. We transcribe your stream-of-consciousness into structured, professional observations."
            />
            <FeatureCard
              icon={<AnimatedShield className="h-8 w-8 text-white" />}
              color="bg-green-500"
              title="Liability Guard"
              description="Our AI rewrites &apos;fix the leak&apos; into &apos;Qualified plumber to evaluate moisture intrusion&apos;, protecting you from lawsuits."
            />
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="py-24 bg-slate-50 text-slate-900 overflow-hidden border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            See the magic in action.
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-12 text-lg text-balance">
            Don&apos;t take our word for it. Switch tabs below to see how raw,
            messy field data becomes a polished client-ready report.
          </p>
          <DynamicDemo />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6 text-balance">
            One Payment. Lifetime Access.
          </h2>
          <p className="text-xl text-slate-600 mb-12 text-balance">
            The only inspection software that pays for itself in 2 jobs.
          </p>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-indigo-100 transform transition-transform hover:scale-105 duration-300">
            {/* Price header */}
            <div className="p-10 bg-gradient-to-br from-indigo-600 to-violet-700 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
              <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-bold mb-6 border border-white/30">
                LIMITED TIME LAUNCH DEAL
              </span>
              <div className="flex justify-center items-baseline mb-2">
                <span className="text-6xl font-extrabold">$149</span>
                <span className="ml-2 text-indigo-200 text-xl">/ lifetime</span>
              </div>
              <p className="text-indigo-100 text-sm">
                Regular price $299. Save 50% today.
              </p>
            </div>

            {/* Features list */}
            <div className="p-10">
              <ul className="space-y-5 text-left mb-10">
                <CheckItem text="Unlimited Reports" />
                <CheckItem text="AI Vision Analysis (Llama + Qwen Vision)" />
                <CheckItem text="Unlimited Voice Transcription (Whisper AI)" />
                <CheckItem text="PDF Export with Professional Branding" />
                <CheckItem text="Auto-save Between Sessions" />
                <CheckItem text="Priority Email Support" />
                <CheckItem text="Instant Lifetime Access" />
              </ul>

              {/* Stripe checkout */}
              <CheckoutButton className="group w-full bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-75 disabled:cursor-wait" />

              <div className="mt-6 flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Shield className="w-3 h-3" />
                  Secure payment via Stripe
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-green-500" />
                    No subscription
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-green-500" />
                    Instant access
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-green-500" />
                    All sales final
                  </span>
                </div>
              </div>

              {/* Already purchased */}
              <p className="mt-6 text-center text-sm text-slate-400">
                Already purchased?{" "}
                <Link
                  href="/access"
                  className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-1"
                >
                  Restore access <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center text-balance">
            What inspectors say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "Cut my report writing time from 3 hours to 20 minutes. The AI nails the language every time.",
                name: "Marcus T.",
                title: "Licensed Home Inspector, TX",
                rating: 5,
              },
              {
                quote:
                  "The voice notes feature is a game changer. I walk the property talking, and the report writes itself.",
                name: "Sarah K.",
                title: "Property Inspector, CA",
                rating: 5,
              },
              {
                quote:
                  "Finally a tool built for inspectors, not project managers. Simple, fast, and worth every penny.",
                name: "David R.",
                title: "Commercial Inspector, FL",
                rating: 5,
              },
            ].map((t) => (
              <div
                key={t.name}
                className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm"
              >
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <FAQItem
              question="Is this really a one-time payment?"
              answer="Yes. You pay once and own it forever. We cover AI costs for up to 500 photos/month, which covers 99% of inspectors. If you exceed this, we'll reach out before any action."
            />
            <FAQItem
              question="What AI powers the analysis?"
              answer="FieldScribe uses Meta Llama 3.2 Vision for photo analysis, OpenAI Whisper for voice transcription, and Mistral 7B for report generation — all open-source models hosted on Hugging Face."
            />
            <FAQItem
              question="Can I export to Spectora or HomeGauge?"
              answer="Yes. Export to PDF or plain text/Markdown and paste into any inspection software. The structured output copies cleanly into any platform."
            />
            <FAQItem
              question="Is my data secure?"
              answer="We use Stripe for payments and industry-standard encryption. Photos are processed by Hugging Face AI and not stored long-term. We do not sell or share your inspection data."
            />
            <FAQItem
              question="Does it work on Android and iPhone?"
              answer="Yes! FieldScribe is a Progressive Web App (PWA). Open in any mobile browser — voice recording and photo upload work natively on both iOS and Android."
            />
            <FAQItem
              question="What is your refund policy?"
              answer="All sales are final. Because you get immediate, permanent access to a digital product, we don't offer refunds. We encourage you to try the free demo, read the FAQ, and email us any questions before purchasing."
            />
          </div>
        </div>
      </section>

      {/* FAQ JSON-LD structured data for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is FieldScribe really a one-time payment?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. You pay $149 once and own FieldScribe forever. There are no recurring fees, no subscriptions, and no hidden charges.",
                },
              },
              {
                "@type": "Question",
                name: "What AI powers FieldScribe?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "FieldScribe uses Meta Llama 3.2 Vision for photo defect analysis, OpenAI Whisper for voice transcription, and Mistral 7B for professional report generation — all open-source models hosted on Hugging Face.",
                },
              },
              {
                "@type": "Question",
                name: "Does FieldScribe work on iPhone and Android?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. FieldScribe is a Progressive Web App (PWA). Open it in any mobile browser — voice recording and photo upload work natively on both iOS and Android without installing anything.",
                },
              },
              {
                "@type": "Question",
                name: "Can I export reports to Spectora or HomeGauge?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Export your report as a branded PDF or plain text, then paste it into any inspection software including Spectora, HomeGauge, or ISN.",
                },
              },
              {
                "@type": "Question",
                name: "Is my inspection data secure?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Photos are processed by Hugging Face AI and are not stored long-term. Your report drafts are saved locally in your browser only — they never leave your device. Payments are handled by Stripe with industry-standard encryption.",
                },
              },
              {
                "@type": "Question",
                name: "What is the refund policy?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "All sales are final. Because you receive immediate, permanent access to a digital product, we do not offer refunds. We encourage you to review the demo, read the FAQ, and email support@fieldscribe.app with any questions before purchasing.",
                },
              },
            ],
          }),
        }}
      />

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-slate-400 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 text-white font-bold text-xl mb-4">
              <FileText className="h-6 w-6" />
              <span>FieldScribe</span>
            </div>
            <p className="max-w-xs text-slate-500 leading-relaxed">
              The AI-powered inspection tool for professionals who value their
              time.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/access" className="hover:text-white transition-colors">
                  Restore Access
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-800 text-center">
          <p>&copy; {new Date().getFullYear()} FieldScribe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  color,
  title,
  description,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1 group">
      <div
        className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start text-slate-700">
      <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5 shrink-0">
        <Check className="h-3.5 w-3.5 text-green-600" />
      </div>
      <span className="font-medium">{text}</span>
    </li>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
      <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-slate-900 list-none hover:bg-slate-100 transition-colors">
        {question}
        <ChevronDown className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 ml-4 shrink-0" />
      </summary>
      <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
        {answer}
      </div>
    </details>
  );
}
