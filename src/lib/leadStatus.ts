/** Lives outside lib/leads.ts so client components can import the status
 * list/type without pulling in firebase-admin (server-only). */
export const LEAD_STATUSES = ["new", "contacted", "follow-up", "converted", "not-interested"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];
