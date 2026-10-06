export const PREFERRED_CALL_TIMES = [
  "Morning (9am – 12pm)",
  "Afternoon (12pm – 4pm)",
  "Evening (4pm – 8pm)",
  "Anytime",
] as const;

export const SITE_NAME = "MyGriha.in";

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

// Digits only, with country code, no "+" or spaces (wa.me format).
export const WHATSAPP_NUMBER = "916361302887";

export const CONTACT_PHONE_DISPLAY = "+91 63613 02887/+91 79075 89241";
// tel: format.
export const CONTACT_PHONE_TEL = "+916361302887";
/** Every number shown in the Contact page's phone card (first is the primary
 * number used by Call Now / WhatsApp buttons above). */
export const CONTACT_PHONES = [
  { display: "+91 63613 02887", tel: "+916361302887" },
  { display: "+91 79075 89241", tel: "+917907589241" },
] as const;
export const CONTACT_EMAIL = "admin@mygriha.in";
