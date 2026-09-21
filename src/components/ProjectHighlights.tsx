import type { ReactNode } from "react";
import type { Project } from "@/types/project";
import { cardClasses, iconBadgeClasses } from "@/lib/ui";

export interface Highlight {
  label: string;
  value: string;
  icon: ReactNode;
  pending?: boolean;
}

const ICON_PROPS = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  "aria-hidden": true,
} as const;

const ICONS = {
  land: (
    <svg {...ICON_PROPS}>
      <path
        d="M4 6V4h2M14 4h2v2M16 14v2h-2M6 16H4v-2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="6.5" y="6.5" width="7" height="7" rx="1" />
    </svg>
  ),
  towers: (
    <svg {...ICON_PROPS}>
      <path d="M5 17V9.5h3V17M8.5 17V4.5h3V17M12 17v-6h3v6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 17h14" strokeLinecap="round" />
    </svg>
  ),
  units: (
    <svg {...ICON_PROPS}>
      <rect x="6" y="3" width="8" height="14" rx="1" />
      <path d="M11.5 10h0.01" strokeLinecap="round" />
    </svg>
  ),
  openSpace: (
    <svg {...ICON_PROPS}>
      <path
        d="M10 3c2.5 1 4 3.2 4 6 0 3.5-4 8-4 8s-4-4.5-4-8c0-2.8 1.5-5 4-6Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  parking: (
    <svg {...ICON_PROPS}>
      <rect x="3.5" y="3.5" width="13" height="13" rx="2" />
      <path d="M8 14V6h2.5a2.5 2.5 0 0 1 0 5H8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  security: (
    <svg {...ICON_PROPS}>
      <path
        d="M10 3.5 16 6v4.5c0 4-2.7 6-6 6.5-3.3-.5-6-2.5-6-6.5V6l6-2.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  rera: (
    <svg {...ICON_PROPS}>
      <rect x="4.5" y="3" width="11" height="14" rx="1" />
      <path d="M7.5 8h5M7.5 11h5M7.5 14h3" strokeLinecap="round" />
    </svg>
  ),
  pending: (
    <svg {...ICON_PROPS}>
      <circle cx="10" cy="10" r="6.5" />
      <path d="M10 7v3.5l2 1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  lobby: (
    <svg {...ICON_PROPS}>
      <path d="M4 17V8l6-4.5L16 8v9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 17v-5h5v5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 17h14" strokeLinecap="round" />
    </svg>
  ),
  amenities: (
    <svg {...ICON_PROPS}>
      <path
        d="M10 3v3M10 14v3M3 10h3M14 10h3M5.5 5.5l2 2M12.5 12.5l2 2M14.5 5.5l-2 2M7.5 12.5l-2 2"
        strokeLinecap="round"
      />
    </svg>
  ),
};

/**
 * Builds the highlight-card list from real project data. Fields the data
 * model doesn't have yet (floors, power backup) — or that a given project
 * hasn't confirmed (open space, clubhouse size, amenities count) — are
 * marked `pending` rather than invented. See src/data/projects.ts for sourcing.
 */
export function buildHighlights(project: Project): Highlight[] {
  return [
    { label: "Land Area", value: `${project.totalAreaAcres} acres`, icon: ICONS.land },
    { label: "Towers", value: `${project.totalTowers}`, icon: ICONS.towers },
    { label: "Total Apartments", value: `${project.totalUnits}+`, icon: ICONS.units },
    project.openSpacePercent !== undefined
      ? { label: "Open Space", value: `${project.openSpacePercent}%`, icon: ICONS.openSpace }
      : { label: "Open Space", value: "Pending", icon: ICONS.pending, pending: true },
    { label: "Floors", value: "Pending", icon: ICONS.pending, pending: true },
    { label: "Parking", value: "900+ spaces", icon: ICONS.parking },
    project.clubhouseAreaSqft !== undefined
      ? {
          label: "Clubhouse Size",
          value: `${project.clubhouseAreaSqft.toLocaleString()} sq. ft.`,
          icon: ICONS.lobby,
        }
      : { label: "Clubhouse Size", value: "Pending", icon: ICONS.pending, pending: true },
    project.amenitiesCount !== undefined
      ? { label: "Amenities", value: `${project.amenitiesCount}+`, icon: ICONS.amenities }
      : { label: "Amenities", value: "Pending", icon: ICONS.pending, pending: true },
    { label: "Security", value: "24/7 CCTV", icon: ICONS.security },
    { label: "Power Backup", value: "Pending", icon: ICONS.pending, pending: true },
    {
      label: "RERA Status",
      value:
        project.reraStatus === "registered" && project.reraId
          ? project.reraId
          : "Registration awaited",
      icon: ICONS.rera,
      pending: project.reraStatus !== "registered",
    },
  ];
}

export default function ProjectHighlights({ highlights }: { highlights: Highlight[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
      {highlights.map((h) => (
        <div key={h.label} className={`group p-5 ${cardClasses}`}>
          <span className={iconBadgeClasses}>{h.icon}</span>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-sand-900/50">
            {h.label}
          </p>
          <p className={`mt-1 text-base font-bold tabular-nums ${h.pending ? "text-sand-900/40" : "text-sand-900"}`}>
            {h.value}
          </p>
        </div>
      ))}
    </div>
  );
}
