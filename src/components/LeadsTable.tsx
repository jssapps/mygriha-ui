"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import type { Lead } from "@/lib/leads";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/leadStatus";
import { updateLeadStatus } from "@/app/actions/updateLeadStatus";
import { deleteLeads } from "@/app/actions/deleteLeads";
import { formControlClasses, buttonClasses } from "@/lib/ui";
import ExportCsvButton from "@/components/ExportCsvButton";

interface ColumnDef {
  key: keyof Lead;
  label: string;
}

const COLUMNS: ColumnDef[] = [
  { key: "createdAt", label: "Submitted" },
  { key: "updatedAt", label: "Updated" },
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "projectName", label: "Project" },
  { key: "preferredVisitDate", label: "Preferred Visit Date" },
  { key: "preferredCallTime", label: "Preferred Call Time" },
  { key: "sourcePage", label: "Source" },
  { key: "status", label: "Status" },
];

// Columns whose "natural" first click should read newest/latest first
// rather than A-Z — everything else defaults to ascending.
const DESCENDING_FIRST: Partial<Record<keyof Lead, true>> = {
  createdAt: true,
  updatedAt: true,
};

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  "follow-up": "Follow-up",
  converted: "Converted",
  "not-interested": "Not Interested",
};

const STATUS_SELECT_CLASSES: Record<LeadStatus, string> = {
  new: "border-sand-100 text-sand-900",
  contacted: "border-sky-600/30 bg-sky-50 text-sky-700",
  "follow-up": "border-earth-500/30 bg-earth-50 text-earth-600",
  converted: "border-sage-500/30 bg-sage-50 text-sage-600",
  "not-interested": "border-sand-100 bg-sand-100 text-sand-900/50",
};

const ALL_PROJECTS = "__all__";

