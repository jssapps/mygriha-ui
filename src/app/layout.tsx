import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadFormPopup from "@/components/LeadFormPopup";
import MobileStickyBar from "@/components/MobileStickyBar";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/jsonld";
import { getPrimaryProject } from "@/data/projects";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

// Fallback social-share image for any page that doesn't set its own — most
// pages (project/blog detail) override this with their own photo.
const defaultOgImage = getPrimaryProject().images.hero;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} | Premium Apartment Advisory, Bangalore`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Premium Apartment Advisory, Bangalore`,
    description: SITE_TAGLINE,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Premium Apartment Advisory, Bangalore`,
    description: SITE_TAGLINE,
    images: [defaultOgImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-sand-50 pb-16 text-sand-900 md:pb-0"
        suppressHydrationWarning
      >
        <JsonLd data={buildOrganizationJsonLd()} />
        <JsonLd data={buildWebsiteJsonLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <LeadFormPopup />
        <MobileStickyBar />
      </body>
    </html>
  );
}
