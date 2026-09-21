import type { Metadata } from "next";
import { getLeads } from "@/lib/leads";
import LeadsTable from "@/components/LeadsTable";

// Reads live data from Firestore on every request — must not be prerendered.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Leads",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const leads = await getLeads();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="border-b border-sand-100 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-sand-900">Leads</h1>
        <p className="mt-1 text-sm text-sand-900/50">{leads.length} total submissions</p>
      </div>

      <LeadsTable leads={leads} />
    </div>
  );
}
