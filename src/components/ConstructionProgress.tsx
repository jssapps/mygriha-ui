import type { ConstructionUpdate } from "@/types/project";
import { cardClasses } from "@/lib/ui";

/** Renders only when a project has real, builder-confirmed progress data. */
export default function ConstructionProgress({ update }: { update: ConstructionUpdate }) {
  return (
    <div className={`p-6 sm:p-8 ${cardClasses}`}>
      {update.percentComplete !== undefined && (
        <div>
          <div className="flex items-baseline justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-sand-900/50">
              Overall Progress
            </p>
            <p className="text-2xl font-bold tabular-nums text-sand-900">{update.percentComplete}%</p>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-sand-100">
            <div
              className="h-full rounded-full bg-sage-500"
              style={{ width: `${update.percentComplete}%` }}
            />
          </div>
        </div>
      )}

      {update.milestones && update.milestones.length > 0 && (
        <ol className={update.percentComplete !== undefined ? "mt-6 space-y-4 border-t border-sand-100 pt-6" : "space-y-4"}>
          {update.milestones.map((milestone, i) => (
            <li key={milestone} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-100 text-xs font-bold text-sage-600">
                {i + 1}
              </span>
              <span className="text-sm text-sand-900/80">{milestone}</span>
            </li>
          ))}
        </ol>
      )}

      {update.lastUpdated && (
        <p className="mt-6 text-xs text-sand-900/40">Last updated {update.lastUpdated}</p>
      )}
    </div>
  );
}
