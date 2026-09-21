"use server";

import { deleteLeads as deleteLeadsFromDb } from "@/lib/leads";

export type DeleteLeadsResult = { error: string } | { success: true };

export async function deleteLeads(ids: string[]): Promise<DeleteLeadsResult> {
  if (ids.length === 0) {
    return { error: "No leads selected." };
  }

  try {
    await deleteLeadsFromDb(ids);
  } catch (err) {
    console.error("deleteLeads: deleteLeadsFromDb failed", err);
    return { error: "Failed to delete the selected leads. Please try again." };
  }

  return { success: true };
}
