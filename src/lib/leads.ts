import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebaseAdmin";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/leadStatus";

const LEADS_COLLECTION = "leads";

export type { LeadStatus };

export interface LeadInput {
  name: string;
  phone: string;
  email?: string;
  projectSlug?: string;
  projectName?: string;
  preferredVisitDate?: string;
  preferredCallTime?: string;
  sourcePage: string;
}

export interface Lead extends LeadInput {
  id: string;
  createdAt: string | null;
  updatedAt: string | null;
  status: LeadStatus;
}

/**
 * Uses the (already-normalized) phone number as the document ID, so repeat
 * submissions from the same number overwrite the existing lead instead of
 * piling up as duplicates. createdAt is preserved from the first submission;
 * updatedAt tracks the most recent one so repeat contact is still visible.
 */
export async function createLead(input: LeadInput): Promise<string> {
  const db = getDb();
  const sanitized = Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined)
  );
  const docRef = db.collection(LEADS_COLLECTION).doc(input.phone);

  await db.runTransaction(async (tx) => {
    const existing = await tx.get(docRef);
    tx.set(docRef, {
      ...sanitized,
      createdAt: existing.exists ? existing.get("createdAt") : FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  });

  return docRef.id;
}

export async function getLeads(): Promise<Lead[]> {
  const db = getDb();
  const snapshot = await db
    .collection(LEADS_COLLECTION)
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    const createdAt = data.createdAt?.toDate
      ? data.createdAt.toDate().toISOString()
      : null;
    const updatedAt = data.updatedAt?.toDate
      ? data.updatedAt.toDate().toISOString()
      : null;
    return {
      id: doc.id,
      name: data.name ?? "",
      phone: data.phone ?? "",
      email: data.email ?? "",
      projectSlug: data.projectSlug ?? "",
      projectName: data.projectName ?? "",
      preferredVisitDate: data.preferredVisitDate ?? "",
      preferredCallTime: data.preferredCallTime ?? "",
      sourcePage: data.sourcePage ?? "",
      createdAt,
      updatedAt,
      status: LEAD_STATUSES.includes(data.status) ? data.status : "new",
    };
  });
}

export async function setLeadStatus(id: string, status: LeadStatus): Promise<void> {
  const db = getDb();
  await db.collection(LEADS_COLLECTION).doc(id).update({
    status,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

/** Firestore batches cap at 500 writes — chunk so bulk-deleting a large
 * selection from the admin table can't silently exceed that. */
export async function deleteLeads(ids: string[]): Promise<void> {
  const db = getDb();
  const chunkSize = 500;

  for (let i = 0; i < ids.length; i += chunkSize) {
    const batch = db.batch();
    for (const id of ids.slice(i, i + chunkSize)) {
      batch.delete(db.collection(LEADS_COLLECTION).doc(id));
    }
    await batch.commit();
  }
}
