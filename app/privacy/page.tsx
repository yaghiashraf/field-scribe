import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — FieldScribe",
  description: "How FieldScribe collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Nav */}
      <header className="border-b border-slate-100 py-5 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <FileText className="h-4 w-4 text-white" />
            </div>
            FieldScribe
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Privacy Policy</h1>
        <p className="text-slate-500 text-sm mb-12">Last updated: February 19, 2026</p>

        <Section title="1. Introduction">
          <p>
            FieldScribe (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your
            privacy. This Privacy Policy explains what information we collect when you use
            FieldScribe, how we use it, and the choices you have. By using FieldScribe, you agree
            to the collection and use of information in accordance with this policy.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <h3 className="font-semibold text-slate-800 mt-4 mb-2">2.1 Information you provide</h3>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>
              <strong>Purchase email address</strong> — collected by Stripe when you complete
              checkout. We may use this to help you recover account access.
            </li>
            <li>
              <strong>Inspection photos</strong> — images you upload for AI analysis. These are
              transmitted to Hugging Face inference APIs for processing and are not stored on
              FieldScribe servers.
            </li>
            <li>
              <strong>Voice recordings</strong> — audio recorded in the app. These are transmitted
              to the Hugging Face Whisper API for transcription and are not retained after
              processing.
            </li>
            <li>
              <strong>Report content</strong> — the text of inspection notes and generated reports
              is stored locally in your browser (localStorage) and is never transmitted to
              FieldScribe servers.
            </li>
          </ul>

          <h3 className="font-semibold text-slate-800 mt-6 mb-2">2.2 Automatically collected information</h3>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>
              <strong>Usage analytics</strong> — Vercel, our hosting provider, may collect
              aggregate, anonymized access logs including IP addresses, browser type, and pages
              visited.
            </li>
            <li>
              <strong>Cookies</strong> — we use a single httpOnly cookie (<code>fs_access</code>)
              to verify that you have completed a purchase. This cookie does not track you across
              websites.
            </li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>To provide and operate the FieldScribe service.</li>
            <li>To verify your purchase and grant access to the dashboard.</li>
            <li>
              To transmit your photos and audio to AI inference services (Hugging Face) for
              analysis and transcription.
            </li>
            <li>To respond to support requests.</li>
            <li>To comply with legal obligations.</li>
          </ul>
          <p className="mt-4">
            We do <strong>not</strong> sell, rent, or share your personal information with third
            parties for marketing purposes.
          </p>
        </Section>

        <Section title="4. Third-Party Services">
          <p className="mb-4">FieldScribe relies on the following third-party services:</p>
          <div className="space-y-4">
            <ThirdParty
              name="Stripe"
              url="https://stripe.com/privacy"
              desc="Processes payments. We never see or store your full card details. Stripe is PCI-DSS Level 1 certified."
            />
            <ThirdParty
              name="Hugging Face"
              url="https://huggingface.co/privacy"
              desc="Provides AI inference for photo analysis (Llama Vision), voice transcription (Whisper), and report generation (Mistral). Photos and audio are sent to Hugging Face servers for processing."
            />
            <ThirdParty
              name="Vercel"
              url="https://vercel.com/legal/privacy-policy"
              desc="Hosts the FieldScribe application. May collect access logs."
            />
          </div>
        </Section>

        <Section title="5. Data Retention">
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>
              <strong>Photos &amp; audio</strong> — processed in-flight by Hugging Face and not
              stored by FieldScribe.
            </li>
            <li>
              <strong>Report drafts</strong> — stored only in your browser&apos;s localStorage.
              Clearing your browser data removes them permanently.
            </li>
            <li>
              <strong>Payment records</strong> — retained by Stripe in accordance with their
              policies and applicable financial regulations.
            </li>
            <li>
              <strong>Access cookie</strong> — expires after 1 year and can be cleared by you at
              any time via your browser settings.
            </li>
          </ul>
        </Section>

        <Section title="6. Security">
          <p>
            We use HTTPS for all data in transit. Your report data never leaves your device.
            AI processing is performed over encrypted connections to Hugging Face. Payments are
            handled entirely by Stripe — we never store card numbers. While no transmission over
            the internet is 100% secure, we take reasonable precautions to protect your
            information.
          </p>
        </Section>

        <Section title="7. Your Rights">
          <p className="mb-4">
            Depending on your location, you may have the following rights regarding your data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
            <li><strong>Deletion</strong> — request deletion of your personal data.</li>
            <li><strong>Portability</strong> — receive your data in a machine-readable format.</li>
            <li>
              <strong>Opt-out (CCPA)</strong> — California residents may opt out of the sale of
              personal information. We do not sell personal information.
            </li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights, email us at{" "}
            <a href="mailto:privacy@fieldscribe.app" className="text-indigo-600 hover:underline">
              privacy@fieldscribe.app
            </a>
            .
          </p>
        </Section>

        <Section title="8. Children's Privacy">
          <p>
            FieldScribe is intended for professional use by adults. We do not knowingly collect
            personal information from anyone under the age of 16. If you believe a minor has
            provided us with personal data, please contact us and we will delete it promptly.
          </p>
        </Section>

        <Section title="9. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we will update the
            &quot;Last updated&quot; date at the top of this page. Continued use of FieldScribe after
            changes constitutes acceptance of the revised policy.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            Questions about this policy? Contact us at{" "}
            <a href="mailto:privacy@fieldscribe.app" className="text-indigo-600 hover:underline">
              privacy@fieldscribe.app
            </a>
            .
          </p>
        </Section>
      </main>

      <footer className="border-t border-slate-100 py-8 text-center text-xs text-slate-400">
        <Link href="/terms" className="hover:text-slate-600 mr-4">Terms of Service</Link>
        <Link href="/" className="hover:text-slate-600">FieldScribe Home</Link>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">{title}</h2>
      <div className="text-slate-600 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function ThirdParty({ name, url, desc }: { name: string; url: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <div className="w-1 bg-indigo-200 rounded-full shrink-0" />
      <div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600 hover:underline">
          {name}
        </a>
        <p className="text-sm text-slate-600 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
