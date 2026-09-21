export const OPEN_LEAD_POPUP_EVENT = "lead-popup:open";

export type LeadPopupIntent = "enquire" | "site-visit" | "brochure";

export interface OpenLeadPopupDetail {
  intent?: LeadPopupIntent;
}

const SOURCE_PREFIX: Record<LeadPopupIntent, string> = {
  enquire: "popup",
  "site-visit": "popup:site-visit",
  brochure: "popup:brochure",
};

export function buildPopupSourcePage(intent: LeadPopupIntent, pathname: string): string {
  return `${SOURCE_PREFIX[intent]}:${pathname}`;
}
