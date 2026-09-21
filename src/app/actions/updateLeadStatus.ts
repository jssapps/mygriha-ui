"use server";

import { setLeadStatus } from "@/lib/leads";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/leadStatus";

export type UpdateLeadStatusResult = { error: string } | { success: true };

export async function updateLeadStatus(
  id: string,
  status: LeadStatus
): Promise<UpdateLeadStatusResult> {
  if (!LEAD_STATUSES.includes(status)) {
    return { error: "Invalid status." };
  }

  try {
    await setLeadStatus(id, status);
  } catch (err) {
    console.error("updateLeadStatus: setLeadStatus failed", err);
    return { error: "Failed to update status. Please try again." };
  }

  return { success: true };
}
