"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LeadForm from "./LeadForm";
import { getAllProjects, getProjectBySlug } from "@/data/projects";
import { SITE_NAME } from "@/lib/constants";
import {
  OPEN_LEAD_POPUP_EVENT,
  buildPopupSourcePage,
  type LeadPopupIntent,
  type OpenLeadPopupDetail,
} from "@/lib/leadPopupEvent";

// The popup opens only when a visitor clicks an "Enquire" / "Book Site Visit"
// style button (OpenLeadPopupButton) — it never appears on its own.
const AUTO_CLOSE_AFTER_SUCCESS_MS = 2500;

export default function LeadFormPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [intent, setIntent] = useState<LeadPopupIntent>("enquire");

  useEffect(() => {
    function handleOpen(event: Event) {
      const detail = (event as CustomEvent<OpenLeadPopupDetail>).detail;
      setIntent(detail?.intent ?? "enquire");
      setVisible(true);
    }
    window.addEventListener(OPEN_LEAD_POPUP_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_LEAD_POPUP_EVENT, handleOpen);
  }, []);

  function handleClose() {
    setVisible(false);
  }

  function handleSuccess() {
    setTimeout(handleClose, AUTO_CLOSE_AFTER_SUCCESS_MS);
  }

  if (!visible) return null;

  // On a project's own page the dropdown starts on that project; everywhere
  // else it starts empty so the visitor picks one from the full list.
  const projectSlugMatch = pathname.match(/^\/projects\/([^/]+)/);
  const project = projectSlugMatch ? getProjectBySlug(projectSlugMatch[1]) : undefined;

  const projectOptions = getAllProjects().map((p) => ({ slug: p.slug, name: p.name }));

  return (
    // The overlay scrolls, so a form taller than the screen (e.g. with the
    // optional details open on a phone) can still be scrolled into view.
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-sand-900/60 px-4 py-8" onClick={handleClose}>
      <div className="flex min-h-full items-center justify-center">
      <div
        className="animate-popup-in relative w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-md bg-white text-sand-900 shadow-sm transition-colors hover:bg-sand-50"
        >
          ✕
        </button>
        <LeadForm
          projects={projectOptions}
          defaultProjectSlug={project?.slug}
          sourcePage={buildPopupSourcePage(intent, pathname)}
          brandName={project?.name ?? SITE_NAME}
          compact
          onSuccess={handleSuccess}
          showWhatsAppCta={false}
        />
      </div>
      </div>
    </div>
  );
}