export default function LeadsTable({ leads: initialLeads }: { leads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [projectFilter, setProjectFilter] = useState(ALL_PROJECTS);
  const [sortKey, setSortKey] = useState<keyof Lead>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [pendingStatusId, setPendingStatusId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const selectAllRef = useRef<HTMLInputElement>(null);

  const projectOptions = useMemo(() => {
    const names = new Set(leads.map((l) => l.projectName).filter(Boolean) as string[]);
    return Array.from(names).sort((a, b) => a.localeCompare(b));
  }, [leads]);

  const visibleLeads = useMemo(() => {
    const filtered =
      projectFilter === ALL_PROJECTS
        ? leads
        : leads.filter((l) => l.projectName === projectFilter);

    return [...filtered].sort((a, b) => {
      const av = String(a[sortKey] ?? "");
      const bv = String(b[sortKey] ?? "");
      const cmp = av.localeCompare(bv, undefined, { numeric: true, sensitivity: "base" });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [leads, projectFilter, sortKey, sortDir]);

  const visibleIds = useMemo(() => visibleLeads.map((l) => l.id), [visibleLeads]);
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));
  const someVisibleSelected = visibleIds.some((id) => selectedIds.has(id));

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someVisibleSelected && !allVisibleSelected;
    }
  }, [someVisibleSelected, allVisibleSelected]);

  function handleHeaderClick(key: keyof Lead) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(DESCENDING_FIRST[key] ? "desc" : "asc");
    }
  }

  function toggleSelectAllVisible() {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) {
        visibleIds.forEach((id) => next.delete(id));
      } else {
        visibleIds.forEach((id) => next.add(id));
      }
      return next;
    });
  }

  function toggleSelectOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleStatusChange(lead: Lead, nextStatus: LeadStatus) {
    const prevStatus = lead.status;
    setError(null);
    setPendingStatusId(lead.id);
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, status: nextStatus } : l)));

    startTransition(async () => {
      const result = await updateLeadStatus(lead.id, nextStatus);
      setPendingStatusId(null);
      if ("error" in result) {
        setError(result.error);
        setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, status: prevStatus } : l)));
      }
    });
  }

  function handleDeleteSelected() {
    if (selectedIds.size === 0) return;
    const confirmed = window.confirm(
      `Delete ${selectedIds.size} lead${selectedIds.size === 1 ? "" : "s"}? This cannot be undone.`
    );
    if (!confirmed) return;

    const ids = Array.from(selectedIds);
    setError(null);
    setDeleting(true);

    startTransition(async () => {
      const result = await deleteLeads(ids);
      setDeleting(false);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setLeads((prev) => prev.filter((l) => !ids.includes(l.id)));
      setSelectedIds(new Set());
    });
  }

  return (
    <div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-sand-900/70">
            Project
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className={`${formControlClasses} !w-auto`}
            >
              <option value={ALL_PROJECTS}>All projects</option>
              {projectOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <span className="text-sm text-sand-900/50">
            {visibleLeads.length} of {leads.length} shown
          </span>

          {selectedIds.size > 0 && (
            <button
              type="button"
              onClick={handleDeleteSelected}
              disabled={deleting}
              className={`${buttonClasses("secondary", "sm")} border-red-300 text-red-600 hover:border-red-500 hover:text-red-700 disabled:opacity-60`}
            >
              {deleting ? "Deleting…" : `Delete selected (${selectedIds.size})`}
            </button>
          )}
        </div>

        <ExportCsvButton leads={visibleLeads} />
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <div className="mt-4 overflow-x-auto rounded-lg border border-sand-100 bg-white">
        <table className="w-full min-w-[1080px] text-left text-sm">
          <thead>
            <tr className="border-b border-sand-100">
              <th className="whitespace-nowrap bg-white px-4 py-3">
                <input
                  ref={selectAllRef}
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={toggleSelectAllVisible}
                  aria-label="Select all visible leads"
                  className="h-4 w-4 rounded border-sand-100 accent-sky-700"
                />
              </th>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="whitespace-nowrap bg-white px-4 py-3 text-xs font-semibold uppercase tracking-wide text-sand-900/50"
                >
                  <button
                    type="button"
                    onClick={() => handleHeaderClick(col.key)}
                    className="flex items-center gap-1 uppercase tracking-wide hover:text-sky-700"
                  >
                    {col.label}
                    <span className="inline-block w-3 text-[10px]">
                      {sortKey === col.key ? (sortDir === "asc" ? "▲" : "▼") : ""}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleLeads.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length + 1} className="px-4 py-10 text-center text-sand-900/50">
                  No leads match this filter.
                </td>
              </tr>
            ) : (
              visibleLeads.map((lead) => (
                <tr key={lead.id} className="border-t border-sand-100 hover:bg-sand-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(lead.id)}
                      onChange={() => toggleSelectOne(lead.id)}
                      aria-label={`Select lead ${lead.name}`}
                      className="h-4 w-4 rounded border-sand-100 accent-sky-700"
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-sand-900/70">
                    {lead.createdAt ? new Date(lead.createdAt).toLocaleString("en-IN") : "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-sand-900/70">
                    {lead.updatedAt ? new Date(lead.updatedAt).toLocaleString("en-IN") : "—"}
                  </td>
                  <td className="px-4 py-3 font-medium text-sand-900">{lead.name}</td>
                  <td className="px-4 py-3 tabular-nums text-sand-900/70">{lead.phone}</td>
                  <td className="px-4 py-3 text-sand-900/70">{lead.email || "—"}</td>
                  <td className="px-4 py-3 text-sand-900/70">{lead.projectName || "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sand-900/70">{lead.preferredVisitDate || "—"}</td>
                  <td className="px-4 py-3 text-sand-900/70">{lead.preferredCallTime || "—"}</td>
                  <td className="px-4 py-3 text-sand-900/70">{lead.sourcePage}</td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status}
                      disabled={pendingStatusId === lead.id}
                      onChange={(e) => handleStatusChange(lead, e.target.value as LeadStatus)}
                      className={`rounded-md border px-2 py-1.5 text-xs font-semibold outline-none transition-colors disabled:opacity-60 ${STATUS_SELECT_CLASSES[lead.status]}`}
                    >
                      {LEAD_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {STATUS_LABELS[status]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
