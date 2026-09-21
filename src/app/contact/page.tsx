import type { Metadata } from "next";
import { getAllProjects } from "@/data/projects";
import LeadForm from "@/components/LeadForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import CallNowButton from "@/components/CallNowButton";
import OpenLeadPopupButton from "@/components/OpenLeadPopupButton";
import JsonLd from "@/components/JsonLd";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { buildBreadcrumbJsonLd } from "@/lib/jsonld";
import { buttonClasses, cardClasses, iconBadgeClasses } from "@/lib/ui";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch about any featured Bangalore apartment project — call, WhatsApp, or leave your number and our advisory team will call you back.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const projects = getAllProjects();
  const projectOptions = projects.map((p) => ({ slug: p.slug, name: p.name }));
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <JsonLd data={breadcrumbJsonLd} />
      <WhatsAppButton />

      <h1 className="text-3xl font-bold tracking-tight text-sand-900 sm:text-4xl">Contact Us</h1>
      <p className="mt-3 max-w-xl text-sand-900/70">
        Call, WhatsApp, or leave your number below — whichever&apos;s easiest.
        We typically respond within a few hours during business days.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <CallNowButton className={buttonClasses("primary")}>Call Now</CallNowButton>
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("secondary")}
        >
          WhatsApp Us
        </a>
        <OpenLeadPopupButton intent="site-visit" className={buttonClasses("secondary")}>
          Book Site Visit
        </OpenLeadPopupButton>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px]">
        <div className="space-y-4">
          <ContactCard
            label="Phone"
            detail={CONTACT_PHONE_DISPLAY}
            icon={
              <path
                d="M4 4h3l1.5 4-2 1.5a10 10 0 0 0 5 5l1.5-2 4 1.5v3a1 1 0 0 1-1 1C10.5 18 3 10.5 3 5a1 1 0 0 1 1-1Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            }
          />
          <ContactCard
            label="Email"
            detail={CONTACT_EMAIL}
            icon={
              <>
                <rect x="3.5" y="5" width="14" height="11" rx="1.5" />
                <path d="m4 6 6 5 6-5" strokeLinecap="round" strokeLinejoin="round" />
              </>
            }
          />
          <ContactCard
            label="WhatsApp"
            detail="Tap the WhatsApp icon in the corner of this page to start a chat instantly."
            icon={
              <path
                d="M4 16.5 5 13a6.5 6.5 0 1 1 2.5 2.5L4 16.5Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            }
          />
        </div>

        <LeadForm
          projects={projectOptions}
          sourcePage="contact"
          heading="Leave your number, we'll call you"
        />
      </div>
    </div>
  );
}

function ContactCard({
  label,
  detail,
  icon,
}: {
  label: string;
  detail: string;
  icon: React.ReactNode;
}) {
  return (
    <div className={`group flex items-start gap-3.5 p-5 ${cardClasses}`}>
      <span className={`shrink-0 ${iconBadgeClasses}`}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          {icon}
        </svg>
      </span>
      <div>
        <p className="text-sm font-semibold text-sand-900">{label}</p>
        <p className="mt-1 text-sm text-sand-900/60">{detail}</p>
      </div>
    </div>
  );
}
