import type { SalesStage } from "@/types/project";
import { salesStageLabel } from "@/lib/format";

const STAGES: SalesStage[] = ["pre-launch", "eoi-open", "bookings-open"];

const STYLES: Record<SalesStage, string> = {
  "pre-launch": "bg-earth-500 text-white",
  "eoi-open": "bg-sage-500 text-white",
  "bookings-open": "bg-sky-600 text-white",
};

/** Small badge row showing all three sales stages side by side, with equal weight.
 * Solid color + a live dot (vs. a flat pastel chip) so the strip reads as an
 * active status update rather than passive decoration. */
export default function SalesStageBadges() {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {STAGES.map((stage) => (
        <span
          key={stage}
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-[0_2px_8px_rgba(0,0,0,0.3)] ring-1 ring-inset ring-white/25 ${STYLES[stage]}`}
        >
          <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-white" />
          {salesStageLabel(stage)}
        </span>
      ))}
    </div>
  );
}
