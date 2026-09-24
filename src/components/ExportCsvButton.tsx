"use client";

import type { Lead } from "@/lib/leads";
import { buttonClasses } from "@/lib/ui";

const COLUMNS: Array<{ key: keyof Lead; label: string }> = [
  { key: "createdAt", label: "Submitted At" },
  { key: "updatedAt", label: "Updated At" },
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "projectName", label: "Project" },
  { key: "preferredVisitDate", label: "Preferred Contact/Visit Date" },
  { key: "preferredCallTime", label: "Preferred Call Time" },
  { key: "message", label: "Message" },
  { key: "sourcePage", label: "Source Page" },
  { key: "status", label: "Status" },
];

function escapeCsvCell(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function leadsToCsv(leads: Lead[]): string {
  const header = COLUMNS.map((c) => escapeCsvCell(c.label)).join(",");
  const rows = leads.map((lead) =>
    COLUMNS.map((c) => escapeCsvCell(String(lead[c.key] ?? ""))).join(",")
  );
  return [header, ...rows].join("\n");
}

export default function ExportCsvButton({ leads }: { leads: Lead[] }) {
  function handleExport() {
    const csv = leadsToCsv(leads);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={leads.length === 0}
      className={buttonClasses("secondary", "sm")}
    >
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M10 3v10m0 0-3.5-3.5M10 13l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 15.5v.5A1.5 1.5 0 0 0 5.5 17.5h9a1.5 1.5 0 0 0 1.5-1.5v-.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Export CSV
    </button>
  );
}
