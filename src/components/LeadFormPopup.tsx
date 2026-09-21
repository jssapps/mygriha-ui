"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import LeadForm from "./LeadForm";
import { getAllProjects, getPrimaryProject, getProjectBySlug } from "@/data/projects";
import {
  OPEN_LEAD_POPUP_EVENT,
  buildPopupSourcePage,
  type LeadPopupIntent,
  type OpenLeadPopupDetail,
} from "@/lib/leadPopupEvent";

const DISMISS_KEY = "leadPopupDismissed";
const SHOW_DELAY_MS = 5000;
const AUTO_CLOSE_AFTER_SUCCESS_MS = 2500;
const EXCLUDED_PATH_PREFIXES = ["/admin"];

export default function LeadFormPopup() {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const [visible, setVisible] = useState(false);
  const [intent, setIntent] = useState<LeadPopupIntent>("enquire");

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    const timer = setTimeout(() => {
      const current = pathnameRef.current;
      if (!EXCLUDED_PATH_PREFIXES.some((prefix) => current.startsWith(prefix))) {
        setIntent("enquire");
        setVisible(true);
      }
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

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
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  }

  function handleSuccess() {
    setTimeout(handleClose, AUTO_CLOSE_AFTER_SUCCESS_MS);
  }

  if (!visible) return null;

  // Same fallback rule as the header: the matched slug's project, or the
  // primary featured project on every other page.
  const projectSlugMatch = pathname.match(/^\/projects\/([^/]+)/);
  const project =
    (projectSlugMatch && getProjectBySlug(projectSlugMatch[1])) || getPrimaryProject();

  const projectOptions = getAllProjects().map((p) => ({ slug: p.slug, name: p.name }));

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-sand-900/60 px-4"
      onClick={handleClose}
    >
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
          defaultProjectSlug={project.slug}
          sourcePage={buildPopupSourcePage(intent, pathname)}
          brandName={project.name}
          compact
          onSuccess={handleSuccess}
          showWhatsAppCta={false}
        />
      </div>
    </div>
  );
}
