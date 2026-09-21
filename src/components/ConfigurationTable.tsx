import type { ProjectConfiguration } from "@/types/project";
import { formatPriceRange, formatSqftRange } from "@/lib/format";

export default function ConfigurationTable({
  configurations,
}: {
  configurations: ProjectConfiguration[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-sand-100 bg-white">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead>
          <tr className="border-b border-sand-100">
            <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-sand-900/50">
              Configuration
            </th>
            <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-sand-900/50">
              Carpet Area
            </th>
            <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-sand-900/50">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {configurations.map((config) => (
            <tr key={config.label} className="border-t border-sand-100 transition-colors hover:bg-sand-50">
              <td className="px-4 py-3.5 font-medium text-sand-900">{config.label}</td>
              <td className="px-4 py-3.5 tabular-nums text-sand-900/70">
                {formatSqftRange(config.carpetAreaSqftMin, config.carpetAreaSqftMax)}
              </td>
              <td className="px-4 py-3.5 tabular-nums text-sand-900/70">
                {formatPriceRange(config.priceMinInr, config.priceMaxInr)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
