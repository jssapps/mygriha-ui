import type { Metadata } from "next";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses, and protects the information you share through this site.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-900/40">Legal</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-sand-900 sm:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-sand-900/50">Last updated: August 2, 2026</p>

      <div className="mt-8 space-y-8 leading-relaxed text-sand-900/80">
        <section>
          <h2 className="text-xl font-bold text-sand-900">Information We Collect</h2>
          <p className="mt-3">
            When you submit an enquiry, book a site visit, or request a
            brochure or cost sheet through this site, we collect the details
            you provide directly: your name, phone number, email address,
            budget range, apartment type preference, purpose of purchase,
            and preferred visit date. We do not collect this information
            through any means other than a form you&apos;ve chosen to submit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-sand-900">How We Use It</h2>
          <p className="mt-3">
            Your information is used to respond to your enquiry — to call or
            WhatsApp you back, coordinate a site visit, or share the
            requested brochure or price sheet. Where you&apos;ve enquired about
            a specific project, we may share your contact details with that
            project&apos;s builder so they can follow up directly. We do not
            sell or rent your contact details to unrelated third-party
            brokers or marketing lists.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-sand-900">Data Storage</h2>
          <p className="mt-3">
            Enquiry data is stored securely using a third-party managed
            database provider. We retain your information for as long as
            needed to respond to your enquiry and for a reasonable period
            afterward for record-keeping, unless you request deletion
            sooner.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-sand-900">Your Choices</h2>
          <p className="mt-3">
            You can ask us to update or delete the information we hold about
            you at any time by contacting us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-sky-700 underline underline-offset-2">
              {CONTACT_EMAIL}
            </a>{" "}
            or {CONTACT_PHONE_DISPLAY}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-sand-900">Cookies &amp; Analytics</h2>
          <p className="mt-3">
            This site may use basic, privacy-respecting analytics to
            understand which pages are useful to visitors. This data is
            aggregated and not used to identify you individually.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-sand-900">Contact</h2>
          <p className="mt-3">
            Questions about this policy can be sent to{" "}
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
