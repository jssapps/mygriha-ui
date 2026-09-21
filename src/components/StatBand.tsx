/**
 * Full-bleed pull-stat divider — one oversized figure, used sparingly to
 * break up the reading rhythm between chaptered sections. Never a stand-in
 * for a fabricated claim: callers must pass a verified figure.
 */
export default function StatBand({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-y border-sand-100 bg-sky-800">
      <div className="mx-auto max-w-5xl px-4 py-10 text-center sm:px-6 sm:py-14">
        <p className="font-display text-5xl font-bold text-white sm:text-7xl">{value}</p>
        <p className="mx-auto mt-3 max-w-md text-sm uppercase tracking-[0.2em] text-sand-50/70">{label}</p>
      </div>
    </div>
  );
}
