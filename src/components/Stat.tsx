export default function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-4 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-sand-900/50">{label}</p>
      <p className="mt-1.5 text-sm font-semibold tabular-nums text-sand-900">{value}</p>
    </div>
  );
}
