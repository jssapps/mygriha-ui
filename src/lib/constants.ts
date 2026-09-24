export const PREFERRED_CALL_TIMES = [
  "Morning (9am – 12pm)",
  "Afternoon (12pm – 4pm)",
  "Evening (4pm – 8pm)",
  "Anytime",
] as const;

export const SITE_NAME = "BangaloreNest";

/** Lead-form project choice meaning "not tied to one project". It is the
 * default whenever the form can't infer the project from the page. */
export const ALL_PROJECTS_SLUG = "all";
export const ALL_PROJECTS_LABEL = "All Projects";

// Shown under the project name in the header brand block and atop the lead
// popup — this site represents builders as their channel partner, not the
// builder itself.
export const AUTHORIZED_CHANNEL_PARTNER_LABEL = "Authorized channel partner";

export const SITE_TAGLINE =
  "A private property advisory for newly launched apartment projects along Bangalore's Electronic City corridor — curated access, direct builder pricing, no brokerage.";

// PLACEHOLDER — replace with the real contact number before launch.
// Digits only, with country code, no "+" or spaces (wa.me format).
export const WHATSAPP_NUMBER = "919999999999";

export const CONTACT_PHONE_DISPLAY = "+91 99999 99999";
// PLACEHOLDER — replace with the real contact number before launch (tel: format).
export const CONTACT_PHONE_TEL = "+919999999999";
export const CONTACT_EMAIL = "admin@mygriha.in";
