"use client";

import type { ReactNode } from "react";
import {
  OPEN_LEAD_POPUP_EVENT,
  type LeadPopupIntent,
  type OpenLeadPopupDetail,
} from "@/lib/leadPopupEvent";

export default function OpenLeadPopupButton({
  children,
  className,
  intent = "enquire",
}: {
  children: ReactNode;
  className?: string;
  intent?: LeadPopupIntent;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent<OpenLeadPopupDetail>(OPEN_LEAD_POPUP_EVENT, { detail: { intent } })
        )
      }
      className={className}
    >
      {children}
    </button>
  );
}
