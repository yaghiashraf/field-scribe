import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FieldScribe — AI Home Inspection Report Software",
  description:
    "Generate professional home inspection reports in seconds with AI. Voice-to-text, photo analysis, and liability protection. One-time payment, no subscriptions.",
  keywords:
    "home inspection software, ai report generator, spectora alternative, field report app, fieldscribe, home inspector tools, inspection report ai",
  openGraph: {
    title: "FieldScribe — AI Home Inspection Report Software",
    description:
      "Turn site photos and messy voice notes into professional, liability-proof inspection reports in seconds.",
    url: "https://field-scribe.vercel.app",
    siteName: "FieldScribe",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FieldScribe — AI Home Inspection Report Software",
    description:
      "Turn site photos and messy voice notes into professional, liability-proof inspection reports in seconds.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
