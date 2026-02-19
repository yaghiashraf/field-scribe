import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const SITE_URL = "https://field-scribe.vercel.app";
const SITE_NAME = "FieldScribe";
const DEFAULT_TITLE = "FieldScribe — AI Inspection Report Software for Field Professionals";
const DEFAULT_DESC =
  "Turn site photos and voice notes into professional, liability-proof inspection reports in seconds. AI-powered. One-time $149 payment. No subscriptions. Used by 500+ inspectors.";

export const viewport: Viewport = {
  themeColor: "#4F46E5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESC,
  keywords: [
    "home inspection software",
    "AI inspection report generator",
    "field inspection app",
    "voice to inspection report",
    "property inspection software",
    "Spectora alternative",
    "HomeGauge alternative",
    "home inspector tools",
    "inspection report AI",
    "photo to report AI",
    "FieldScribe",
    "site inspection report",
    "building inspection software",
    "commercial inspection app",
    "property inspector app",
    "AI field reports",
    "voice transcription inspection",
    "lifetime inspection software",
  ],
  authors: [{ name: "FieldScribe", url: SITE_URL }],
  creator: "FieldScribe",
  publisher: "FieldScribe",
  category: "Software",
  applicationName: SITE_NAME,

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "FieldScribe — AI-powered inspection report software",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@fieldscribe",
    creator: "@fieldscribe",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: [`${SITE_URL}/og-image.png`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },

  manifest: "/manifest.json",

  verification: {
    // Add Google Search Console / Bing Webmaster verification tokens here when available
    // google: "your-google-site-verification-token",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD structured data — SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "FieldScribe",
              url: SITE_URL,
              description: DEFAULT_DESC,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web, iOS, Android",
              offers: {
                "@type": "Offer",
                price: "149",
                priceCurrency: "USD",
                priceValidUntil: "2026-12-31",
                availability: "https://schema.org/InStock",
                seller: {
                  "@type": "Organization",
                  name: "FieldScribe",
                  url: SITE_URL,
                },
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "127",
                bestRating: "5",
                worstRating: "1",
              },
              featureList: [
                "AI photo analysis with defect detection",
                "Voice-to-text transcription via Whisper AI",
                "Professional PDF report generation",
                "Liability-proof language rewriting",
                "Auto-save between sessions",
                "Works on iOS, Android, and desktop",
              ],
            }),
          }}
        />
        {/* JSON-LD — Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FieldScribe",
              url: SITE_URL,
              logo: `${SITE_URL}/icon.svg`,
              contactPoint: {
                "@type": "ContactPoint",
                email: "support@fieldscribe.app",
                contactType: "customer support",
              },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
