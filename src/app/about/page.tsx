import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME } from "@/lib/constants";
import { buildBreadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About Us",
  description: `${SITE_NAME} is a private property advisory representing a curated set of newly launched apartment projects along Bangalore's Electronic City corridor.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  return (
    <div>
      <JsonLd data={breadcrumbJsonLd} />
      <div className="w-full bg-sky-800 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-50/80">About Us</p>
          <h1 className="mt-2 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-5xl">
            An advisory, not a directory
          </h1>
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="space-y-6 text-lg leading-relaxed text-sand-900/80">
          <p>
            Most apartment shopping in Bangalore runs through a different
            sales office for every project, a different price-sheet format
            each time, and a phone that starts ringing the moment a number
            is shared once. {SITE_NAME}{" "}
            exists to change that order
            of operations: we vet a small number of newly launched projects
            directly with their builders, document them to one consistent
            standard, and only bring a client and a builder together once
            there&apos;s a genuine fit.
          </p>
          <p>
            Every project we represent is documented the same way — area,
            price, possession, and amenities laid out with the same rigor,
            not lifted from a brochure and republished as-is. Where a
            detail — a RERA number, a possession quarter, a price band —
            hasn&apos;t been confirmed directly with the builder yet, we say
            so rather than filling in a number that sounds plausible.
          </p>
          <p>
            We work a focused corridor — Electronic City to Chandapura —
            covered in depth rather than a sprawling list covered thinly.
            As we onboard and verify further projects directly with
            builders, our roster will grow, deliberately, one project at a
            time.
          </p>
          <p>
            Enquiries made through this site reach our advisory team
            directly — never a shared list of unrelated brokers. You can
            reach us any time from the{" "}
            <a href="/contact" className="text-sky-700 underline underline-offset-2 hover:text-sky-800">
              Contact page
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
