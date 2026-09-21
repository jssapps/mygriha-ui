import OpenLeadPopupButton from "./OpenLeadPopupButton";
import CallNowButton from "./CallNowButton";
import { buttonClasses } from "@/lib/ui";
import { CONTACT_PHONE_DISPLAY } from "@/lib/constants";

/** Final full-width conversion moment before the footer. */
export default function ClosingCta({ projectName }: { projectName: string }) {
  return (
    <div className="bg-sand-900">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <p className="font-display text-3xl font-bold text-white sm:text-4xl">
          See {projectName} in person
        </p>
        <p className="mx-auto mt-3 max-w-lg text-sand-50/70">
          Our advisory team will coordinate a site visit, share the current
          price sheet, and answer anything the brochure doesn&apos;t cover —
          no brokerage, no obligation.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <OpenLeadPopupButton intent="site-visit" className={buttonClasses("primary")}>
            Book Site Visit
          </OpenLeadPopupButton>
          <CallNowButton className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/60">
            Call {CONTACT_PHONE_DISPLAY}
          </CallNowButton>
        </div>
      </div>
    </div>
  );
}
