import type { BuilderInfo as BuilderInfoData } from "@/types/project";
import { cardClasses } from "@/lib/ui";

export default function BuilderInfo({
  builder,
  info,
}: {
  builder: string;
  info?: BuilderInfoData;
}) {
  const stats = [
    { label: "Years in Business", value: info?.yearsInBusiness ? `${info.yearsInBusiness}+ yrs` : undefined },
    { label: "Completed Projects", value: info?.completedProjects?.toString() },
    { label: "Ongoing Projects", value: info?.ongoingProjects?.toString() },
  ];

  return (
    <div className={`p-6 sm:p-8 ${cardClasses}`}>
      <p className="text-lg font-bold text-sand-900">{builder}</p>
      <p className="mt-2 text-sm text-sand-900/70">
        {info?.overview ??
          "A detailed builder profile — track record, completed projects, and credentials — will be published here once confirmed directly with Signature Dwellings."}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-4 border-t border-sand-100 pt-5">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-xs font-semibold uppercase tracking-wide text-sand-900/50">{s.label}</p>
            <p className={`mt-1 text-base font-bold ${s.value ? "text-sand-900" : "text-sand-900/40"}`}>
              {s.value ?? "Pending"}
            </p>
          </div>
        ))}
      </div>

      {info?.awards && info.awards.length > 0 && (
        <div className="mt-5 border-t border-sand-100 pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-sand-900/50">
            Awards &amp; Recognition
          </p>
          <ul className="mt-2 space-y-1 text-sm text-sand-900/70">
            {info.awards.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
