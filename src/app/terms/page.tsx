import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms governing your use of the ${SITE_NAME} website.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-900/40">Legal</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-sand-900 sm:text-4xl">
        Terms &amp; Conditions
      </h1>
      <p className="mt-2 text-sm text-sand-900/50">Last updated: August 2, 2026</p>

      <div className="mt-8 space-y-8 leading-relaxed text-sand-900/80">
        <section>
          <h2 className="text-xl font-bold text-sand-900">About This Site</h2>
          <p className="mt-3">
            {SITE_NAME} is a property advisory service. We represent a
            curated set of apartment projects on behalf of their builders
            and facilitate enquiries, site visits, and follow-up between
            prospective buyers and those builders. We are not the builder,
            developer, or seller of record for any project shown on this
            site unless explicitly stated.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-sand-900">Information Accuracy</h2>
          <p className="mt-3">
            We make a genuine effort to document every project accurately,
            and we mark any detail that hasn&apos;t yet been confirmed directly
            with the builder as pending rather than presenting it as fact.
            Even so, prices, availability, possession dates, specifications,
            and RERA status are subject to change by the builder without
            notice and should be independently verified before you make any
            booking decision or payment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-sand-900">No Brokerage, No Booking Authority</h2>
          <p className="mt-3">
            Enquiries submitted through this site do not constitute a
            booking, reservation, or contractual commitment of any kind.
            Any booking, agreement, or payment is made directly between you
            and the relevant builder, subject to that builder&apos;s own terms.
            We do not charge site visitors any brokerage or fee for
            enquiries made through this site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-sand-900">Third-Party Links</h2>
          <p className="mt-3">
            This site may link to third-party services, including maps and
            messaging platforms such as WhatsApp. We are not responsible for
            the content, availability, or privacy practices of those
            third-party services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-sand-900">Limitation of Liability</h2>
          <p className="mt-3">
            {SITE_NAME} is not liable for any loss or damage arising from
            decisions made based on information published on this site.
            Buyers are responsible for their own independent due diligence,
            including legal, financial, and RERA verification, before
            committing to any purchase.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-sand-900">Changes to These Terms</h2>
          <p className="mt-3">
            We may update these terms from time to time. Continued use of
            this site after an update constitutes acceptance of the revised
            terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-sand-900">Contact</h2>
          <p className="mt-3">
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-sky-700 underline underline-offset-2">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
