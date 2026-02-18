import Link from "next/link";
import { Check, Zap, Shield, FileText, Camera, Mic, Layout, Star, ChevronDown, Menu } from "lucide-react";
import { createCheckoutSession } from "./actions/checkout";
import { ProductShowcase } from "./components/ProductShowcase";
import { DynamicDemo } from "./components/DynamicDemo";
import { ABTestCTA } from "./components/ABTestCTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:bg-indigo-700 transition-colors">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">FieldScribe</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#demo" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">How it Works</a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Pricing</a>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="hidden md:block text-sm font-medium text-slate-600 hover:text-slate-900">
              Log In
            </Link>
            <Link
              href="/dashboard"
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Hero Text */}
          <div className="text-center lg:text-left z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold mb-6 border border-indigo-100 animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
              Now with AI Vision 2.0
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 text-slate-900">
              Stop typing reports at <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">midnight.</span>
            </h1>
            
            <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Turn site photos and messy voice notes into professional, liability-proof inspection reports in seconds—with one simple lifetime payment.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <ABTestCTA />
              <div className="flex items-center gap-2 text-sm text-slate-500 mt-2 sm:mt-0">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span>Used by 500+ inspectors</span>
              </div>
            </div>
          </div>

          {/* Hero Visual (Animation) */}
          <div className="relative z-10 lg:h-[600px] flex items-center justify-center">
             {/* Abstract Background blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-indigo-100/50 to-purple-100/50 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
            <ProductShowcase />
          </div>

        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Trusted by professionals from</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale transition-all hover:grayscale-0">
            {/* Logos represented as text for now, would be SVGs */}
            <span className="text-xl font-bold text-slate-800 flex items-center"><Shield className="w-6 h-6 mr-2"/> SafeHome</span>
            <span className="text-xl font-bold text-slate-800 flex items-center"><Layout className="w-6 h-6 mr-2"/> BuildRight</span>
            <span className="text-xl font-bold text-slate-800 flex items-center"><Check className="w-6 h-6 mr-2"/> InspectPro</span>
            <span className="text-xl font-bold text-slate-800 flex items-center"><Star className="w-6 h-6 mr-2"/> EliteCheck</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-3">Core Features</h2>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-6">Everything you need to finish fast.</h3>
            <p className="text-xl text-slate-500">We stripped away the bloat. No complex menus, no "CRM" features you don't use. Just scan, speak, and send.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Camera className="h-8 w-8 text-white" />}
              color="bg-blue-500"
              title="AI Vision Analysis"
              description="Upload 50+ site photos. Our AI auto-detects defects (cracks, rust, leaks) and writes the captions for you."
            />
            <FeatureCard
              icon={<Mic className="h-8 w-8 text-white" />}
              color="bg-purple-500"
              title="Voice-to-Report"
              description="Walk the site and talk. We transcribe your stream-of-consciousness into structured, professional observations."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-white" />}
              color="bg-green-500"
              title="Liability Guard"
              description="Our AI rewrites 'fix the leak' into 'Qualified plumber to evaluate moisture intrusion', protecting you from lawsuits."
            />
          </div>
        </div>
      </section>

      {/* Dynamic Demo Section */}
      <section id="demo" className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">See the magic in action.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg">
            Don't take our word for it. Switch tabs below to see how raw, messy field data becomes a polished client-ready report.
          </p>
          <DynamicDemo />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-indigo-50/50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">One Payment. Lifetime Access.</h2>
          <p className="text-xl text-slate-600 mb-12">Stop paying rent on your software. Own it forever.</p>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-indigo-100 transform transition-transform hover:scale-105 duration-300">
            <div className="p-10 bg-gradient-to-br from-indigo-600 to-violet-700 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
               <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-bold mb-6 border border-white/30">
                LIMITED TIME LAUNCH DEAL
              </span>
              <div className="flex justify-center items-baseline mb-2">
                <span className="text-6xl font-extrabold">$149</span>
                <span className="ml-2 text-indigo-200 text-xl">/ lifetime</span>
              </div>
              <p className="text-indigo-100 text-sm">Regular price $299. Save 50% today.</p>
            </div>
            
            <div className="p-10">
              <ul className="space-y-5 text-left mb-10">
                <CheckItem text="Unlimited Reports" />
                <CheckItem text="AI Vision Analysis (500/mo included)" />
                <CheckItem text="Unlimited Voice Transcription" />
                <CheckItem text="PDF Export & Branding" />
                <CheckItem text="Priority Email Support" />
                <CheckItem text="30-Day Money Back Guarantee" />
              </ul>
              <form action={createCheckoutSession}>
                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white py-5 rounded-xl font-bold text-lg hover:bg-slate-800 hover:shadow-xl transition-all flex items-center justify-center group"
                >
                  <Zap className="h-5 w-5 mr-3 text-yellow-400 group-hover:scale-110 transition-transform" />
                  Get Lifetime Access
                </button>
              </form>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                <Shield className="w-3 h-3" /> Secure payment via Stripe
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem question="Is this really a one-time payment?" answer="Yes. We hate subscriptions too. You pay once and own the version forever. We cover the AI costs for reasonable usage (up to 500 photos/month), which covers 99% of inspectors." />
            <FAQItem question="Can I export to other software?" answer="Currently we export to PDF and raw text/markdown. You can copy-paste our AI-generated text into Spectora or HomeGauge if you prefer to use them for final delivery." />
            <FAQItem question="Is my data secure?" answer="Absolutely. We use Stripe for payments and industry-standard encryption for your data. We do not sell your inspection data." />
            <FAQItem question="Does it work on Android/iPhone?" answer="Yes! FieldScribe is a Progressive Web App (PWA). You can access it from any browser on your phone and it works perfectly on mobile." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-slate-400 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 text-white font-bold text-xl mb-4">
              <FileText className="h-6 w-6" />
              <span>FieldScribe</span>
            </div>
            <p className="max-w-xs text-slate-500">
              The AI-powered inspection tool for professionals who value their time.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Login</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
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

function FeatureCard({ icon, color, title, description }: { icon: React.ReactNode; color: string; title: string; description: string }) {
  return (
    <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1 group">
      <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform`}>
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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
      <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-slate-900 list-none hover:bg-slate-100 transition-colors">
        {question}
        <ChevronDown className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
        {answer}
      </div>
    </details>
  );
}
